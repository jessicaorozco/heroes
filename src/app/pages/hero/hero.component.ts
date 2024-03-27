import { Component, Input, OnInit, ViewChild, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';
import { Router } from "@angular/router";
import { MessagesModule } from 'primeng/messages';
import { environment } from '../../../envoronments/environments';
import { Hero } from '../../entity/hero/hero';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormLoaderComponent } from '../form-loader/form-loader.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HeroService } from '../../services/hero/hero.service';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule, ToastModule, TableModule, FormLoaderComponent, AvatarModule, ReactiveFormsModule, MessagesModule, AvatarGroupModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  animations: [
    trigger('messageAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in', style({ opacity: 1 }))
      ]),

    ])
  ]
})
export class HeroComponent implements OnInit {
  heroes: Hero[] = []; // Lista de héroes
  filteredHeroes: Hero[] = []; // Lista de héroes filtrados
  selectedColumns: String[]= []; // Columnas seleccionadas para el filtro
  newHero: Hero = {} as Hero; // Objeto vacío para un nuevo héroe
  selectedHero: Hero | undefined; // Héroe seleccionado para editar/eliminar
showDataTable: boolean = false;
  loading: boolean = false;
  showNoRecordText: boolean = false;
  env = environment;
  messages: any;
  items: any;
  isSelected: string = '';
  heroSelected: Hero[] = [];
  constructor(private router:Router) { }

  ngOnInit() {
    // Llena la lista de héroes con datos
    this.heroes = [
      { id: 1, name: 'Superman', power: 'Superfuerza' },
      { id: 2, name: 'Batman', power: 'Inteligencia' },
      { id: 3, name: 'Wonder Woman', power: 'Lazo de la verdad' },
      { id: 4, name: 'Spiderman', power: 'Sentido arácnido' },
      { id: 5, name: 'Iron Man', power: 'Tecnología' }
    ];

    // Inicializa las variables
    this.filteredHeroes = this.heroes;
     // Selecciona todas las columnas por defecto
  }

  filter(event: any) {
    this.loading=true;
    const filterValue = event.target.value;
    this.filteredHeroes = this.heroes.filter(hero => {
      for (const key of this.selectedColumns) {
        this.loading=false;
        return true;      }
      return false;
    });
  }

  public deleteModalData() {
    try {
            // this.messages.push({severity:"warn", summary:"", detail:"Está seguro que desea Eliminar?"})
      this.messages = [{ severity: 'warn', summary: 'hero(s)', detail: 'Está seguro que desea Eliminar?' }];
      // this.app.openDeleteModal("hero(s)", () => this.deleteData());
      this.messages =[ {
        severity: 'warn', 
        summary: 'Información', detail: 'Está seguro que desea Eliminar?',
        key: 'confirm' 
      }];
    } catch (e) {
      console.error(e);
    }
  }


  create() {
    this.loading=true;
    
    this.newHero.id = this.heroes.length + 1;
    
    this.heroes.push(this.newHero);
    this.loading=false;
    
    this.filteredHeroes = this.heroes;

    
    this.newHero = {} as Hero;
  }

  selectHero(hero: Hero) {
    this.selectedHero = hero; // Asigna el héroe seleccionado
  }

  public editData(id: number) {
    try {
      this.router.navigate(['api/hero', id])
    } catch (e) {
      console.error(e);
    }

  }
  returnToList(){
    this.messages()
  }

  delete(id: number) {
    // Busca el índice del héroe a eliminar

    const indice = this.heroes.findIndex(t => t.id === id);

    if (indice !== -1) {
      // Elimina el héroe del array
      this.heroes.splice(indice, 1);

      // Actualiza la lista filtrada
      this.filteredHeroes = this.heroes;
    }
  }


  public addRegistry() {
    this.router.navigate(['api/hero/']);
  }
  public getEventValue($event: any): string {
    return $event.target.value;
  }


}
