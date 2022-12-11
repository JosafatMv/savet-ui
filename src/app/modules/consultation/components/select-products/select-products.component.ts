import { Component, OnInit } from '@angular/core';
import { ConsultationService } from '../../services/consultation.service';

@Component({
	selector: 'app-select-products',
	templateUrl: './select-products.component.html',
})
export class SelectProductsComponent implements OnInit {
	dropdownList!: any;
	dropdownSettings: any = {};

	constructor(private consultationService: ConsultationService) {}

	ngOnInit(): void {
		this.getAllProducts();
		this.dropdownSettings = {
			singleSelection: false,
			idField: 'product_id',
			textField: 'name',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			itemsShowLimit: 3,
			allowSearchFilter: true,
			enableCheckAll: false,
		};
	}

	onItemSelect(item: any) {
		this.consultationService.addSelectedProduct(item);
	}

	getSelectedProducts() {
		return this.consultationService.getSelectedProducts;
	}

	onItemDeSelect(item: any) {
		this.consultationService.removeSelectedProduct(item);
	}

	getAllProducts() {
		this.consultationService.findAllProducts().subscribe((response) => {
			this.consultationService.isLoading = false;

			const activeProducts = response.filter(
				(product: any) => product.status
			);
			this.dropdownList = activeProducts;
		});
	}
}
