import { Injectable } from '@angular/core';
import { Pet } from '../types/pet';
import { HttpClient } from '@angular/common/http';
import { APP_URL } from 'src/app/services/base-url-app';
import { catchError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class PetService {
	private loading = false;
	private pets: Pet[] = [];
	edit: boolean = false;
	petUpdate!: Pet;

	get getPets() {
		return [...this.pets];
	}

	set setPets(pets: Pet[]) {
		this.pets = pets;
	}

	set setPet(pet: Pet) {
		this.pets.push(pet);
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

	save(pet: Pet) {
		this.loading = true;
		return this.http.post<any>(`${APP_URL}api/pet/`, pet);
	}

	findAllUsers() {
		this.loading = true;
		return this.http.get<any>(`${APP_URL}api/user/`).pipe(
			catchError((error) => {
				this.loading = false;
				return error;
			})
		);
	}

	update(pet: Pet) {
		this.loading = true;
		return this.http.put<any>(`${APP_URL}api/pet/`, pet).pipe(
			catchError((error) => {
				this.loading = false;
				return error;
			})
		);
	}

	changeStatus(pet: Pet) {
		this.loading = true;
		return this.http.delete<any>(`${APP_URL}api/pet/`, { body: pet }).pipe(
			catchError((error) => {
				this.loading = false;
				return error;
			})
		);
	}

	delete(id: number) {
		this.loading = true;
		return this.http.delete<any>(`${APP_URL}api/pet/${id}`).pipe(
			catchError((error) => {
				this.loading = false;
				return error;
			})
		);
	}
}
