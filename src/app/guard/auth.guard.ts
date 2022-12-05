import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanLoad,
	Route,
	RouterStateSnapshot,
	UrlSegment,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from '../services/general.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
	constructor(
		private generalService: GeneralService,
		private router: Router
	) {}

	canActivate(): Observable<boolean> | boolean {
		if (this.generalService.isLogged) {
			return this.generalService.validateToken().pipe(
				tap((valid) => {
					if (valid) {
						const user = this.generalService.getUser();
						switch (user.role) {
							case 'admin':
								this.router.navigate(['/admin']);
								break;

							case 'client':
								this.router.navigate(['/client']);
								break;

							case 'veterinary':
								this.router.navigate(['/veterinary']);
								break;

							default:
								break;
						}
					}
				})
			);
		}
		return true;
	}

	canLoad(): Observable<boolean> | boolean {
		if (this.generalService.isLogged) {
			return this.generalService.validateToken().pipe(
				tap((valid) => {
					if (valid) {
						const user = this.generalService.getUser();
						switch (user.role) {
							case 'admin':
								this.router.navigate(['/admin']);
								break;

							case 'client':
								this.router.navigate(['/client']);
								break;

							case 'veterinary':
								this.router.navigate(['/veterinary']);
								break;

							default:
								break;
						}
					}
				})
			);
		}

		return true;
	}
}
