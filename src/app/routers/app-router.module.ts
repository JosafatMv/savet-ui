import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { RegisterComponent } from '../modules/auth/pages/register/register.component';

const routes: Routes = [
	// {
	// 	path: '',
	// 	component: MainPersonalComponent,
	// 	pathMatch: 'full',
	// },

	// {
	// 	path: 'auth',
	// 	component: SigninComponent,
	// },
  {
    path: 'signup',
    component: RegisterComponent
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
