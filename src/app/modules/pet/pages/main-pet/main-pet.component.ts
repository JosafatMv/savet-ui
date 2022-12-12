import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pet } from '../../types/pet';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { PetService } from '../../services/pet.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { AddPetComponent } from '../add-pet/add-pet.component';
import { GeneralService } from '../../../../services/general.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-main-pet',
	templateUrl: './main-pet.component.html',
})
export class MainPetComponent implements OnInit {
	displayedColumns: string[] = [
		'#',
		'name',
		'breed',
		'gender',
		'weight',
		'owner',
		'actions',
	];

	pets!: MatTableDataSource<Pet>;

	get isLoading() {
		return this.petService.isLoading;
	}

	getAllPets() {
		this.petService.findAll().subscribe((response: any) => {
			if (response.error) {
				this.generalService.showError(response.error.message);
				return;
			}

			this.petService.isLoading = false;
			this.pets = new MatTableDataSource(response);
			this.pets.paginator = this.paginator;
			this.pets.sort = this.sort;
		});
	}

	getAllOwnerPets(id: number) {
		this.petService.findAllOwnerPets(id).subscribe((response) => {
			if (response.error) {
				this.generalService.showError(response.error.message);
				return;
			}

			this.petService.isLoading = false;
			this.pets = new MatTableDataSource(response);
			this.pets.paginator = this.paginator;
			this.pets.sort = this.sort;
		});
	}

	getDisplayedColumns() {
		if (this.hasPermission()) {
			return this.displayedColumns;
		} else {
			return this.displayedColumns.filter(
				(column) => column !== 'actions'
			);
		}
	}

	hasPermission() {
		return (
			this.generalService.userInfo.role === 'admin' ||
			this.generalService.userInfo.role === 'veterinary'
		);
	}

	constructor(
		private petService: PetService,
		private generalService: GeneralService,
		private _liveAnnouncer: LiveAnnouncer,
		public dialog: MatDialog
	) {}

	ngOnInit(): void {
		if (this.generalService.userInfo.role === 'client') {
			const id = this.generalService.userInfo.id;
			this.getAllOwnerPets(id);
		} else {
			this.getAllPets();
		}
	}

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	// ngAfterViewInit() {}

	announceSortChange(sortState: Sort) {
		if (sortState.direction) {
			this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
		} else {
			this._liveAnnouncer.announce('Sorting cleared');
		}
	}

	openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
		const modalRef = this.dialog.open(AddPetComponent, {
			width: '60%',
			enterAnimationDuration,
			exitAnimationDuration,
			disableClose: true,
		});
		modalRef.afterClosed().subscribe((result: any) => {
			this.petService.petUpdate = {
				pet_id: 0,
				name: '',
				breed: '',
				gender: '',
				weight: 0,
				user: {},
			};
			this.petService.edit = false;
			this.getAllPets();
		});
	}

	editPet(pet: any) {
		this.petService.edit = true;
		this.petService.petUpdate = {
			...pet,
			user: { user_id: Number(pet.user_id) },
		};
		this.openDialog('2ms', '1ms');
	}

	changeStatus(pet: Pet) {
		this.generalService
			.showConfirmAlert('El status del producto se cambiará')
			.then((result) => {
				if (result.isConfirmed) {
					this.generalService.showLoading();
					this.petService
						.changeStatus(pet)
						.subscribe((response: any) => {
							if (response.error) {
								Swal.close();
								this.generalService.showError(
									response.error.message
								);
								return;
							}

							this.petService.isLoading = false;
							this.getAllPets();
							Swal.close();
							this.generalService.showSnackBar(
								'El status de la mascota se cambió correctamente'
							);
						});
				}
			});
	}
}
