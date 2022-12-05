import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { MainPetComponent } from '../pet/pages/main-pet/main-pet.component';
import { MainUserComponent } from '../user/pages/main-user/main-user.component';
import { MainServiceComponent } from '../service/pages/main-service/main-service.component';
import { MainCategoryComponent } from '../category/pages/main-category/main-category.component';

const routes: Routes = [
	{
		path: '',
		component: MainComponent,
		children: [
			{ path: 'pets', component: MainPetComponent },
			{ path: 'users', component: MainUserComponent },
			{ path: 'services', component: MainServiceComponent },
			{ path: 'categories', component: MainCategoryComponent },
			{ path: '**', redirectTo: 'pets' },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
