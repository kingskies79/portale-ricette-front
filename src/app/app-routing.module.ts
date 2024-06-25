import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './register/register.component';
import { MieRicetteComponent } from './mie-ricette/mie-ricette.component';
import { CercaRicetteComponent } from './cerca-ricette/cerca-ricette.component';
import { ListaSpesaComponent } from './lista-spesa/lista-spesa.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path : 'home',
    component : HomeComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : '',
    redirectTo : 'home',
    pathMatch : 'full'
  } ,
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path : 'dashboard',
    component : DashboardComponent,
    canActivate: [AuthGuard]

  },
  {
    path : 'ricette',
    component : MieRicetteComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'cerca_ricette',
    component : CercaRicetteComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'lista_spesa',
    component : ListaSpesaComponent,
    canActivate: [AuthGuard]
  },
  {
    path : '**',
    component : LoginComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
