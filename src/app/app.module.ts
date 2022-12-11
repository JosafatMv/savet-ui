import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { materialModules } from './types/material-modules';
import { AppRouterModule } from './routers/app-router.module';
import { AuthModule } from './modules/auth/auth.module';
import { PetModule } from './modules/pet/pet.module';
import { MainComponent } from './modules/auth/pages/main/main.component';
import { CustomHttpInterceptorService } from './services/http-interceptor.service';
import { UserModule } from './modules/user/user.module';
import { ServiceModule } from './modules/service/service.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { MedicineModule } from './modules/medicine/medicine.module';
import { ConsultationModule } from './modules/consultation/consultation.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
	declarations: [AppComponent, NavigationComponent, MainComponent],
	imports: [
		AppRouterModule,
		BrowserModule,
		BrowserAnimationsModule,
		LayoutModule,
		HttpClientModule,
		AuthModule,
		PetModule,
		UserModule,
		ServiceModule,
		CategoryModule,
		ProductModule,
		MedicineModule,
		ConsultationModule,
		...materialModules,
		NgMultiSelectDropDownModule.forRoot(),
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: CustomHttpInterceptorService,
			multi: true,
		},
	],
	exports: [AppComponent, NavigationComponent],
	bootstrap: [AppComponent],
})
export class AppModule {}
