import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { materialModules } from '../../types/material-modules';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [MainComponent],
	imports: [
		CommonModule,
		FormsModule,
		...materialModules,
		RouterModule,
		AdminRoutingModule,
	],
})
export class AdminModule {}
