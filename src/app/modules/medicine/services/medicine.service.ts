import { Injectable } from '@angular/core';
import { Medicine } from '../types/medicine';
import { HttpClient } from '@angular/common/http';
import { APP_URL } from 'src/app/services/base-url-app';
import { catchError, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class MedicineService {
	private loading = false;
	private medicines: Medicine[] = [];
	edit: boolean = false;
	medicineUpdate!: any;

	get getMedicines() {
		return [...this.medicines];
	}

	set setMedicines(medicines: Medicine[]) {
		this.medicines = medicines;
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
		return this.http.get<any>(`${APP_URL}api/medicine/`).pipe(
			catchError((error) => {
				this.loading = false;
				return of(error);
			})
		);
	}

	save(medicine: Medicine) {
		this.loading = true;
		return this.http.post<any>(`${APP_URL}api/medicine/`, medicine).pipe(
			catchError((error) => {
				this.loading = false;
				return of(error);
			})
		);
	}

	update(medicine: Medicine) {
		this.loading = true;
		return this.http.put<any>(`${APP_URL}api/medicine/`, medicine).pipe(
			catchError((error) => {
				this.loading = false;
				return of(error);
			})
		);
	}

	changeStatus(medicine: Medicine) {
		this.loading = true;
		return this.http
			.delete<any>(`${APP_URL}api/medicine/`, { body: medicine })
			.pipe(
				catchError((error) => {
					this.loading = false;
					return of(error);
				})
			);
	}
}
