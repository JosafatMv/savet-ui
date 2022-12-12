import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainVeterinaryComponent } from './pages/main-veterinary/main-veterinary.component';
import { MainConsultationComponent } from '../consultation/pages/main-consultation/main-consultation.component';
import { MainServiceComponent } from '../service/pages/main-service/main-service.component';
import { MainProductComponent } from '../product/pages/main-product/main-product.component';
import { MainPetComponent } from '../pet/pages/main-pet/main-pet.component';
import { MainPaymentComponent } from '../payment/pages/main-payment/main-payment.component';

const routes: Routes = [
	{
		path: '',
		component: MainVeterinaryComponent,
		children: [
			{ path: 'consultations', component: MainConsultationComponent },
			{ path: 'services', component: MainServiceComponent },
			{ path: 'products', component: MainProductComponent },
			{ path: 'pets', component: MainPetComponent },
			{ path: 'payments', component: MainPaymentComponent },
			{ path: '**', redirectTo: 'consultations' },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class VeterinaryRoutingModule {}
