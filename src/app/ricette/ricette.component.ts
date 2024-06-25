import { Component, EventEmitter, Injector, Input, OnChanges, Output, ViewChild, afterNextRender, inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Ricette } from './ricette';
import { RicetteService } from '../mie-ricette/ricette.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { elementAt } from 'rxjs';
import { Ingrediente } from '../ingrediente/ingrediente';


@Component({
  selector: 'app-ricette',
  templateUrl: './ricette.component.html',
  styleUrl: './ricette.component.css'
})
export class RicetteComponent implements OnChanges{

  @Input() ricetta: Ricette;
  @Input() readOnly: boolean;
  private _injector = inject(Injector);
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @Output() updateStatus = new EventEmitter<boolean>();
  @Output() updateListaSpesa = new EventEmitter<Array<Ingrediente>>();
  statusMessage: string;
  isLoaded: boolean = true;
  ingredienti: string;
  ingredientiList: Array<Ingrediente>;
  listaSpesa:Array<Ingrediente>
  constructor(public service:RicetteService, public snackBar: MatSnackBar) {
    this.ingredientiList = new Array<Ingrediente>();
    this.listaSpesa = new Array<Ingrediente>();
  }


  triggerResize() {
    // Wait for content to render, then trigger textarea resize.
    afterNextRender(
      () => {
        this.autosize.resizeToFitContent(true);
      },
      {
        injector: this._injector,
      },
    );
  }

  ngOnChanges() {
    this.refresh();
    }

  ngOnInit(): void {
   this.refresh();
  }

  refresh() {
    this.ingredienti= this.ricetta.ingredienti.map(element => element.ingrediente).join();

  }

  onSubmit() {
    const ing = this.ingredienti.split(",");
    this.ricetta.ingredienti = [];
    ing.forEach(ing => this.ricetta.ingredienti.push(new Ingrediente(ing)))
   this.service.update(this.ricetta).subscribe({
    next: value => {
        console.log(this.ricetta);
        this.updateStatus.emit(false);
        this.statusMessage = 'Ricetta ' + this.ricetta.nome + ' is updated';
        this.openSnackBar(this.statusMessage, "Success");

      },
    error: err => {
      this.openSnackBar(err, "Error");
    }
  });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
        duration: 3000,
    });
}

addListaSpesa(ingredienti:string) {
  this.listaSpesa = ingredienti.split(",").map(element => new Ingrediente(element));
  this.updateListaSpesa.emit(this.listaSpesa);
}

}
