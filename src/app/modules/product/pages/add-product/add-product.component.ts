import { Component, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { DialogRef } from '@angular/cdk/dialog';
import { ProductService } from '../../services/product.service';
import { Category } from '../../../category/types/category';

@Component({
	selector: 'app-add-product',
	templateUrl: './add-product.component.html',
})
export class AddProductComponent implements OnInit {
	product: Product = {
		id: 0,
		name: '',
		description: '',
		price: 0.0,
		img_url: '',
		category: {
			category_id: 0,
			name: '',
		},
	};

	file!: File;
	categories: Category[] = [];

	constructor(
		public modal: DialogRef<AddProductComponent>,
		private productService: ProductService
	) {
		if (this.productService.edit) {
			this.product = this.productService.productUpdate;
		}
	}

	ngOnInit(): void {
		this.getCategories();
	}

	isLoading() {
		return this.productService.isLoading;
	}

	getCategories() {
		this.productService.findAllCategories().subscribe((response) => {
			this.productService.isLoading = false;
			this.categories = response;
		});
	}

	saveProduct() {
		this.productService.upload(this.file).subscribe((response: any) => {
			this.product.img_url = response.secure_url;
			this.productService.isLoading = false;

			if (this.productService.edit) {
				this.productService
					.update(this.product)
					.subscribe((response) => {
						this.productService.isLoading = false;
						this.modal.close();
						this.productService.edit = false;
					});
			} else {
				this.productService.save(this.product).subscribe((response) => {
					this.productService.isLoading = false;
					this.product = {
						id: 0,
						name: '',
						description: '',
						price: 0.0,
						category: {
							category_id: 0,
							name: '',
						},
					};
					this.modal.close();
					this.productService.findAll();
				});
			}
		});
	}

	onChange(event: any) {
		this.file = event.target.files[0];
	}
}
