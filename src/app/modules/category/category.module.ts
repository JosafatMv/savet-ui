import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCategoryComponent } from './pages/main-category/main-category.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { materialModules } from '../../types/material-modules';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [MainCategoryComponent, AddCategoryComponent],
	imports: [CommonModule, FormsModule, ...materialModules],
	exports: [MainCategoryComponent],
})
export class CategoryModule {}
