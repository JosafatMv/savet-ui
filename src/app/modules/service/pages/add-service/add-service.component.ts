import { Component, OnInit } from '@angular/core';
import { Service } from '../../types/service';
import { DialogRef } from '@angular/cdk/dialog';
import { ServiceService } from '../../services/service.service';

@Component({
	selector: 'app-add-service',
	templateUrl: './add-service.component.html',
})
export class AddServiceComponent implements OnInit {
	service: Service = {
		id: 0,
		name: '',
		description: '',
		price: 0,
	};

	constructor(
		public modal: DialogRef<AddServiceComponent>,
		private serviceService: ServiceService
	) {
		if (this.serviceService.edit) {
			this.service = this.serviceService.serviceUpdate;
		}
	}

	ngOnInit(): void {}

	isLoading() {
		return this.serviceService.isLoading;
	}

	saveService() {
		if (this.serviceService.edit) {
			this.serviceService.update(this.service).subscribe((response) => {
				this.serviceService.isLoading = false;
				this.modal.close();
				this.serviceService.edit = false;
			});
		} else {
			this.serviceService.save(this.service).subscribe((response) => {
				this.serviceService.isLoading = false;
				this.service = {
					id: 0,
					name: '',
					description: '',
					price: 0,
				};
				this.modal.close();
				this.serviceService.findAll();
			});
		}
	}
}
