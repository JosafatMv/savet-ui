import { Component, OnInit } from '@angular/core';
import { Pet } from '../../types/pet';
import { PetService } from '../../services/pet.service';
import { DialogRef } from '@angular/cdk/dialog';
import Swal from 'sweetalert2';
import { GeneralService } from '../../../../services/general.service';

@Component({
	selector: 'app-add-pet',
	templateUrl: './add-pet.component.html',
})
export class AddPetComponent implements OnInit {
	pet: Pet = {
		id: 0,
		name: '',
		breed: '',
		gender: '',
		weight: 0,
		user: {},
	};

	people: any[] = [];

	constructor(
		public modal: DialogRef<AddPetComponent>,
		private petService: PetService,
		private generalService: GeneralService
	) {
		if (this.petService.edit) {
			console.log(this.petService.petUpdate);

			this.pet = this.petService.petUpdate;
		}
	}

	ngOnInit(): void {
		this.getUsers();
	}

	isLoading() {
		return this.petService.isLoading;
	}

	getUsers() {
		this.petService.findAllUsers().subscribe((response) => {
			this.petService.isLoading = false;

			const activeUsers = response.filter((user: any) => user.status);
			this.people = activeUsers;
		});
	}

	savePet() {
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

				if (this.petService.edit) {
					this.petService.update(this.pet).subscribe((response) => {
						if (response.error) {
							Swal.close();
							this.generalService.showError(
								response.error.message
							);
							return;
						}

						this.petService.isLoading = false;
						this.modal.close();
						this.petService.edit = false;
						Swal.close();
						this.generalService.showSnackBar(
							'La mascota se ha actualizado correctamente'
						);
					});
				} else {
					this.petService.save(this.pet).subscribe((response) => {
						if (response.error) {
							Swal.close();
							this.generalService.showError(
								response.error.message
							);
							return;
						}

						this.petService.isLoading = false;
						this.pet = {
							id: 0,
							name: '',
							breed: '',
							gender: '',
							weight: 0,
							user: {},
						};
						this.modal.close();
						this.petService.findAll();
						Swal.close();
						this.generalService.showSnackBar(
							'La mascota se ha guardado correctamente'
						);
					});
				}
			}
		});
	}
}
