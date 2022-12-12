import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Payment } from '../../types/payment';
import { PaymentService } from '../../services/payment.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { GeneralService } from 'src/app/services/general.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MakePaymentComponent } from '../make-payment/make-payment.component';

@Component({
	selector: 'app-main-payment',
	templateUrl: './main-payment.component.html',
})
export class MainPaymentComponent implements OnInit {
	displayedColumns: string[] = [
		'#',
		'pet',
		'date',
		'amount',
		'status',
		'actions',
	];

	payments!: MatTableDataSource<Payment>;

	get isLoading() {
		return this.paymentService.isLoading;
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

	isAdmin() {
		return this.generalService.userInfo.role === 'admin';
	}

	hasPermission() {
		return this.generalService.userInfo.role === 'client';
	}

	getAllPayments() {
		this.paymentService.findAll().subscribe((response) => {
			if (response.error) {
				this.generalService.showError(response.error.message);
				return;
			}

			this.paymentService.isLoading = false;
			this.payments = new MatTableDataSource(response);
			this.payments.paginator = this.paginator;
			this.payments.sort = this.sort;
		});
	}

	getAllPaymentsByOwner(id: number) {
		this.paymentService.findAllOwnPayments(id).subscribe((response) => {
			if (response.error) {
				this.generalService.showError(response.error.message);
				return;
			}

			this.paymentService.isLoading = false;
			this.payments = new MatTableDataSource(response);
			this.payments.paginator = this.paginator;
			this.payments.sort = this.sort;
		});
	}

	constructor(
		private paymentService: PaymentService,
		private generalService: GeneralService,
		private _liveAnnouncer: LiveAnnouncer,
		public dialog: MatDialog
	) {}

	ngOnInit(): void {
		if (this.generalService.userInfo.role === 'client') {
			this.getAllPaymentsByOwner(this.generalService.userInfo.id);
		} else {
			this.getAllPayments();
		}
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
		const modalRef = this.dialog.open(MakePaymentComponent, {
			width: '60%',
			enterAnimationDuration,
			exitAnimationDuration,
			disableClose: true,
			maxHeight: '90vh',
		});
		modalRef.afterClosed().subscribe((result: any) => {
			this.paymentService.paymentUpdate = {
				id: 0,
				name: '',
				description: '',
				salary: 0.0,
			};
			this.paymentService.edit = false;

			if (this.generalService.userInfo.role === 'client') {
				this.getAllPaymentsByOwner(this.generalService.userInfo.id);
			} else {
				this.getAllPayments();
			}
		});
	}

	makePayment(payment: any) {
		this.paymentService.edit = true;
		this.paymentService.paymentUpdate = {
			...payment,
		};
		this.openDialog('2ms', '1ms');
	}
}
