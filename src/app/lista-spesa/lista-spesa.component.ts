import { Component, Input, OnInit } from '@angular/core';
import { Ingrediente } from '../ingrediente/ingrediente';
import { RicetteService } from '../mie-ricette/ricette.service';
import { UserRegister } from '../user/userRegister';
import { ListaSpesa } from './lista-spesa';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListaDellaSpesaService } from './lista-della-spesa.service';

@Component({
  selector: 'app-lista-spesa',
  templateUrl: './lista-spesa.component.html',
  styleUrl: './lista-spesa.component.css'
})
export class ListaSpesaComponent implements OnInit{
  @Input() ingredienti: Array<Ingrediente>;
  statusMessage: string;
  isLoaded: boolean = true;
  listaSpesa:ListaSpesa;

  constructor(public service:ListaDellaSpesaService, public snackBar: MatSnackBar) {
    this.listaSpesa =  this.listaSpesa = new ListaSpesa(0, new Array<Ingrediente>(), new UserRegister("", "", "", ""));
  }


ngOnInit(): void {
  this.service.search(this.listaSpesa).subscribe((data: any) => {
      if(data != null) {
      this.listaSpesa=data;
      this.statusMessage = 'Lista della spesa';
      this.openSnackBar(this.statusMessage, "Success");
      } else {
        this.statusMessage = 'Nessuna lista spesa';
        this.openSnackBar(this.statusMessage, "Info");
      }
  });
}
  //snackBar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
        duration: 3000,
    });
}
ordina() {
  this.service.ordina(this.listaSpesa.id).subscribe({
    next:((data: any) => {
      debugger;
      this.listaSpesa=data;
      this.statusMessage = data.message;
      this.openSnackBar(this.statusMessage, "Success");
    }),
    error : (err:any) => {
      this.openSnackBar(err, "Error");
    }
  });
}
}
