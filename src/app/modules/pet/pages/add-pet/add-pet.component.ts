import { Component, OnInit } from '@angular/core';
import { Pet } from '../../types/pet';
import { PetService } from '../../services/pet.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
	selector: 'app-add-pet',
	templateUrl: './add-pet.component.html',
})
export class AddPetComponent implements OnInit {
	pet: Pet = {
		id: 0,
		name: '',
		breed: '',
		gender: '',
		weight: 0,
		personal: {},
	};

	people: any[] = [];

	constructor(
		public modal: DialogRef<AddPetComponent>,
		private petService: PetService
	) {
		if (this.petService.edit) {
			this.pet = this.petService.petUpdate;
		}
	}

	ngOnInit(): void {
		this.getPersonal();
	}

	isLoading() {
		return this.petService.isLoading;
	}

	getPersonal() {
		this.petService.findAllPersonal().subscribe((response) => {
			this.petService.isLoading = false;

			this.people = response;
		});
	}

	savePet() {
		if (this.petService.edit) {
			this.petService.update(this.pet).subscribe((response) => {
				this.petService.isLoading = false;
				this.modal.close();
				this.petService.edit = false;
			});
		} else {
			this.petService.save(this.pet).subscribe((response) => {
				this.petService.isLoading = false;
				this.pet = {
					id: 0,
					name: '',
					breed: '',
					gender: '',
					weight: 0,
					personal: {},
				};
				this.modal.close();
				this.petService.findAll();
			});
		}
	}
}
