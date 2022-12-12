import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPaymentComponent } from './pages/main-payment/main-payment.component';
import { FormsModule } from '@angular/forms';
import { materialModules } from 'src/app/types/material-modules';
import { MakePaymentComponent } from './pages/make-payment/make-payment.component';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
	declarations: [MainPaymentComponent, MakePaymentComponent],
	imports: [CommonModule, FormsModule, ...materialModules, NgxPayPalModule],
	exports: [MainPaymentComponent],
})
export class PaymentModule {}
