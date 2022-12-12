import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainClientComponent } from './pages/main-client/main-client.component';
import { RouterModule } from '@angular/router';
import { ClientRoutingModule } from './client-routing.module';
import { materialModules } from 'src/app/types/material-modules';

@NgModule({
	declarations: [MainClientComponent],
	imports: [
		CommonModule,
		RouterModule,
		ClientRoutingModule,
		...materialModules,
	],
})
export class ClientModule {}
