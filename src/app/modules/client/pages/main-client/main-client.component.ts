import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';

@Component({
	selector: 'app-main-client',
	templateUrl: './main-client.component.html',
	styleUrls: ['./main-client.component.css'],
})
export class MainClientComponent implements OnInit {
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
