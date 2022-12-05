import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from '../../types/material-modules';
import { FormsModule } from '@angular/forms';
import { MainUserComponent } from './pages/main-user/main-user.component';
import { AddUserComponent } from './pages/add-user/add-user.component';

@NgModule({
	declarations: [MainUserComponent, AddUserComponent],
	imports: [CommonModule, FormsModule, ...materialModules],
	exports: [MainUserComponent],
})
export class UserModule {}
