import { Injectable } from '@angular/core';
import { Category } from '../types/category';
import { HttpClient } from '@angular/common/http';
import { APP_URL } from 'src/app/services/base-url-app';
import { catchError, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	private loading = false;
	private categories: Category[] = [];
	edit: boolean = false;
	categoryUpdate!: any;

	get getCategories() {
		return [...this.categories];
	}

	set setCategories(categories: Category[]) {
		this.categories = categories;
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
		return this.http.get<any>(`${APP_URL}api/category/`).pipe(
			catchError((error) => {
				this.loading = false;
				return of(error);
			})
		);
	}

	save(category: Category) {
		this.loading = true;
		return this.http.post<any>(`${APP_URL}api/category/`, category).pipe(
			catchError((error) => {
				this.loading = false;
				return of(error);
			})
		);
	}

	update(category: Category) {
		this.loading = true;
		return this.http.put<any>(`${APP_URL}api/category/`, category).pipe(
			catchError((error) => {
				this.loading = false;
				return of(error);
			})
		);
	}

	changeStatus(category: Category) {
		this.loading = true;
		return this.http
			.delete<any>(`${APP_URL}api/category/`, { body: category })
			.pipe(
				catchError((error) => {
					this.loading = false;
					return of(error);
				})
			);
	}
}
