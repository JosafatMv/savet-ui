import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { GeneralService } from '../../../../services/general.service';
import { UserRegister } from '../../types/user';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
	user: UserRegister = {
		name: '',
		surname: '',
		lastname: '',
		birthdate: '',
		password: '',
		confirmPassword: '',
		email: '',
		role: '',
	};

	logoPath: string = '../../../../../assets/imgs/petmania-logo.svg';

	get isLoading() {
		return this.authService.isLoading;
	}

	constructor(
		private authService: AuthService,
		private router: Router,
		private generalService: GeneralService
	) {}

	signup() {
		this.generalService
			.showConfirmAlert(
				'¿Estás seguro que quieres registrarte?',
				'Registrarse'
			)
			.then((result) => {
				if (result.isConfirmed) {
					if (this.user.password !== this.user.confirmPassword) {
						this.generalService.showError('Passwords mismatched');
						return;
					}

					this.generalService.showLoading();

					this.user.role = 'client';

					this.authService
						.register(this.user)
						.subscribe((response) => {
							Swal.close();
							if (response.error) {
								this.generalService.showError(
									response.error.message
								);
								return;
							}

							this.user = {
								name: '',
								surname: '',
								lastname: '',
								birthdate: '',
								password: '',
								confirmPassword: '',
								email: '',
								role: '',
							};

							this.router.navigate(['/auth/confirm']);
						});
				}
			});
	}
}
