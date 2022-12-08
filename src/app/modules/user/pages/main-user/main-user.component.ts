import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../types/user';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { AddUserComponent } from '../add-user/add-user.component';
import Swal from 'sweetalert2';
import { GeneralService } from '../../../../services/general.service';

@Component({
	selector: 'app-main-user',
	templateUrl: './main-user.component.html',
})
export class MainUserComponent implements OnInit {
	displayedColumns: string[] = [
		'#',
		'name',
		'surname',
		'lastname',
		'birthdate',
		'email',
		'role',
		'actions',
	];

	users!: MatTableDataSource<User>;

	get isLoading() {
		return this.userService.isLoading;
	}

	getAllUsers() {
		this.userService.findAll().subscribe((response) => {
			this.userService.isLoading = false;
			this.users = new MatTableDataSource(response);
			this.users.paginator = this.paginator;
			this.users.sort = this.sort;
		});
	}

	constructor(
		private userService: UserService,
		private generalService: GeneralService,
		private _liveAnnouncer: LiveAnnouncer,
		public dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.getAllUsers();
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
		const modalRef = this.dialog.open(AddUserComponent, {
			width: '60%',
			enterAnimationDuration,
			exitAnimationDuration,
			disableClose: true,
		});
		modalRef.afterClosed().subscribe((result: any) => {
			this.userService.userUpdate = {
				id: 0,
				name: '',
				surname: '',
				lastname: '',
				email: '',
				birthdate: '',
				role: '',
			};
			this.userService.edit = false;
			this.getAllUsers();
		});
	}

	editUser(user: any) {
		this.userService.edit = true;
		this.userService.userUpdate = {
			...user,
			birthdate: user.birthdate.split('T')[0],
		};
		this.openDialog('2ms', '1ms');
	}

	changeStatus(user: User) {
		Swal.fire({
			title: '¿Estás seguro?',
			text: 'El status del usuario se cambiará',
			icon: 'warning',
			showCancelButton: true,
			showLoaderOnConfirm: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, cambiar',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: 'Cambiando status...',
					text: 'Por favor espere...',
					allowOutsideClick: false,
					showConfirmButton: false,
					willOpen: () => {
						Swal.showLoading(Swal.getDenyButton());
					},
				});

				this.userService.changeStatus(user).subscribe((response) => {
					if (response.error) {
						Swal.close();
						this.generalService.showError(response.error.message);
						return;
					}

					this.userService.isLoading = false;
					this.getAllUsers();
					Swal.close();
					this.generalService.showSnackBar('Status cambiado');
				});
			}
		});
	}

	// deletePet(id: number) {
	// 	this.userService.delete(id).subscribe((response) => {
	// 		this.userService.isLoading = false;
	// 		this.getAllUsers();
	// 	});
	// }
}
