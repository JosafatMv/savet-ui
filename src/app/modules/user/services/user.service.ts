import { Injectable } from '@angular/core';
import { User, UserForm, UserUpdate } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { APP_URL } from 'src/app/services/base-url-app';
import { catchError, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private loading = false;
	private users: User[] = [];
	edit: boolean = false;
	userUpdate!: any;

	get getUsers() {
		return [...this.users];
	}

	set setUser(users: User[]) {
		this.users = users;
	}

	set setPet(user: User) {
		this.users.push(user);
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
		return this.http.get<any>(`${APP_URL}api/user/`).pipe(
			catchError((error) => {
				this.loading = false;
				return error;
			})
		);
	}

	save(user: UserForm) {
		this.loading = true;
		return this.http.post<any>(`${APP_URL}api/user/`, user).pipe(
			catchError((error) => {
				this.loading = false;
				return of(error);
			})
		);
	}

	update(user: UserUpdate) {
		this.loading = true;
		return this.http.put<any>(`${APP_URL}api/user/`, user).pipe(
			catchError((error) => {
				this.loading = false;
				return of(error);
			})
		);
	}

	changeStatus(user: User) {
		this.loading = true;
		return this.http
			.delete<any>(`${APP_URL}api/user/`, { body: user })
			.pipe(
				catchError((error) => {
					this.loading = false;
					return of(error);
				})
			);
	}

	// delete(id: number) {
	// 	this.loading = true;
	// 	return this.http.delete<any>(`${APP_URL}api/user/${id}`).pipe(
	// 		catchError((error) => {
	// 			this.loading = false;
	// 			return error;
	// 		})
	// 	);
	// }
}
