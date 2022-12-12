import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { MainPetComponent } from '../pet/pages/main-pet/main-pet.component';
import { MainUserComponent } from '../user/pages/main-user/main-user.component';
import { MainServiceComponent } from '../service/pages/main-service/main-service.component';
import { MainCategoryComponent } from '../category/pages/main-category/main-category.component';
import { MainProductComponent } from '../product/pages/main-product/main-product.component';
import { MainMedicineComponent } from '../medicine/pages/main-medicine/main-medicine.component';
import { MainConsultationComponent } from '../consultation/pages/main-consultation/main-consultation.component';
import { MainPaymentComponent } from '../payment/pages/main-payment/main-payment.component';

const routes: Routes = [
	{
		path: '',
		component: MainComponent,
		children: [
			{ path: 'pets', component: MainPetComponent },
			{ path: 'users', component: MainUserComponent },
			{ path: 'consultations', component: MainConsultationComponent },
			{ path: 'payments', component: MainPaymentComponent },
			{ path: 'services', component: MainServiceComponent },
			{ path: 'categories', component: MainCategoryComponent },
			{ path: 'products', component: MainProductComponent },
			{ path: 'medicines', component: MainMedicineComponent },
			{ path: '**', redirectTo: 'users' },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
