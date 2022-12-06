import { Injectable } from '@angular/core';
import { Product } from '../types/product';
import { HttpClient } from '@angular/common/http';
import { APP_URL } from 'src/app/services/base-url-app';
import { catchError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	private loading = false;
	private products: Product[] = [];
	edit: boolean = false;
	productUpdate!: Product;

	get getProducts() {
		return [...this.products];
	}

	set setPets(products: Product[]) {
		this.products = products;
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
		return this.http.get<any>(`${APP_URL}api/product/`).pipe(
			catchError((error) => {
				this.loading = false;
				return error;
			})
		);
	}

	save(product: Product) {
		this.loading = true;
		return this.http.post<any>(`${APP_URL}api/product/`, product);
	}

	findAllCategories() {
		this.loading = true;
		return this.http.get<any>(`${APP_URL}api/category/`).pipe(
			catchError((error) => {
				this.loading = false;
				return error;
			})
		);
	}

	update(product: Product) {
		this.loading = true;
		return this.http.put<any>(`${APP_URL}api/product/`, product).pipe(
			catchError((error) => {
				this.loading = false;
				return error;
			})
		);
	}

	changeStatus(product: Product) {
		this.loading = true;
		return this.http
			.delete<any>(`${APP_URL}api/product/`, { body: product })
			.pipe(
				catchError((error) => {
					this.loading = false;
					return error;
				})
			);
	}

	delete(id: number) {
		this.loading = true;
		return this.http.delete<any>(`${APP_URL}api/product/${id}`).pipe(
			catchError((error) => {
				this.loading = false;
				return error;
			})
		);
	}

	// Returns an observable
	upload(file: any) {
		// Create form data
		this.loading = true;

		const formData = new FormData();
		formData.append('upload_preset', 'vskekzfm');
		formData.append('file', file);
		formData.append('api_key', '349172525139577');
		formData.append('folder', 'products');

		return this.http
			.post('https://api.cloudinary.com/v1_1/sigsa/upload', formData, {
				headers: { skip: 'true' },
			})
			.pipe(
				catchError((error) => {
					this.loading = false;
					return error;
				})
			);
	}
}
