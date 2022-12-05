import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { ValidateGuard } from '../guard/validate.guard';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
	// {
	// 	path: '',
	// 	loadChildren: () =>
	// 		import('../modules/auth/auth.module').then((m) => m.AuthModule),
	// 	canActivate: [ValidateGuard],
	// 	canLoad: [ValidateGuard],
	// 	pathMatch: 'full',
	// },
	// {
	// 	path: '',
	// 	component: SigninComponent,
	// },
	{
		path: 'auth',
		loadChildren: () =>
			import('../modules/auth/auth.module').then((m) => m.AuthModule),
		canActivate: [AuthGuard],
		canLoad: [AuthGuard],
	},
	{
		path: 'admin',
		loadChildren: () =>
			import('../modules/admin/admin.module').then((m) => m.AdminModule),
		canActivate: [ValidateGuard],
		canLoad: [ValidateGuard],
		data: { role: 'admin' },
	},
	{
		path: '**',
		redirectTo: 'auth',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	bootstrap: [AppComponent],
})
export class AppRouterModule {}
