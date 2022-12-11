import { Component, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { DialogRef } from '@angular/cdk/dialog';
import { ProductService } from '../../services/product.service';
import { Category } from '../../../category/types/category';
import { GeneralService } from '../../../../services/general.service';
import Swal from 'sweetalert2';

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

	file!: File | null;
	categories: Category[] = [];
	private imgIsValid!: boolean;

	get isImgValid() {
		return this.imgIsValid;
	}

	set isImgValid(value: boolean) {
		this.imgIsValid = value;
	}

	constructor(
		public modal: DialogRef<AddProductComponent>,
		private productService: ProductService,
		private generalService: GeneralService
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
			const activeCategories = response.filter(
				(category: any) => category.status
			);

			this.productService.isLoading = false;
			this.categories = activeCategories;
		});
	}

	saveProduct() {
		this.generalService
			.showConfirmAlert('¿Estás seguro de guardar este producto?')
			.then((result) => {
				if (result.isConfirmed) {
					this.generalService.showLoading();

					//Si se está editando y no se modifica la imágen
					if (this.productService.edit && !this.file) {
						this.productService
							.update(this.product)
							.subscribe((response) => {
								if (response.error) {
									Swal.close();
									this.generalService.showError(
										response.error.message
									);
									this.productService.isLoading = false;
									return;
								}

								this.productService.isLoading = false;
								this.modal.close();
								this.productService.edit = false;
								Swal.close();
							});

						return;
					}

					if (
						!this.productService.edit ||
						(this.file && this.productService.edit)
					) {
						this.productService
							.uploadImg(this.file)
							.subscribe((response: any) => {
								if (response.error) {
									this.product.img_url =
										'https://res.cloudinary.com/sigsa/image/upload/v1670305008/savet/products/product-placeholder_x0huen.png';
								} else {
									this.product.img_url = response.secure_url;
								}

								if (this.productService.edit) {
									this.productService
										.update(this.product)
										.subscribe((response) => {
											if (response.error) {
												Swal.close();
												this.generalService.showError(
													response.error.message
												);
												this.productService.isLoading =
													false;
												return;
											}

											this.productService.isLoading =
												false;
											this.modal.close();
											this.productService.edit = false;
											this.file = null;
											Swal.close();
										});

									return;
								}
								this.productService
									.save(this.product)
									.subscribe((response) => {
										if (response.error) {
											Swal.close();
											this.generalService.showError(
												response.error.message
											);
											this.productService.isLoading =
												false;
											return;
										}

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
										Swal.close();
									});
							});
					}
				}
			});
	}

	onChange(event: any) {
		const file = event.target.files[0];

		if (file.type.indexOf('image') < 0) {
			Swal.fire({
				title: 'Error al seleccionar la imagen',
				text: 'El archivo debe ser una imagen',
				icon: 'error',
			});

			this.isImgValid = false;
			event.target.value = '';
			return;
		}

		this.file = event.target.files[0];
		this.isImgValid = true;
	}
}
