import { Injectable } from '@angular/core';
import { Payment } from '../types/payment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { APP_URL } from 'src/app/services/base-url-app';

@Injectable({
	providedIn: 'root',
})
export class PaymentService {
	private loading = false;
	private payments: Payment[] = [];
	edit: boolean = false;
	paymentUpdate!: any;

	get getPayments() {
		return [...this.payments];
	}

	set setPayments(payment: Payment[]) {
		this.payments = payment;
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
		return this.http.get<any>(`${APP_URL}api/payment/`).pipe(
			catchError((error) => {
				this.loading = false;
				return of(error);
			})
		);
	}

	findAllOwnPayments(id: number) {
		this.loading = true;
		return this.http.get<any>(`${APP_URL}api/payment/owner/${id}`).pipe(
			catchError((error) => {
				this.loading = false;
				return of(error);
			})
		);
	}

	save(payment: Payment) {
		this.loading = true;
		return this.http.post<any>(`${APP_URL}api/payment/`, payment).pipe(
			catchError((error) => {
				this.loading = false;
				return of(error);
			})
		);
	}

	makePayment(payment: Payment) {
		this.loading = true;
		return this.http
			.put<any>(`${APP_URL}api/payment/`, payment)
			.pipe(
				catchError((error) => {
					this.loading = false;
					return of(error);
				})
			);
	}
}
