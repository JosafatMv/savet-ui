import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from '../../types/material-modules';
import { FormsModule } from '@angular/forms';
import { SigninComponent } from './pages/signin/signin.component';

@NgModule({
	declarations: [SigninComponent],
	imports: [CommonModule, FormsModule, ...materialModules],
	exports: [SigninComponent],
})
export class AuthModule {}
