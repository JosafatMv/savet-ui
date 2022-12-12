import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ICreateOrderRequest } from 'ngx-paypal';
import { GeneralService } from 'src/app/services/general.service';
import { PaymentService } from '../../services/payment.service';
import { Payment } from '../../types/payment';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
	selector: 'app-make-payment',
	templateUrl: './make-payment.component.html',
})
export class MakePaymentComponent implements OnInit {
	public payPalConfig: any;
	public showPaypalButtons!: boolean;
	payment: Payment = {
		payment_id: 0,
		amount: 0.0,
		paid: 0,
		consultation: {},
		pet: {},
	};

	constructor(
		public modal: DialogRef<MakePaymentComponent>,
		private generalService: GeneralService,
		private paymentService: PaymentService
	) {
		if (this.paymentService.edit) {
			this.payment = this.paymentService.paymentUpdate;
		}
	}

	ngOnInit() {
		this.payPalConfig = {
			currency: 'MXN',
			clientId:
				'AQGf8qoZJ4Y77lAvYWFSsx3Sg0LoMCB9LeDJ-P7CunAJJwhAseAPa-yRKpiLQ3bv8T12e8zCNRo50TW7',
			createOrder: (data: any) =>
				<ICreateOrderRequest>{
					intent: 'CAPTURE',
					purchase_units: [
						{
							amount: {
								currency_code: 'MXN',
								value: this.payment.amount.toString(),
								breakdown: {
									item_total: {
										currency_code: 'MXN',
										value: this.payment.amount.toString(),
									},
								},
							},
							items: [
								{
									name: 'Consulta de la mascota',
									unit_amount: {
										currency_code: 'MXN',
										value: this.payment.amount.toString(),
									},
								},
							],
						},
					],
				},
			advanced: {
				commit: 'true',
			},
			style: {
				label: 'paypal',
				layout: 'vertical',
			},
			onApprove: (data: any, actions: any) => {
				console.log(
					'onApprove - transaction was approved, but not authorized',
					data,
					actions
				);
				actions.order.get().then((details: any) => {
					console.log(
						'onApprove - you can get full order details inside onApprove: ',
						details
					);
				});
			},
			onClientAuthorization: (data: any) => {
				this.paymentService
					.makePayment(this.payment)
					.subscribe((response) => {
						if (response.error) {
							this.generalService.showError(
								response.error.message
							);
							return;
						}
						this.paymentService.edit = false;
						this.paymentService.paymentUpdate = {
							payment_id: 0,
							amount: 0.0,
							paid: 0,
							consultation: {},
							pet: {},
						};
						this.paymentService.isLoading = false;
						this.modal.close();
						this.generalService.showSnackBar(
							'Pago realizado con éxito'
						);
					});
			},
			onCancel: (data: any, actions: any) => {
				console.log('OnCancel', data, actions);
			},
			onError: (err: any) => {
				this.generalService.showError(err);
			},
			onClick: (data: any, actions: any) => {
				console.log('onClick', data, actions);
			},
		};
	}

	pay() {
		this.showPaypalButtons = true;
	}

	back() {
		this.showPaypalButtons = false;
	}
}
