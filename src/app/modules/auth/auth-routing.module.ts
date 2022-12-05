import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { SigninComponent } from './pages/signin/signin.component';

const routes: Routes = [
	{
		path: '',
		component: MainComponent,
		children: [
			{ path: 'signin', component: SigninComponent },
			{ path: 'signup', component: SigninComponent },
			{ path: '**', redirectTo: 'signin' },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
