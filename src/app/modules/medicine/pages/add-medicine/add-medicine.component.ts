import { Component, OnInit } from '@angular/core';
import { Medicine } from '../../types/medicine';
import { MedicineService } from '../../services/medicine.service';
import { DialogRef } from '@angular/cdk/dialog';

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
		private medicineService: MedicineService
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
		if (this.medicineService.edit) {
			this.medicineService.update(this.medicine).subscribe((response) => {
				this.medicineService.isLoading = false;
				this.modal.close();
				this.medicineService.edit = false;
			});
		} else {
			this.medicineService.save(this.medicine).subscribe((response) => {
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
			});
		}
	}
}
