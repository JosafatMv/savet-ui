import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
	logoPath: string = '../../../../../assets/imgs/petmania-logo.svg';

	get session() {
		return this.generalService.isLogged;
	}

	constructor(
		private generalService: GeneralService,
		private router: Router
	) {
		this.generalService.isLogged = !!localStorage.getItem('token');
		// if (!this.session.logged) {
		//   this.router.navigateByUrl('/auth');
		// }
		if (!this.generalService.isLogged) {
			this.router.navigateByUrl('/auth');
		}
	}

	logout() {
		this.generalService.logout();
		this.router.navigateByUrl('/signin');
	}
}
