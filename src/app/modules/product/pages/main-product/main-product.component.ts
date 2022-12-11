import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../types/product';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../services/product.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { AddProductComponent } from '../add-product/add-product.component';
import { GeneralService } from '../../../../services/general.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-main-product',
	templateUrl: './main-product.component.html',
	styleUrls: ['./main-product.component.css'],
})
export class MainProductComponent implements OnInit {
	displayedColumns: string[] = [
		'#',
		'name',
		'description',
		'price',
		'category',
		'img_url',
		'actions',
	];

	products!: MatTableDataSource<Product>;

	get isLoading() {
		return this.productService.isLoading;
	}

	getAllProducts() {
		this.productService.findAll().subscribe((response) => {
			this.productService.isLoading = false;
			this.products = new MatTableDataSource(response);
			this.products.paginator = this.paginator;
			this.products.sort = this.sort;
		});
	}

	getDisplayedColumns() {
		if (this.isAdmin()) {
			return this.displayedColumns;
		} else {
			return this.displayedColumns.filter(
				(column) => column !== 'actions'
			);
		}
	}

	isAdmin() {
		return this.generalService.userInfo.role === 'admin';
	}

	constructor(
		private productService: ProductService,
		private generalService: GeneralService,
		private _liveAnnouncer: LiveAnnouncer,
		public dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.getAllProducts();
	}

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	// ngAfterViewInit() {}

	announceSortChange(sortState: Sort) {
		if (sortState.direction) {
			this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
		} else {
			this._liveAnnouncer.announce('Sorting cleared');
		}
	}

	openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
		const modalRef = this.dialog.open(AddProductComponent, {
			width: '60%',
			enterAnimationDuration,
			exitAnimationDuration,
			disableClose: true,
		});
		modalRef.afterClosed().subscribe((result: any) => {
			this.productService.productUpdate = {
				id: 0,
				name: '',
				description: '',
				price: 0.0,
				category: {
					category_id: 0,
					name: '',
				},
			};
			this.productService.edit = false;
			this.getAllProducts();
		});
	}

	editProduct(product: any) {
		console.log(product);

		this.productService.edit = true;
		this.productService.productUpdate = {
			...product,
			category: { category_id: Number(product.category_id) },
		};

		this.openDialog('2ms', '1ms');
	}

	changeStatus(product: Product) {
		this.generalService
			.showConfirmAlert('El status del producto se cambiará')
			.then((result) => {
				if (result.isConfirmed) {
					this.generalService.showLoading();

					this.productService
						.changeStatus(product)
						.subscribe((response) => {
							if (response.error) {
								Swal.close();
								this.generalService.showError(
									response.error.message
								);
								return;
							}

							this.productService.isLoading = false;
							this.getAllProducts();
							Swal.close();
							this.generalService.showSnackBar(
								'El status del producto se cambió correctamente'
							);
						});
				}
			});
	}
}
