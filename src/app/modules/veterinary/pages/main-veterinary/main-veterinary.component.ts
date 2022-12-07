import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../../../../services/general.service';

@Component({
	selector: 'app-main-veterinary',
	templateUrl: './main-veterinary.component.html',
	styleUrls: ['./main-veterinary.component.css'],
})
export class MainVeterinaryComponent {
	logoPath: string = '../../../../../assets/imgs/petmania-logo.svg';

	constructor(
		private router: Router,
		private generalService: GeneralService
	) {}

	logout() {
		this.generalService.logout();
		this.router.navigateByUrl('/signin');
	}
}
