import { Component, OnInit } from '@angular/core';
import { Category } from '../../types/category';
import { DialogRef } from '@angular/cdk/dialog';
import { CategoryService } from '../../services/category.service';
import { GeneralService } from '../../../../services/general.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-add-category',
	templateUrl: './add-category.component.html',
})
export class AddCategoryComponent implements OnInit {
	category: Category = {
		category_id: 0,
		name: '',
	};

	constructor(
		public modal: DialogRef<AddCategoryComponent>,
		private categoryService: CategoryService,
		private generalService: GeneralService
	) {
		if (this.categoryService.edit) {
			this.category = this.categoryService.categoryUpdate;
		}
	}

	ngOnInit(): void {}

	isLoading() {
		return this.categoryService.isLoading;
	}

	saveCategory() {
		this.generalService
			.showConfirmAlert('¿Desea guardar la información?')
			.then((result) => {
				if (result.isConfirmed) {
					this.generalService.showLoading();

					if (this.categoryService.edit) {
						this.categoryService
							.update(this.category)
							.subscribe((response) => {
								if (response.error) {
									this.generalService.showError(
										response.error.message
									);
									return;
								}

								this.categoryService.isLoading = false;
								this.modal.close();
								this.categoryService.edit = false;
								Swal.close();
								this.generalService.showSnackBar(
									'La categoría se actualizó correctamente'
								);
							});

						return;
					}
					this.categoryService
						.save(this.category)
						.subscribe((response) => {
							if (response.error) {
								this.generalService.showError(
									response.error.message
								);
								return;
							}

							this.categoryService.isLoading = false;
							this.category = {
								category_id: 0,
								name: '',
							};
							this.modal.close();
							this.categoryService.findAll();
							Swal.close();
							this.generalService.showSnackBar(
								'La categoría se guardó correctamente'
							);
						});
				}
			});
	}
}
