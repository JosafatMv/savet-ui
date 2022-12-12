import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-no-authorization',
	templateUrl: './no-authorization.component.html',
	styleUrls: ['./no-authorization.component.css'],
})
export class NoAuthorizationComponent implements OnInit {
	imgUrl = '../../../../../assets/imgs/no-authorization.svg';

	constructor(
		private generalService: GeneralService,
		private router: Router
	) {}

	ngOnInit(): void {}

	logout() {
		this.generalService.logout();
		this.router.navigateByUrl('/signin');
	}
}
