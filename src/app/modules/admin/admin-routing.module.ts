import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { MainPetComponent } from '../pet/pages/main-pet/main-pet.component';

const routes: Routes = [
	{
		path: '',
		component: MainComponent,
		children: [
			{ path: 'pets', component: MainPetComponent },
			{ path: '**', redirectTo: 'pets' },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
