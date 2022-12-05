import { Component, OnInit } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { UserService } from '../../services/user.service';
import { UserForm } from '../../types/user';

@Component({
	selector: 'app-add-user',
	templateUrl: './add-user.component.html',
})
export class AddUserComponent implements OnInit {
	user: UserForm = {
		id: 0,
		name: '',
		surname: '',
		lastname: '',
		birthdate: '',
		email: '',
		password: '',
		role: '',
	};

	isEdit() {
		return this.userService.edit;
	}

	constructor(
		public modal: DialogRef<AddUserComponent>,
		private userService: UserService
	) {
		if (this.userService.edit) {
			this.user = this.userService.userUpdate;
		}
	}

	ngOnInit(): void {}

	isLoading() {
		return this.userService.isLoading;
	}

	saveUser() {
		if (this.userService.edit) {
			this.userService.update(this.user).subscribe((response) => {
				this.userService.isLoading = false;
				this.modal.close();
				this.userService.edit = false;
			});
		} else {
			this.userService.save(this.user).subscribe((response) => {
				this.userService.isLoading = false;
				this.user = {
					id: 0,
					name: '',
					surname: '',
					lastname: '',
					birthdate: '',
					email: '',
					password: '',
					role: '',
				};
				this.modal.close();
				this.userService.findAll();
			});
		}
	}
}
