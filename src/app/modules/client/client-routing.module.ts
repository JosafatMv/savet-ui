import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPetComponent } from '../pet/pages/main-pet/main-pet.component';
import { MainClientComponent } from './pages/main-client/main-client.component';
import { MainConsultationComponent } from '../consultation/pages/main-consultation/main-consultation.component';
import { MainPaymentComponent } from '../payment/pages/main-payment/main-payment.component';

const routes: Routes = [
	{
		path: '',
		component: MainClientComponent,
		children: [
			{ path: 'pets', component: MainPetComponent },
			{ path: 'consultations', component: MainConsultationComponent },
			{ path: 'payments', component: MainPaymentComponent },
			{ path: '**', redirectTo: 'pets' },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientRoutingModule {}
