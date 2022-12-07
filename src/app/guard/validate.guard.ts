import { Injectable } from '@angular/core';
import {
	CanActivate,
	CanLoad,
	Router,
	ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from '../services/general.service';
import { tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class ValidateGuard implements CanActivate, CanLoad {
	constructor(
		private generalService: GeneralService,
		private router: Router
	) {}

	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
		return this.generalService.validateToken().pipe(
			tap((valid) => {
				if (!valid) {
					this.router.navigateByUrl('/auth');
				} else {
					if (!this.checkRole(route)) {
						this.router.navigateByUrl('/auth');
					}
				}
			})
		);
	}

	canLoad(): Observable<boolean> | boolean {
		return this.generalService.validateToken().pipe(
			tap((valid) => {
				if (!valid) {
					this.router.navigateByUrl('/auth');
				}
			})
		);
	}

	checkRole(route: ActivatedRouteSnapshot): boolean {
		const user = this.generalService.getUser();
		if (user.role === route.data['role']) {
			return true;
		}
		return false;
	}
}
