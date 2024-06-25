import { Component, ViewChild } from '@angular/core';
import { RicetteService } from './ricette.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { Ricette } from '../ricette/ricette';
import { User } from '../user/user';
import { DialogOverviewDeleteComponent } from '../dialog-overview-delete/dialog-overview-delete.component';
import { Ingrediente } from '../ingrediente/ingrediente';


@Component({
  selector: 'app-mie-ricette',
  templateUrl: './mie-ricette.component.html',
  styleUrl: './mie-ricette.component.css'
})
export class MieRicetteComponent {
  @ViewChild(MatPaginator,  {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,  {static: true}) sort: MatSort;
  ricette: Array<Ricette>;
  showTable: boolean;
  statusMessage: string;
  isLoaded: boolean = true;
  displayedColumnsRicette: string[] = ['id', 'nome', 'descrizione', 'durata', 'ingredienti', 'Change', 'Delete', "Pubblica"];
  displayedColumnsAddRicetta: string[] = [ 'nome', 'descrizione', 'durata', 'ingredienti', 'Save', 'Cancel'];
  dataSourceRicette: any;
  dataSourceAddRicetta: any;
  ricetta : Ricette;
  disabled = false;
  checked = false;
  user: User;
  ingredientiList:Ingrediente[];
  nome = new FormControl('', [Validators.required]);
  descrizione = new FormControl('', [Validators.required]);
  durata = new FormControl('', [Validators.required]);
  ingredienti= new FormControl('', [Validators.required]);
  addNewRicetta: Ricette[] = [
    {id:0, nome: "", descrizione:"",  durata:0, numeroIngredienti:0 , pubblica:false,  ingredienti:new Array<Ingrediente>(), user:{firstName:"", lastName:"",email:"", password:""}}];

    isOn:boolean = false;
    ricettaData: Ricette;

  constructor(private serv: RicetteService, public dialog: MatDialog, public snackBar: MatSnackBar) {
      this.ricette = new Array<Ricette>();
      this.user = new User('');
      this.ingredientiList = new Array<Ingrediente>()
  }

  ngOnInit() {
      this.loadRicette();
      this.dataSourceAddRicetta = new MatTableDataSource();
  }

  applyFilter(filterValue: any) {
      this.dataSourceRicette.filter = (filterValue as HTMLInputElement).value.trim().toLowerCase();
      if (this.dataSourceRicette.paginator) {
          this.dataSourceRicette.paginator.firstPage();
      }
  }

  private loadRicette() {
    this.isLoaded = true;
    this.serv.search().subscribe({
      next:((data: any) => {
        this.ricette = data;
        this.ricette.sort(function (obj1, obj2) {
          // Descending: first id less than the previous
          return obj2.id - obj1.id;
        });
        this.isLoaded = false;
        this.dataSourceRicette = new MatTableDataSource(this.ricette);
        this.dataSourceAddRicetta = new MatTableDataSource(this.addNewRicetta);
        this.dataSourceRicette.sort = this.sort;
        this.dataSourceRicette.paginator = this.paginator;
      }),
      error : (err:any) => {
        this.showTable = false;
        this.openSnackBar(err.message, "Error");
        this.isLoaded = false;
      }
    });
  }

  delete(ricetta: Ricette) {
    this.serv.delete(ricetta.id).subscribe({
        next:((value:any) => {
          this.statusMessage = 'Ricetta ' + ricetta.nome + ' is deleted';
          this.openSnackBar(this.statusMessage, "Success");
          this.loadRicette();
        }),
        error: ((err:any) => {
          this.openSnackBar(err, "Error");
        })
      }
    )
  }

  edit(ricetta: Ricette) {
    this.ricettaData = ricetta;
    this.isOn = true;
  }
  getStatus(name:any) {
this.isOn = false;
  }

  save(ricetta: Ricette) {
      if (ricetta.nome != "" && ricetta.descrizione != "" && ricetta.durata != 0 && ricetta.ingredienti.length != 0) {
        this.ingredientiList = [];
        const i = String(ricetta.ingredienti).split(",");
          i.map(e => this.ingredientiList.push(new Ingrediente(e)));
        debugger;
        ricetta.ingredienti = this.ingredientiList;
          this.serv.save(ricetta).subscribe({
            next: value => {
              this.statusMessage = 'Ricetta ' + ricetta.nome + ' is added';
              this.showTable = false;
              this.openSnackBar(this.statusMessage, "Success");
              this.loadRicette();
            },
            error: err => {
              this.showTable = false;
              this.openSnackBar(err, "Error");
            }
          });
      }
      else {
          this.openSnackBar("Please enter correct data", "Error")
      }
  }
  show() {
      this.showTable = true;
      this.addNewRicetta = [{ id: 0, nome: "", descrizione: "", durata:0, numeroIngredienti: 0,  pubblica:false , ingredienti:new Array<Ingrediente>(),  user:{firstName:"", lastName:"",email:"", password:""} }];

  }
  cancel() {
      this.showTable = false;
  }

  //snackBar
  openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
          duration: 3000,
      });
  }

  openDialog(element :any): void {
    const dialogRef = this.dialog.open(DialogOverviewDeleteComponent, {
      width: '350px',
      data: element.nome
  });

    const dialogSubmitSubscription =
    dialogRef.componentInstance.submitClicked.subscribe(result => {
      if (result == "Confirm") {
        this.delete(element);
      }
      dialogSubmitSubscription.unsubscribe();
    });
  }
  //material dialog

  //Form field with error messages
  getErrorMessage() {
    return this.nome.hasError('required') ? 'You must enter a value' :
        this.nome.hasError('name') ? 'Not a valid name' : '';
  }

  onValChange(value: any, ricetta:Ricette){
    if(value.checked){
      ricetta.pubblica=value.checked;
      this.update(ricetta);
    } else {
      ricetta.pubblica=value.checked;
      this.update(ricetta);
    }

  }
  update(ricetta:Ricette) {
    this.serv.update(ricetta).subscribe({
      next: ((value:any) => {
        this.statusMessage = 'Ricetta ' + ricetta.nome + ' is updated';
        this.openSnackBar(this.statusMessage, "Success");
        this.loadRicette();
      }),
      error: ((err:any) => {
        this.openSnackBar(err, "Error");
      })
    })
  }

}



