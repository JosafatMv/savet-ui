import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../types/user';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { AddUserComponent } from '../add-user/add-user.component';

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
		this.userService.changeStatus(user).subscribe((response) => {
			this.userService.isLoading = false;
			this.getAllUsers();
		});
	}

	// deletePet(id: number) {
	// 	this.userService.delete(id).subscribe((response) => {
	// 		this.userService.isLoading = false;
	// 		this.getAllUsers();
	// 	});
	// }
}
