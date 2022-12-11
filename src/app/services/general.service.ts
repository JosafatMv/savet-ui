import { Injectable } from '@angular/core';
import { APP_URL } from './base-url-app';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

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

	constructor(private http: HttpClient, private snackBar: MatSnackBar) {
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
					role: user.role!,
					token: user.token!,
				};

				return true;
			}),
			catchError((err) => of(false))
		);
	}

	messageError(err: string) {
		switch (err) {
			case 'Wrong type':
				return 'Tipo de datos incorrecto';

			case 'Missing fields':
				return 'Faltan campos';

			case 'Inexistent role':
				return 'Rol no registrado';

			case 'Nothing found':
				return 'No se encontraron datos';

			case 'Credentials mismatch':
				return 'Credenciales incorrectas';

			case 'User disabled':
				return 'Usuario deshabilitado';

			case 'User not found':
				return 'Usuario no encontrado';

			case 'Passwords mismatched':
				return 'Las contraseñas no coinciden';

			default:
				return 'Error en la petición';
		}
	}

	showError(err: string) {
		Swal.fire({
			title: 'Error',
			text: this.messageError(err),
			icon: 'error',
			confirmButtonText: 'Ok',
		});
	}

	showSnackBar(message: string) {
		this.snackBar.open(message, 'Cerrar', {
			duration: 3000,
		});
	}

	showLoading(message: string = 'Cargando...') {
		Swal.fire({
			title: message,
			text: 'Por favor espere...',
			allowOutsideClick: false,
			showConfirmButton: false,
			willOpen: () => {
				Swal.showLoading(Swal.getDenyButton());
			},
		});
	}

	showConfirmAlert(message: string, confirmMessage: string = 'Si, cambiar') {
		return Swal.fire({
			title: '¿Estás seguro?',
			text: message,
			icon: 'warning',
			showCancelButton: true,
			showLoaderOnConfirm: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: confirmMessage,
			cancelButtonText: 'Cancelar',
		});
	}
}
