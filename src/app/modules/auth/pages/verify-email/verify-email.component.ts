import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-verify-email',
	templateUrl: './verify-email.component.html',
	styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
	private isConfirmed: boolean = false;
	imgSrc = '../../../../../assets/imgs/404.png';
	successImgSrc = '../../../../../assets/imgs/success.svg';

	get isConfirmedEmail() {
		return this.isConfirmed;
	}

	set isConfirmedEmail(value) {
		this.isConfirmed = value;
	}

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			const token = params['token'];

			if (token) {
				this.authService.confirmEmail(token).subscribe((response) => {
					if (response.error) {
						this.isConfirmedEmail = false;
					} else {
						this.isConfirmedEmail = true;
					}
				});
			} else {
				this.isConfirmedEmail = false;
			}
		});
	}
}
