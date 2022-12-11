import { Injectable } from '@angular/core';
import { Consultation } from '../types/consultation';
import { HttpClient } from '@angular/common/http';
import { APP_URL } from 'src/app/services/base-url-app';
import { catchError, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ConsultationService {
	private loading = false;
	private consultations: Consultation[] = [];
	private selectedMedicines: any[] = [];
	private selectedServices: any[] = [];
	private selectedProducts: any[] = [];
	edit: boolean = false;
	consultationUpdate!: Consultation;

	get getConsultations() {
		return [...this.consultations];
	}

	set setConsultations(consultations: Consultation[]) {
		this.consultations = consultations;
	}

	get isLoading() {
		return this.loading;
	}

	set isLoading(isLoading: boolean) {
		this.loading = isLoading;
	}

	get getSelectedMedicines() {
		return [...this.selectedMedicines];
	}

	addSelectedMedicine(medicine: any) {
		this.selectedMedicines.push(medicine);
	}

	removeSelectedMedicine(item: any) {
		this.selectedMedicines = this.selectedMedicines.filter(
			(medicine) => medicine.medicine_id !== item.medicine_id
		);
	}

	get getSelectedServices() {
		return [...this.selectedServices];
	}

	addSelectedService(service: any) {
		this.selectedServices.push(service);
	}

	removeSelectedService(item: any) {
		this.selectedServices = this.selectedServices.filter(
			(service) => service.service_id !== item.service_id
		);
	}

	get getSelectedProducts() {
		return [...this.selectedProducts];
	}

	addSelectedProduct(product: any) {
		this.selectedProducts.push(product);
	}

	removeSelectedProduct(item: any) {
		this.selectedProducts = this.selectedProducts.filter(
			(product) => product.product_id !== item.product_id
		);
	}

	constructor(private readonly http: HttpClient) {}

	findAll() {
		this.loading = true;
		return this.http.get<any>(`${APP_URL}api/consultation/`).pipe(
			catchError((error) => {
				this.loading = false;
				return of(error);
			})
		);
	}

	save(consultation: Consultation) {
		this.loading = true;
		return this.http
			.post<any>(`${APP_URL}api/consultation/`, consultation)
			.pipe(
				catchError((error) => {
					this.loading = false;
					return of(error);
				})
			);
	}

	findAllPets() {
		this.loading = true;
		return this.http.get<any>(`${APP_URL}api/pet/`).pipe(
			catchError((error) => {
				this.loading = false;
				return of(error);
			})
		);
	}

	findAllMedicines() {
		this.loading = true;
		return this.http.get<any>(`${APP_URL}api/medicine/`).pipe(
			catchError((error) => {
				this.loading = false;
				return of(error);
			})
		);
	}

	findAllServices() {
		this.loading = true;
		return this.http.get<any>(`${APP_URL}api/service/`).pipe(
			catchError((error) => {
				this.loading = false;
				return of(error);
			})
		);
	}

	findAllProducts() {
		this.loading = true;
		return this.http.get<any>(`${APP_URL}api/product/`).pipe(
			catchError((error) => {
				this.loading = false;
				return of(error);
			})
		);
	}

	update(consultation: Consultation) {
		this.loading = true;
		return this.http
			.put<any>(`${APP_URL}api/consultation/`, consultation)
			.pipe(
				catchError((error) => {
					this.loading = false;
					return of(error);
				})
			);
	}
}
