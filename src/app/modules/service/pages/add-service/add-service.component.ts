import { Component, OnInit } from '@angular/core';
import { Service } from '../../types/service';
import { DialogRef } from '@angular/cdk/dialog';
import { ServiceService } from '../../services/service.service';
import { GeneralService } from '../../../../services/general.service';
import Swal from 'sweetalert2';

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
		private serviceService: ServiceService,
		private generalService: GeneralService
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
		this.generalService
			.showConfirmAlert('¿Desea guardar la información?')
			.then((result) => {
				if (result.isConfirmed) {
					this.generalService.showLoading();

					if (this.serviceService.edit) {
						this.serviceService
							.update(this.service)
							.subscribe((response) => {
								if (response.error) {
									this.generalService.showError(
										response.error.message
									);
									Swal.close();
									return;
								}

								this.serviceService.isLoading = false;
								this.modal.close();
								this.serviceService.edit = false;
								Swal.close();
								this.generalService.showSnackBar(
									'El servicio se actualizó correctamente'
								);
							});
						return;
					}

					this.serviceService
						.save(this.service)
						.subscribe((response) => {
							if (response.error) {
								this.generalService.showError(
									response.error.message
								);
								Swal.close();
								return;
							}

							this.serviceService.isLoading = false;
							this.service = {
								id: 0,
								name: '',
								description: '',
								price: 0,
							};
							this.modal.close();
							this.serviceService.findAll();
							Swal.close();
							this.generalService.showSnackBar(
								'El servicio se guardó correctamente'
							);
						});
				}
			});
	}
}
