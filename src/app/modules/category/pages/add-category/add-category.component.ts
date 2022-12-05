import { Component, OnInit } from '@angular/core';
import { Category } from '../../types/category';
import { DialogRef } from '@angular/cdk/dialog';
import { CategoryService } from '../../services/category.service';

@Component({
	selector: 'app-add-category',
	templateUrl: './add-category.component.html',
})
export class AddCategoryComponent implements OnInit {
	category: Category = {
		id: 0,
		name: '',
	};

	constructor(
		public modal: DialogRef<AddCategoryComponent>,
		private categoryService: CategoryService
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
		if (this.categoryService.edit) {
			this.categoryService.update(this.category).subscribe((response) => {
				this.categoryService.isLoading = false;
				this.modal.close();
				this.categoryService.edit = false;
			});
		} else {
			this.categoryService.save(this.category).subscribe((response) => {
				this.categoryService.isLoading = false;
				this.category = {
					id: 0,
					name: '',
				};
				this.modal.close();
				this.categoryService.findAll();
			});
		}
	}
}
