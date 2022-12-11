import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ConfirmComponent } from './pages/confirm/confirm.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';

const routes: Routes = [
	{
		path: '',
		component: MainComponent,
		children: [
			{ path: 'signin', component: SigninComponent },
			{ path: 'signup', component: SignupComponent },
			{ path: 'confirm', component: ConfirmComponent },
			{ path: 'verify/:token', component: VerifyEmailComponent },
			{ path: '**', redirectTo: 'signin' },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
