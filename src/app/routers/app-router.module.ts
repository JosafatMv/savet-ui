import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';

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
