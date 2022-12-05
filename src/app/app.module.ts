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
		...materialModules,
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
