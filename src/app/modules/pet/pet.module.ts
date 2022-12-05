import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from '../../types/material-modules';
import { FormsModule } from '@angular/forms';
import { MainPetComponent } from './pages/main-pet/main-pet.component';
import { AddPetComponent } from './pages/add-pet/add-pet.component';

@NgModule({
	declarations: [MainPetComponent, AddPetComponent],
	imports: [CommonModule, FormsModule, ...materialModules],
	exports: [MainPetComponent],
})
export class PetModule {}
