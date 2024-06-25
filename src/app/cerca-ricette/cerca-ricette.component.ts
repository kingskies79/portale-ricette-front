import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { RicetteService } from '../mie-ricette/ricette.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Ricette } from '../ricette/ricette';
import { User } from '../user/user';
import { Ingrediente } from '../ingrediente/ingrediente';
import { ListaSpesa } from '../lista-spesa/lista-spesa';
import { UserRegister } from '../user/userRegister';
import { ListaDellaSpesaService } from '../lista-spesa/lista-della-spesa.service';
import { UserService } from '../user/user.service';


@Component({
  selector: 'app-cerca-ricette',
  templateUrl: './cerca-ricette.component.html',
  styleUrl: './cerca-ricette.component.css'
})
export class CercaRicetteComponent {
  @ViewChild(MatPaginator,  {static: true}) paginator: MatPaginator;
  @Input()value: number = 120;
  @ViewChild(MatSort,  {static: true}) sort: MatSort;


  ricette: Array<Ricette>;
  ricettePubbliche: Array<Ricette>;
  ricetteFilter:Array<Ricette>;
  statusMessage: string;
  isLoaded: boolean = true;
  displayedColumnsRicette: string[] = [ 'nome', 'descrizione', 'durata', 'ingredienti'];
  dataSourceRicette: any;
  ricetta : Ricette;
  mieRicette:boolean = true;
  otherRicette:boolean = true;
  search : String ="";
  ricettaCompEnabled:boolean = false;
  ricettaSelected: Ricette;
  listaSpesa: ListaSpesa;
  ingredienti: string[] = [];
  ingredientiFilter = new Map<string, boolean>();

  constructor(private listaSpesaService: ListaDellaSpesaService, private ricettaService:RicetteService, private userService: UserService, private snackBar: MatSnackBar) {
      this.ricette = new Array<Ricette>();
      this.ricettePubbliche = new Array<Ricette>();
      this.ricetteFilter =  new Array<Ricette>();
      this.listaSpesa = new ListaSpesa(0 , new Array<Ingrediente>(), new UserRegister("", "", "", ""));
      this.applyAtDataSource(this.ricettePubbliche.slice(0));
  }
  showRicetta(ricetta:Ricette) {
    debugger;
    this.ricettaSelected = ricetta;
    this.ricettaCompEnabled=true
  }

  formatLabel(value: number): string {
    return `${value}` + 'min';
  }

  ngOnInit() {
    debugger;
    this.applyAtDataSource(this.ricettePubbliche.slice(0));
    this.loadRicette();
  }

  applyFilter(filterValue: any) {
      this.dataSourceRicette.filter = (filterValue as HTMLInputElement).value.trim().toLowerCase();
      if (this.dataSourceRicette.paginator) {
          this.dataSourceRicette.paginator.firstPage();
      }
  }

  setupFilter(column: any) {
    this.dataSourceRicette.filterPredicate = (d: any, filter: string) => {
      const textToSearch = d[column] && d[column].toLowerCase() || '';
      return textToSearch.indexOf(filter) !== -1;
    };
  }

  onSliderChange() {
    this.ricetteFilter = this.ricettePubbliche;
    const a:any = localStorage.getItem("user");
    const t:User =JSON.parse(a);

    if(!this.mieRicette || !this.otherRicette) {
    if(this.mieRicette ) {
      const filter:any = this.ricetteFilter.filter(ricette =>  ricette.user.email === t.email);
      this.ricetteFilter = filter;
    }
     if(this.otherRicette) {
      debugger;
      const filter:any =this.ricetteFilter.filter(ricette =>  ricette.user.email !== t.email);
      this.ricetteFilter = filter;
    }
    }
    if(this.ingredientiFilter.size !== 0){
      for(let entry of this.ingredientiFilter.entries()){
        if(entry[1]){
          const filter:any = this.ricetteFilter.filter(ricetta => {return ricetta.ingredienti.some(ingrediente => ingrediente.ingrediente === entry[0] )});
          this.ricetteFilter = filter;
        }
      }
    }
    const filter:any = this.ricetteFilter.filter(ricetta => ricetta.durata <= this.value)
    this.ricetteFilter = filter;
    this.applyAtDataSource(this.ricetteFilter);
  }

  private loadRicette() {
    this.isLoaded = true;
    this.ricettePubbliche = [];
    this.ricettaService.searchAll().subscribe({
      next:((data: any) => {
        debugger;
        this.ricette = data;
        this.ricette.forEach(ricetta => {
          if(ricetta.pubblica || ricetta.user.email === this.userService.getMyuser().email) {
              this.ricettePubbliche.push(ricetta);
          }
        })
        this.ricette.sort(function (obj1, obj2) {
          return obj2.id - obj1.id;
        });
        this.isLoaded = false;
        this.applyAtDataSource(this.ricettePubbliche);
        this.dataSourceRicette.sort = this.sort;
        this.dataSourceRicette.paginator = this.paginator;
        this.ricettePubbliche.forEach(ricetta => ricetta.ingredienti.map(ingrediente => this.ingredienti.push(ingrediente.ingrediente)))
      }),
      error : (err:any) => {
        if(parseInt(err.status) == 403) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
        this.openSnackBar(err.message, "Error");
        this.isLoaded = false;
      }
    });
  }

  //snackBar
  openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
          duration: 5000,
      });
  }

  onSelectionChanged(arg: MatCheckboxChange, obj:any) {
    this.ricetteFilter = this.ricettePubbliche;
    const userEmail:any = localStorage.getItem("user");
    const user:User =JSON.parse(userEmail);
    debugger;
    if(!this.mieRicette || !this.otherRicette) {
      if(this.mieRicette) {
        const filter:any = this.ricetteFilter.filter(ricette =>  ricette.user.email === user.email);
        debugger;
        this.ricetteFilter = filter;
        }
       if(this.otherRicette) {
        const filter:any =this.ricetteFilter.filter(ricette =>  ricette.user.email !== user.email);
        this.ricetteFilter = filter;
        }
    }
      if(this.value !==0) {
        const filter:any = this.ricetteFilter.filter(ricetta => ricetta.durata <= this.value)
        this.ricetteFilter = filter;
      }
      if(this.ingredientiFilter.size !== 0){
        for(let entry of this.ingredientiFilter.entries()){
          if(entry[1]){
            const filter:any = this.ricetteFilter.filter(ricetta => {return ricetta.ingredienti.some(ingrediente => ingrediente.ingrediente === entry[0] )});
            this.ricetteFilter = filter;
          }
        }
      }
      this.applyAtDataSource(this.ricetteFilter);
    }

  applyAtDataSource( data :Array<Ricette> ) {
    debugger;
    this.dataSourceRicette = new MatTableDataSource(data);
  }

  updateListaSpesa(event:any) {
    debugger;
    this.listaSpesa.ingredienti = event
    this.listaSpesaService.add(this.listaSpesa).subscribe({
      next: value => {
        this.statusMessage = 'Ingredienti aggiunti alla lista della spesa';
        this.openSnackBar(this.statusMessage, "Success");
        this.loadRicette();
      },
      error: err => {
        this.openSnackBar(err, "Error");
      }
    });
  }
  changeSelected(event:any, category:string) {
    this.ricetteFilter = this.ricettePubbliche;
    this.ingredientiFilter.set(category, false);
    if(event.selected) {
      this.ingredientiFilter.set(category, true);
      const filter:any = this.ricetteFilter.filter(ricetta => {return ricetta.ingredienti.some(ingrediente => ingrediente.ingrediente === category )});
      this.ricetteFilter = filter;
    }
    debugger;
  this.applyAtDataSource(this.ricetteFilter);
  }

}
