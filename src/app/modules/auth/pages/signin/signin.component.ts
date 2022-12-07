import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { UserLogin } from '../../types/user';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
	user: UserLogin = {
		email: '',
		password: '',
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

	signin() {
		this.authService.login(this.user).subscribe((response: any) => {
			if (response.err) {
				console.log(response.err.error.message);
				return;
			}

			const { user } = response;

			localStorage.setItem('token', user.token);
			this.generalService.isLogged = true;
			this.authService.isLoading = false;

			switch (user.role) {
				case 'admin':
					this.router.navigateByUrl('/admin');
					break;

				case 'veterinary':
					this.router.navigateByUrl('/veterinary');
					break;

				case 'client':
					this.router.navigateByUrl('/client');
					break;
			}
		});
	}
}
