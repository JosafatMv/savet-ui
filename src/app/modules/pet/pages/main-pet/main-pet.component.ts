import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pet } from '../../types/pet';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { PetService } from '../../services/pet.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { AddPetComponent } from '../add-pet/add-pet.component';

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
		this.petService.findAll().subscribe((response) => {
			this.petService.isLoading = false;
			this.pets = new MatTableDataSource(response);
			this.pets.paginator = this.paginator;
			this.pets.sort = this.sort;
		});
	}

	constructor(
		private petService: PetService,
		private _liveAnnouncer: LiveAnnouncer,
		public dialog: MatDialog
	) {
		// this.getPersonal();
		// this.pets = new MatTableDataSource<Pet>(this.petService.getPets);
	}

	ngOnInit(): void {
		this.getAllPets();
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
				id: 0,
				name: '',
				breed: '',
				gender: '',
				weight: 0,
				personal: {},
			};
			this.petService.edit = false;
			this.getAllPets();
		});
	}

	editPet(pet: any) {
		this.petService.edit = true;
		this.petService.petUpdate = {
			...pet,
			personal: { personal_id: Number(pet.personal_id) },
		};
		this.openDialog('2ms', '1ms');
	}

	changeStatus(pet: Pet) {
		this.petService.changeStatus(pet).subscribe((response) => {
			this.petService.isLoading = false;
			this.getAllPets();
		});
	}

	deletePet(id: number) {
		this.petService.delete(id).subscribe((response) => {
			this.petService.isLoading = false;
			this.getAllPets();
		});
	}
}
