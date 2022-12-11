import { Component, OnInit, ViewChild } from '@angular/core';
import { Service } from '../../types/service';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../../services/service.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { AddServiceComponent } from '../add-service/add-service.component';
import { GeneralService } from '../../../../services/general.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-main-service',
	templateUrl: './main-service.component.html',
})
export class MainServiceComponent implements OnInit {
	displayedColumns: string[] = [
		'#',
		'name',
		'description',
		'price',
		'actions',
	];

	services!: MatTableDataSource<Service>;

	get isLoading() {
		return this.serviceService.isLoading;
	}

	getDisplayedColumns() {
		if (this.isAdmin()) {
			return this.displayedColumns;
		} else {
			return this.displayedColumns.filter(
				(column) => column !== 'actions'
			);
		}
	}

	isAdmin() {
		return this.generalService.userInfo.role === 'admin';
	}

	getAllServices() {
		this.serviceService.findAll().subscribe((response) => {
			this.serviceService.isLoading = false;
			this.services = new MatTableDataSource(response);
			this.services.paginator = this.paginator;
			this.services.sort = this.sort;
		});
	}

	constructor(
		private serviceService: ServiceService,
		private generalService: GeneralService,
		private _liveAnnouncer: LiveAnnouncer,
		public dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.getAllServices();
	}

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	announceSortChange(sortState: Sort) {
		if (sortState.direction) {
			this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
		} else {
			this._liveAnnouncer.announce('Sorting cleared');
		}
	}

	openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
		const modalRef = this.dialog.open(AddServiceComponent, {
			width: '60%',
			enterAnimationDuration,
			exitAnimationDuration,
			disableClose: true,
		});
		modalRef.afterClosed().subscribe((result: any) => {
			this.serviceService.serviceUpdate = {
				id: 0,
				name: '',
				description: '',
				salary: 0.0,
			};
			this.serviceService.edit = false;
			this.getAllServices();
		});
	}

	editService(service: any) {
		this.serviceService.edit = true;
		this.serviceService.serviceUpdate = {
			...service,
		};
		this.openDialog('2ms', '1ms');
	}

	changeStatus(service: Service) {
		this.generalService
			.showConfirmAlert(
				`¿Está seguro que desea cambiar el estado del servicio?`
			)
			.then((result) => {
				if (result.isConfirmed) {
					this.generalService.showLoading();

					this.serviceService
						.changeStatus(service)
						.subscribe((response) => {
							if (response.error) {
								this.generalService.showError(
									response.error.message
								);
								Swal.close();
								return;
							}

							this.serviceService.isLoading = false;
							this.getAllServices();
							Swal.close();
							this.generalService.showSnackBar(
								`El estado del servicio ha sido cambiado exitosamente`
							);
						});
				}
			});
	}

	// deletePet(id: number) {
	// 	this.serviceService.delete(id).subscribe((response) => {
	// 		this.userService.isLoading = false;
	// 		this.getAllUsers();
	// 	});
	// }
}
