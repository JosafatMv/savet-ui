import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from '../../types/material-modules';
import { FormsModule } from '@angular/forms';
import { SigninComponent } from './pages/signin/signin.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MainComponent } from './pages/main/main.component';

@NgModule({
	declarations: [SigninComponent],
	imports: [CommonModule, FormsModule, ...materialModules],
	exports: [AuthRoutingModule, SigninComponent],
})
export class AuthModule {}
