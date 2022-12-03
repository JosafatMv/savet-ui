import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { SigninComponent } from '../modules/auth/pages/signin/signin.component';
import { MainPetComponent } from '../modules/pet/pages/main-pet/main-pet.component';

const routes: Routes = [
	{
		path: '',
		component: MainPetComponent,
		pathMatch: 'full',
	},

	{
		path: 'signin',
		component: SigninComponent,
	},
	{
		path: 'signup',
		component: SigninComponent,
	},
	{
		path: 'pets',
		component: MainPetComponent,
	},
	{
		path: '**',
		redirectTo: '',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	bootstrap: [AppComponent],
})
export class AppRouterModule {}
