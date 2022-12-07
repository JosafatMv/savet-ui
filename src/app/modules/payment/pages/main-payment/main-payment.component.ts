import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Payment } from '../../types/payment';
import { GeneralService } from '../../../../services/general.service';
import { PaymentService } from '../../services/payment.service';
import { Sort, MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-main-payment',
  templateUrl: './main-payment.component.html'
})
export class MainPaymentComponent implements OnInit {
  displayedColumns: string[] = [
    '#',
    'date',
    'consultation',
    'amount',
    'paymentMethod',
	];

  payment!: MatTableDataSource<Payment>;
  private _liveAnnouncer: any;

  get isLoading() {
		return this.paymentService.isLoading;
	}

  getAllPayment(){
    this.paymentService.findAll().subscribe((response: any)=>{
      this.paymentService.isLoading = false;
      this.payment = new MatTableDataSource(response);
      this.payment.paginator = this.paginator;
      this.payment.sort = this.sort;
    });
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

  constructor(
		private paymentService: PaymentService,
		private generalService: GeneralService,
		public dialog: MatDialog
	) {
		// this.getPersonal();
		// this.pets = new MatTableDataSource<Pet>(this.petService.getPets);
	}

  ngOnInit(): void {
      this.getAllPayment();
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
}
