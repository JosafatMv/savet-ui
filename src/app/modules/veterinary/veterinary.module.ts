import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainVeterinaryComponent } from './pages/main-veterinary/main-veterinary.component';
import { FormsModule } from '@angular/forms';
import { materialModules } from '../../types/material-modules';
import { RouterModule } from '@angular/router';
import { VeterinaryRoutingModule } from './veterinary-routing.module';

@NgModule({
	declarations: [MainVeterinaryComponent],
	imports: [
		CommonModule,
		FormsModule,
		...materialModules,
		RouterModule,
		VeterinaryRoutingModule,
	],
})
export class VeterinaryModule {}
