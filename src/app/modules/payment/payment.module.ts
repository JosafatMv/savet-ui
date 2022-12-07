import { NgModule } from '@angular/core';
import { MainPaymentComponent } from './pages/main-payment/main-payment.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { materialModules } from '../../types/material-modules';

@NgModule({
  declarations: [MainPaymentComponent],
  imports:[CommonModule, FormsModule, ...materialModules],
  exports: [MainPaymentComponent],
})
export class PaymentModule{}
