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
	) {
		if (!!localStorage.getItem('token')) {
			// this.router.navigate(['']);
			console.log(localStorage.getItem('token'));
		}
	}

	signin() {
		console.log(this.user);

		this.authService.login(this.user);
		// this.router.navigate(['']);
		this.generalService.isLogged = true;
	}
}
