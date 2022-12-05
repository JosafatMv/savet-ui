import { Injectable } from '@angular/core';
import { APP_URL } from './base-url-app';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';

interface User {
	id: number;
	token: string;
	email: string;
	role: string;
}

@Injectable({
	providedIn: 'root',
})
export class GeneralService {
	private session = {
		logged: false,
	};

	private user!: User;

	constructor(private http: HttpClient) {
		this.session.logged = !!localStorage.getItem('token');
	}

	get isLogged() {
		return this.session.logged;
	}

	set isLogged(value) {
		this.session.logged = value;
	}

	get userInfo() {
		return { ...this.user };
	}

	set userInfo(value) {
		this.user = value;
	}

	getUser() {
		return { ...this.user };
	}

	logout() {
		this.session.logged = false;
		localStorage.removeItem('token');
	}

	validateToken(): Observable<boolean> {
		const url = `${APP_URL}api/auth/renew`;

		// const headers = new HttpHeaders().set(
		// 	'Autorization',
		// 	`Bearer ${localStorage.getItem('token')}` || ''
		// );

		return this.http.get<any>(url).pipe(
			map((response) => {
				const { user } = response;

				localStorage.setItem('token', user.token!);
				this.user = {
					id: user.id!,
					email: user.email!,
					role: user.role	!,
					token: user.token!,
				};

				return true;
			}),
			catchError((err) => of(false))
		);
	}
}
