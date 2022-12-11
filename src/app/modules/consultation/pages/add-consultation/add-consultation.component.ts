import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Consultation } from '../../types/consultation';
import { DialogRef } from '@angular/cdk/dialog';
import { ConsultationService } from '../../services/consultation.service';
import { GeneralService } from '../../../../services/general.service';
import Swal from 'sweetalert2';
import { Pet } from '../../../pet/types/pet';
import { Medicine } from '../../../medicine/types/medicine';
import {
	MatAutocomplete,
	MatAutocompleteTrigger,
} from '@angular/material/autocomplete';

@Component({
	selector: 'app-add-consultation',
	templateUrl: './add-consultation.component.html',
})
export class AddConsultationComponent implements OnInit {
	consultation: Consultation = {
		consultation_id: 0,
		consultation_date: '',
		pet: {
			pet_id: 0,
			name: '',
			breed: '',
			gender: '',
			weight: 0,
			user: {},
		},
		products: [],
		services: [],
		medicines: [],
	};

	pets: Pet[] = [];
	medicines: Medicine[] = [];
	areServicesEmpty!: boolean;

	constructor(
		public modal: DialogRef<AddConsultationComponent>,
		private consultationService: ConsultationService,
		private generalService: GeneralService
	) {
		if (this.consultationService.edit) {
			this.consultation = this.consultationService.consultationUpdate;
		}
	}

	ngOnInit(): void {
		this.getAllPets();
		this.getAllMedicines();
	}

	isLoading() {
		return this.consultationService.isLoading;
	}

	getAllPets() {
		this.consultationService.findAllPets().subscribe((response) => {
			this.consultationService.isLoading = false;

			const activePets = response.filter((pet: any) => pet.status);
			this.pets = activePets;
		});
	}

	getAllMedicines() {
		this.consultationService.findAllMedicines().subscribe((response) => {
			this.consultationService.isLoading = false;

			const activeMedicines = response.filter(
				(medicine: any) => medicine.status
			);
			this.medicines = activeMedicines;
		});
	}

	saveConsultation() {
		this.consultation.medicines =
			this.consultationService.getSelectedMedicines;
		this.consultation.products =
			this.consultationService.getSelectedProducts;
		this.consultation.services =
			this.consultationService.getSelectedServices;

		if (this.consultation.services.length === 0) {
			console.log('entro');

			this.areServicesEmpty = true;
			return;
		} else {
			this.areServicesEmpty = false;
		}

		this.generalService
			.showConfirmAlert('Los datos serán guardados')
			.then((result) => {
				if (result.isConfirmed) {
					this.consultationService.isLoading = true;

					if (this.consultationService.edit) {
						this.consultationService
							.update(this.consultation)
							.subscribe((response) => {
								if (response.error) {
									Swal.close();
									this.generalService.showError(
										response.error.message
									);
									return;
								}

								this.consultationService.isLoading = false;
								this.modal.close();
								this.consultationService.edit = false;
								Swal.close();
								this.generalService.showSnackBar(
									'La mascota se ha actualizado correctamente'
								);
							});
					} else {
						this.consultationService
							.save(this.consultation)
							.subscribe((response) => {
								if (response.error) {
									Swal.close();
									this.generalService.showError(
										response.error.message
									);
									return;
								}

								this.consultationService.isLoading = false;
								this.consultation = {
									consultation_id: 0,
									consultation_date: '',
									pet: {
										pet_id: 0,
										name: '',
										breed: '',
										gender: '',
										weight: 0,
										user: {},
									},
									products: [],
									services: [],
									medicines: [],
								};
								this.modal.close();
								this.consultationService.findAll();
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
