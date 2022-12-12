import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPaymentComponent } from './pages/main-payment/main-payment.component';
import { FormsModule } from '@angular/forms';
import { materialModules } from 'src/app/types/material-modules';
import { MakePaymentComponent } from './pages/make-payment/make-payment.component';

@NgModule({
	declarations: [MainPaymentComponent, MakePaymentComponent],
	imports: [CommonModule, FormsModule, ...materialModules],
	exports: [MainPaymentComponent],
})
export class PaymentModule {}
