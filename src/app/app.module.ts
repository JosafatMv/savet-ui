import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { materialModules } from './types/material-modules';
import { AppRouterModule } from './routers/app-router.module';
import { AuthModule } from './modules/auth/auth.module';

@NgModule({
	declarations: [AppComponent, NavigationComponent],
	imports: [
		AppRouterModule,
		BrowserModule,
		BrowserAnimationsModule,
		LayoutModule,
		HttpClientModule,
		AuthModule,
		...materialModules,
	],
	providers: [],
	exports: [AppComponent, NavigationComponent],
	bootstrap: [AppComponent],
})
export class AppModule {}
