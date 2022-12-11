import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../../types/category';
import { CategoryService } from '../../services/category.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { GeneralService } from '../../../../services/general.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-main-category',
	templateUrl: './main-category.component.html',
})
export class MainCategoryComponent implements OnInit {
	displayedColumns: string[] = ['#', 'name', 'actions'];

	categories!: MatTableDataSource<Category>;

	get isLoading() {
		return this.categoryService.isLoading;
	}

	getAllCategories() {
		this.categoryService.findAll().subscribe((response) => {
			this.categoryService.isLoading = false;
			this.categories = new MatTableDataSource(response);
			this.categories.paginator = this.paginator;
			this.categories.sort = this.sort;
		});
	}

	constructor(
		private categoryService: CategoryService,
		private generalService: GeneralService,
		private _liveAnnouncer: LiveAnnouncer,
		public dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.getAllCategories();
	}

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	announceSortChange(sortState: Sort) {
		if (sortState.direction) {
			this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
		} else {
			this._liveAnnouncer.announce('Sorting cleared');
		}
	}

	openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
		const modalRef = this.dialog.open(AddCategoryComponent, {
			width: '60%',
			enterAnimationDuration,
			exitAnimationDuration,
			disableClose: true,
		});
		modalRef.afterClosed().subscribe((result: any) => {
			this.categoryService.categoryUpdate = {
				id: 0,
				name: '',
			};
			this.categoryService.edit = false;
			this.getAllCategories();
		});
	}

	editCategory(category: Category) {
		this.categoryService.edit = true;
		this.categoryService.categoryUpdate = {
			...category,
		};
		this.openDialog('2ms', '1ms');
	}

	changeStatus(category: Category) {
		this.generalService
			.showConfirmAlert('El status de la categoria será cambiado')
			.then((result) => {
				if (result.isConfirmed) {
					this.generalService.showLoading();

					this.categoryService
						.changeStatus(category)
						.subscribe((response) => {
							if (response.error) {
								this.generalService.showError(
									response.error.message
								);
								Swal.close();
								return;
							}

							this.categoryService.isLoading = false;
							this.getAllCategories();
							Swal.close();
							this.generalService.showSnackBar(
								'Status cambiado correctamente'
							);
						});
				}
			});
	}
}
