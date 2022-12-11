import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainConsultationComponent } from './pages/main-consultation/main-consultation.component';
import { AddConsultationComponent } from './pages/add-consultation/add-consultation.component';
import { FormsModule } from '@angular/forms';
import { materialModules } from 'src/app/types/material-modules';
import { SelectMedicinesComponent } from './components/select-medicines/select-medicines.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SelectServicesComponent } from './components/select-services/select-services.component';
import { SelectProductsComponent } from './components/select-products/select-products.component';

@NgModule({
	declarations: [
		MainConsultationComponent,
		AddConsultationComponent,
		SelectMedicinesComponent,
		SelectServicesComponent,
		SelectProductsComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		...materialModules,
		NgMultiSelectDropDownModule.forRoot(),
	],
	exports: [MainConsultationComponent],
})
export class ConsultationModule {}
