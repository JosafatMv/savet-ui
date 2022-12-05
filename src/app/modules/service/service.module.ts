import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainServiceComponent } from './pages/main-service/main-service.component';
import { AddServiceComponent } from './pages/add-service/add-service.component';
import { materialModules } from '../../types/material-modules';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [MainServiceComponent, AddServiceComponent],
	imports: [CommonModule, FormsModule, ...materialModules],
	exports: [MainServiceComponent],
})
export class ServiceModule {}
