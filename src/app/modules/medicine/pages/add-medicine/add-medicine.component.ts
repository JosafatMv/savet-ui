import { Component, OnInit } from '@angular/core';
import { Medicine } from '../../types/medicine';
import { MedicineService } from '../../services/medicine.service';
import { DialogRef } from '@angular/cdk/dialog';
import { GeneralService } from '../../../../services/general.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-add-medicine',
	templateUrl: './add-medicine.component.html',
})
export class AddMedicineComponent implements OnInit {
	medicine: Medicine = {
		medicine_id: 0,
		tradename: '',
		scientific_name: '',
		brand: '',
		batch: '',
		date_expiry: '',
		price: 0.0,
	};

	isEdit() {
		return this.medicineService.edit;
	}

	constructor(
		public modal: DialogRef<AddMedicineComponent>,
		private medicineService: MedicineService,
		private generalService: GeneralService
	) {
		if (this.medicineService.edit) {
			this.medicine = this.medicineService.medicineUpdate;
		}
	}

	ngOnInit(): void {}

	isLoading() {
		return this.medicineService.isLoading;
	}

	saveMedicine() {
		this.generalService
			.showConfirmAlert('¿Desea guardar la información?')
			.then((result) => {
				if (result.isConfirmed) {
					this.generalService.showLoading();

					if (this.medicineService.edit) {
						this.medicineService
							.update(this.medicine)
							.subscribe((response) => {
								if (response.error) {
									Swal.close();
									this.generalService.showError(
										response.error.message
									);
									return;
								}

								this.medicineService.isLoading = false;
								this.modal.close();
								this.medicineService.edit = false;
								Swal.close();
								this.generalService.showSnackBar(
									'Información actualizada correctamente'
								);
							});
						return;
					}
					this.medicineService
						.save(this.medicine)
						.subscribe((response) => {
							if (response.error) {
								Swal.close();
								this.generalService.showError(
									response.error.message
								);
								return;
							}

							this.medicineService.isLoading = false;
							this.medicine = {
								medicine_id: 0,
								tradename: '',
								scientific_name: '',
								brand: '',
								batch: '',
								date_expiry: '',
								price: 0.0,
							};
							this.modal.close();
							this.medicineService.findAll();
							Swal.close();
							this.generalService.showSnackBar(
								'Información guardada correctamente'
							);
						});
				}
			});
	}
}
