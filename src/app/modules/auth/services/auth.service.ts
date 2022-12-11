import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin, UserRegister } from '../types/user';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { GeneralService } from '../../../services/general.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private loading: boolean = false;

	get isLoading() {
		return this.loading;
	}

	set isLoading(value) {
		this.loading = value;
	}

	constructor(
		private readonly http: HttpClient,
		private router: Router,
		private generalService: GeneralService
	) {}

	login(payload: UserLogin) {
		this.loading = true;
		return this.http.post('http://localhost:3000/api/auth/', payload).pipe(
			catchError((err) => {
				this.loading = false;
				return of(err);
			})
		);
	}

	register(payload: UserRegister) {
		this.loading = true;
		return this.http
			.post<any>('http://localhost:3000/api/user', payload, {
				headers: {
					skip: 'true',
				},
			})
			.pipe(
				catchError((error) => {
					this.loading = false;
					return of(error);
				})
			);
	}

	confirmEmail(token: string) {
		return this.http
			.get<any>(`http://localhost:3000/api/auth/confirm/${token}`)
			.pipe(
				catchError((error) => {
					this.loading = false;
					return of(error);
				})
			);
	}
}
