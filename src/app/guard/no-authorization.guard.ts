import { Injectable } from '@angular/core';
import {
	CanActivate,
	CanLoad,
	Router,
	ActivatedRouteSnapshot,
	NavigationStart,
	Event as NavigationEvent,
	Route,
	CanActivateChild,
} from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from '../services/general.service';
import { tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class NoAuthorizationGuard
	implements CanActivate, CanLoad, CanActivateChild
{
	event$;
	current_url: string = '';

	constructor(
		private generalService: GeneralService,
		private router: Router
	) {
		this.event$ = this.router.events.subscribe((event: NavigationEvent) => {
			if (event instanceof NavigationStart) {
				this.current_url = event.url;
			}
		});
	}

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

				if (this.generalService.getUser().isConfirmed !== 0) {
					this.router.navigateByUrl(`/${route.data['role']}/`);

					return false;
				} else {
					return true;
				}
			})
		);
	}

	canLoad(route: Route): Observable<boolean> | boolean {
		let url = route.path;
		console.log('Url:' + url);
		return this.generalService.validateToken().pipe(
			tap((valid) => {
				if (!valid) {
					this.router.navigateByUrl('/auth');
				}
			})
		);
	}

	canActivateChild(
		route: ActivatedRouteSnapshot
	): Observable<boolean> | boolean {
		console.log('Checking child route access');

		return this.canActivate(route);
	}

	checkRole(route: ActivatedRouteSnapshot): boolean {
		const user = this.generalService.getUser();
		console.log(user);

		if (user.role === route.data['role']) {
			return true;
		}
		return false;
	}
}
