import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../../../../services/general.service';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
	logoPath: string = '../../../../../assets/imgs/petmania-logo.svg';

	constructor(
		private router: Router,
		private generalService: GeneralService
	) {}

	ngOnInit(): void {}

	logout() {
		this.generalService.logout();
		this.router.navigateByUrl('/signin');
	}
}
