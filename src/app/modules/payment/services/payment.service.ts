import { Injectable } from "@angular/core";
import { Payment } from '../types/payment';
import { HttpClient } from '@angular/common/http';
import { APP_URL } from "src/app/services/base-url-app";
import { catchError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class PaymentService {
	private loading = false;
	private payment: Payment[] = [];

	get getPayment() {
		return [...this.payment];
	}

	set setPayment(payment: Payment[]) {
		this.payment = this.payment;
	}

	set setPet(payment: Payment) {
		this.payment.push(payment);
	}

	get isLoading() {
		return this.loading;
	}

	set isLoading(isLoading: boolean) {
		this.loading = isLoading;
	}

	constructor(private readonly http: HttpClient) {}

	findAll() {
		this.loading = true;
		return this.http.get<any>(`${APP_URL}api/pet/`).pipe(
			catchError((error) => {
				this.loading = false;
				return error;
			})
		);
	}
}
