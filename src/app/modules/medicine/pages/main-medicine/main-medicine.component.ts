import { Component, OnInit, ViewChild } from '@angular/core';
import { Medicine } from '../../types/medicine';
import { MatTableDataSource } from '@angular/material/table';
import { MedicineService } from '../../services/medicine.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { AddMedicineComponent } from '../add-medicine/add-medicine.component';
import { GeneralService } from '../../../../services/general.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-main-medicine',
	templateUrl: './main-medicine.component.html',
})
export class MainMedicineComponent implements OnInit {
	displayedColumns: string[] = [
		'#',
		'tradename',
		'scientific_name',
		'brand',
		'batch',
		'date_expiry',
		'price',
		'actions',
	];

	medicines!: MatTableDataSource<Medicine>;

	get isLoading() {
		return this.medicineService.isLoading;
	}

	getAllMedicines() {
		this.medicineService.findAll().subscribe((response) => {
			this.medicineService.isLoading = false;
			this.medicines = new MatTableDataSource(response);
			this.medicines.paginator = this.paginator;
			this.medicines.sort = this.sort;
		});
	}

	constructor(
		private medicineService: MedicineService,
		private generalService: GeneralService,
		private _liveAnnouncer: LiveAnnouncer,
		public dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.getAllMedicines();
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
		const modalRef = this.dialog.open(AddMedicineComponent, {
			width: '60%',
			enterAnimationDuration,
			exitAnimationDuration,
			disableClose: true,
		});
		modalRef.afterClosed().subscribe((result: any) => {
			this.medicineService.medicineUpdate = {
				medicine_id: 0,
				tradename: '',
				scientific_name: '',
				brand: '',
				batch: '',
				date_expiry: '',
				price: 0.0,
			};
			this.medicineService.edit = false;
			this.getAllMedicines();
		});
	}

	editMedicine(medicine: any) {
		this.medicineService.edit = true;
		this.medicineService.medicineUpdate = {
			...medicine,
			date_expiry: medicine.date_expiry.split('T')[0],
		};
		this.openDialog('2ms', '1ms');
	}

	changeStatus(medicine: Medicine) {
		this.generalService
			.showConfirmAlert(
				'¿Está seguro de cambiar el estado del medicamento?'
			)
			.then((result) => {
				if (result.isConfirmed) {
					this.generalService.showLoading();

					this.medicineService
						.changeStatus(medicine)
						.subscribe((response) => {
							if (response.error) {
								Swal.close();
								this.generalService.showError(
									response.error.message
								);
								return;
							}

							this.medicineService.isLoading = false;
							this.getAllMedicines();
							Swal.close();
							this.generalService.showSnackBar(
								'El estado del medicamento ha sido cambiado'
							);
						});
				}
			});
	}
}
