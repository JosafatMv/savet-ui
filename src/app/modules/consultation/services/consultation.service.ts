import { Injectable } from '@angular/core';
import { Consultation } from '../types/consultation';
import { HttpClient } from '@angular/common/http';
import { APP_URL } from 'src/app/services/base-url-app';
import { catchError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ConsultationService {
	private loading = false;
	private consultations: Consultation[] = [];
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

	constructor(private readonly http: HttpClient) {}

	findAll() {
		this.loading = true;
		return this.http.get<any>(`${APP_URL}api/consultation/`).pipe(
			catchError((error) => {
				this.loading = false;
				return error;
			})
		);
	}

	save(consultation: Consultation) {
		this.loading = true;
		return this.http.post<any>(`${APP_URL}api/consultation/`, consultation);
	}

	findAllPets() {
		this.loading = true;
		return this.http.get<any>(`${APP_URL}api/pet/`).pipe(
			catchError((error) => {
				this.loading = false;
				return error;
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
					return error;
				})
			);
	}

	delete(id: number) {
		this.loading = true;
		return this.http.delete<any>(`${APP_URL}api/consultation/${id}`).pipe(
			catchError((error) => {
				this.loading = false;
				return error;
			})
		);
	}
}
