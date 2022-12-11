import { Component, OnInit } from '@angular/core';
import { ConsultationService } from '../../services/consultation.service';

@Component({
	selector: 'app-select-medicines',
	templateUrl: './select-medicines.component.html',
})
export class SelectMedicinesComponent implements OnInit {
	dropdownList!: any;
	dropdownSettings: any = {};

	constructor(private consultationService: ConsultationService) {}

	ngOnInit(): void {
		this.getAllMedicines();
		this.dropdownSettings = {
			singleSelection: false,
			idField: 'medicine_id',
			textField: 'tradename',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			itemsShowLimit: 3,
			allowSearchFilter: false,
			enableCheckAll: false,
		};
	}

	onItemSelect(item: any) {
		console.log(item);

		this.consultationService.addSelectedMedicine(item);
	}

	getSelectedMedicines() {
		return this.consultationService.getSelectedMedicines;
	}

	onSelectAll(items: any) {
		console.log(items);
	}

	onItemDeSelect(item: any) {
		this.consultationService.removeSelectedMedicine(item);
	}

	getAllMedicines() {
		this.consultationService.findAllMedicines().subscribe((response) => {
			this.consultationService.isLoading = false;

			const activeMedicines = response.filter(
				(medicine: any) => medicine.status
			);
			this.dropdownList = activeMedicines;
		});
	}
}
