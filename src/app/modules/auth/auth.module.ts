import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from '../../types/material-modules';
import { FormsModule } from '@angular/forms';
import { SigninComponent } from './pages/signin/signin.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
	declarations: [SigninComponent, RegisterComponent],
	imports: [CommonModule, FormsModule, ...materialModules],
	exports: [SigninComponent, RegisterComponent],
})
export class AuthModule {}
