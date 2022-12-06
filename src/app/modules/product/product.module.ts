import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainProductComponent } from './pages/main-product/main-product.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { materialModules } from '../../types/material-modules';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [MainProductComponent, AddProductComponent],
	imports: [CommonModule, FormsModule, ...materialModules],
	exports: [MainProductComponent],
})
export class ProductModule {}
