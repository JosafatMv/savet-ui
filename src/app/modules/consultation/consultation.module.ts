import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainConsultationComponent } from './pages/main-consultation/main-consultation.component';
import { AddConsultationComponent } from './pages/add-consultation/add-consultation.component';
import { FormsModule } from '@angular/forms';
import { materialModules } from 'src/app/types/material-modules';

@NgModule({
	declarations: [MainConsultationComponent, AddConsultationComponent],
	imports: [CommonModule, FormsModule, ...materialModules],
	exports: [MainConsultationComponent],
})
export class ConsultationModule {}
