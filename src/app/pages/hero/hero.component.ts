import { Component, Input, OnInit, Output,ViewChild, Injectable, EventEmitter } from '@angular/core';
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
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule,InputTextModule ,  ProgressSpinnerModule, ToastModule, TableModule, FormLoaderComponent, AvatarModule, ReactiveFormsModule, MessagesModule, AvatarGroupModule],
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
  id:number=0;
  items: any;
  isSelected: string = '';
  heroSelected: Hero[] = [];
  @Output() onSave = new EventEmitter<any>();
  @Output() onConfirm = new EventEmitter<any>();
  constructor(private router:Router, private heroService: HeroService) { }

  ngOnInit() {
    this.getData();
  }

  public getData() {
    this.heroes = this.heroService.heroes;
    this.filteredHeroes = this.heroes;  
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

  public deleteData() {
    if(confirm()){
      this.heroSelected.forEach((obj) => {
        if (obj.id != undefined) {
          this.isSelected += obj.id+ ',';
        }        
      })
     }
     this.isSelected = this.isSelected.slice(0,-1);
     console.log(this.isSelected);
     this.delete();
   }

    
  public editData(id: number) {
    try {
      this.onSave.emit(this.heroes);
      this.onConfirm.emit(this.id);
      this.router.navigate(['api/hero/', id])
    } catch (e) {
      console.error(e);
    }

  }
  returnToList(){
    this.messages()
  }

  delete() {
    this.loading=true;
    this.heroSelected.forEach(element => {
      this.heroService.delete(element.id);
    });
    this.loading=false;
    this.getData();
  }

  public addRegistry() {
    this.router.navigate(['api/hero/']);
  }
  public getEventValue($event: any): string {
    return $event.target.value;
  }


}
