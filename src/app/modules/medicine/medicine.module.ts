import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from '../../types/material-modules';
import { FormsModule } from '@angular/forms';
import { MainMedicineComponent } from './pages/main-medicine/main-medicine.component';
import { AddMedicineComponent } from './pages/add-medicine/add-medicine.component';

@NgModule({
	declarations: [MainMedicineComponent, AddMedicineComponent],
	imports: [CommonModule, FormsModule, ...materialModules],
	exports: [MainMedicineComponent],
})
export class MedicineModule {}
