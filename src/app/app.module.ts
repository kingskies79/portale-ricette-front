import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthGuard } from './auth/auth.guard';
import { HeaderComponent } from './header/header.component';
import { MieRicetteComponent } from './mie-ricette/mie-ricette.component';
import { CercaRicetteComponent } from './cerca-ricette/cerca-ricette.component';
import { ListaSpesaComponent } from './lista-spesa/lista-spesa.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';
import { BasicHeaderComponent } from './basic-header/basic-header.component';
import { DialogOverviewDeleteComponent } from './dialog-overview-delete/dialog-overview-delete.component';
import { RicetteComponent } from './ricette/ricette.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MieRicetteComponent,
    CercaRicetteComponent,
    ListaSpesaComponent,
    RegisterComponent,
    HomeComponent,
    BasicHeaderComponent,
    DashboardComponent,
    DialogOverviewDeleteComponent,
    RicetteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule
    ],
  exports: [
    BrowserModule,
    ],
  providers: [
    AuthGuard,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
