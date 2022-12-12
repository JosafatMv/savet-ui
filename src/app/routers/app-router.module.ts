import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { ValidateGuard } from '../guard/validate.guard';
import { AuthGuard } from '../guard/auth.guard';
import { NoAuthorizationComponent } from '../shared/no-authorization/no-authorization.component';

const routes: Routes = [
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
		path: 'veterinary',
		loadChildren: () =>
			import('../modules/veterinary/veterinary.module').then(
				(m) => m.VeterinaryModule
			),
		canActivate: [ValidateGuard],
		canLoad: [ValidateGuard],

		data: { role: 'veterinary' },
	},
	{
		path: 'client',
		loadChildren: () =>
			import('../modules/client/client.module').then(
				(m) => m.ClientModule
			),
		canActivate: [ValidateGuard],
		canLoad: [ValidateGuard],
		data: { role: 'client' },
	},
	{
		path: 'no-authorization',
		canActivate: [ValidateGuard],
		canLoad: [ValidateGuard],
		canActivateChild: [ValidateGuard],
		component: NoAuthorizationComponent,
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
