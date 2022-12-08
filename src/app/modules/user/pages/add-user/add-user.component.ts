import { Component, OnInit } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { UserService } from '../../services/user.service';
import { UserForm } from '../../types/user';
import Swal from 'sweetalert2';
import { GeneralService } from '../../../../services/general.service';

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
		private userService: UserService,
		private generalService: GeneralService
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
		Swal.fire({
			title: '¿Estás seguro?',
			text: 'Los datos serán guardados',
			icon: 'warning',
			showCancelButton: true,
			showLoaderOnConfirm: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, guardar',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: 'Guardando...',
					text: 'Por favor espere...',
					allowOutsideClick: false,
					showConfirmButton: false,
					willOpen: () => {
						Swal.showLoading(Swal.getDenyButton());
					},
				});

				if (this.userService.edit) {
					this.userService.update(this.user).subscribe((response) => {
						if (response.error) {
							Swal.close();
							this.generalService.showError(
								response.error.message
							);
							return;
						}

						this.userService.isLoading = false;
						this.modal.close();
						this.userService.edit = false;
						Swal.close();
						this.generalService.showSnackBar(
							'Usuario actualizado correctamente'
						);
					});
				} else {
					this.userService.save(this.user).subscribe((response) => {
						if (response.error) {
							Swal.close();
							this.generalService.showError(
								response.error.message
							);
							return;
						}

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
						Swal.close();
						this.generalService.showSnackBar(
							'Usuario guardado correctamente'
						);
					});
				}
			}
		});
	}
}
