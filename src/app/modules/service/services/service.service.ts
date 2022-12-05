import { Injectable } from '@angular/core';
import { Service } from '../types/service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { APP_URL } from 'src/app/services/base-url-app';

@Injectable({
	providedIn: 'root',
})
export class ServiceService {
	private loading = false;
	private services: Service[] = [];
	edit: boolean = false;
	serviceUpdate!: any;

	get getServices() {
		return [...this.services];
	}

	set setService(services: Service[]) {
		this.services = services;
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
		return this.http.get<any>(`${APP_URL}api/service/`).pipe(
			catchError((error) => {
				this.loading = false;
				return error;
			})
		);
	}

	save(service: Service) {
		this.loading = true;
		return this.http.post<any>(`${APP_URL}api/service/`, service);
	}

	update(service: Service) {
		this.loading = true;
		return this.http.put<any>(`${APP_URL}api/service/`, service).pipe(
			catchError((error) => {
				this.loading = false;
				return error;
			})
		);
	}

	changeStatus(service: Service) {
		this.loading = true;
		return this.http
			.delete<any>(`${APP_URL}api/service/`, { body: service })
			.pipe(
				catchError((error) => {
					this.loading = false;
					return error;
				})
			);
	}
}
