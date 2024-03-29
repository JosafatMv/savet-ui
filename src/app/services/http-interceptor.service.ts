import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CustomHttpInterceptorService implements HttpInterceptor {
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const skipIntercept = req.headers.has('skip');

		if (skipIntercept) {
			req = req.clone({
				headers: req.headers.delete('skip'),
			});

			return next.handle(req);
		}

		const token = localStorage.getItem('token');
		const isLogged = !!token;
		if (isLogged) {
			req = req.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`,
					ContentType: `application/json`,
					Accept: `application/json`,
				},
			});
		}
		return next.handle(req);
	}
}
