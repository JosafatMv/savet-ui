import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class GeneralService {
	private session = {
		logged: false,
	};

	constructor() {
		this.session.logged = !!localStorage.getItem('token');
	}

	get isLogged() {
		return this.session.logged;
	}

	set isLogged(value) {
		this.session.logged = value;
	}
}
