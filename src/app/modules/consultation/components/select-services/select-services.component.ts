import { Component, OnInit } from '@angular/core';
import { ConsultationService } from '../../services/consultation.service';

@Component({
	selector: 'app-select-services',
	templateUrl: './select-services.component.html',
})
export class SelectServicesComponent implements OnInit {
	dropdownList!: any;
	dropdownSettings: any = {};

	constructor(private consultationService: ConsultationService) {}

	ngOnInit(): void {
		this.getAllServices();
		this.dropdownSettings = {
			singleSelection: false,
			idField: 'service_id',
			textField: 'name',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			itemsShowLimit: 3,
			allowSearchFilter: false,
			enableCheckAll: false,
		};
	}

	onItemSelect(item: any) {
		this.consultationService.addSelectedService(item);
	}

	getSelectedServices() {
		return this.consultationService.getSelectedServices;
	}

	onItemDeSelect(item: any) {
		this.consultationService.removeSelectedService(item);
	}

	getAllServices() {
		this.consultationService.findAllServices().subscribe((response) => {
			this.consultationService.isLoading = false;

			const activeServices = response.filter(
				(service: any) => service.status
			);
			this.dropdownList = activeServices;
		});
	}
}
