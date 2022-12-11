import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from '../../types/material-modules';
import { FormsModule } from '@angular/forms';
import { SigninComponent } from './pages/signin/signin.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './pages/signup/signup.component';
import { RouterModule } from '@angular/router';
import { ConfirmComponent } from './pages/confirm/confirm.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';

@NgModule({
	declarations: [
		SigninComponent,
		SignupComponent,
		ConfirmComponent,
		VerifyEmailComponent,
	],
	imports: [CommonModule, FormsModule, ...materialModules, RouterModule],
	exports: [AuthRoutingModule, SigninComponent, SignupComponent],
})
export class AuthModule {}
