import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../envoronments/environments';
import { Hero } from '../../entity/hero/hero';
import * as uuid  from 'uuid'; 
@Injectable({
  providedIn: 'root'
})

export class HeroService {

  api = '';
  heroes: Hero[];
  headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.api = `${environment.apiUrl}:${environment.port}/${environment.endPoints}`;
    this.headers = new HttpHeaders();
    this.heroes = [];
    // this.heroes = [
    //   { id: 1, name: 'Superman', power: 'Superfuerza' },
    //   { id: 2, name: 'Batman', power: 'Inteligencia' },
    //   { id: 3, name: 'Wonder Woman', power: 'Lazo de la verdad' },
    //   { id: 4, name: 'Spiderman', power: 'Sentido arácnido' },
    //   { id: 5, name: 'Iron Man', power: 'Tecnología' }
    // ];
  }

  getHeroes(){
    console.log(localStorage.getItem('heroes'));
    this.heroes = localStorage.getItem('heroes')
  ? JSON.parse(localStorage.getItem('heroes')!) as Hero[]
  : [];
    return this.heroes;
  }

  create(hero: Hero) {
    let heroes : Hero[] = [];
    if (!hero.id) {
      hero.id = uuid.v4();
    }
    heroes.push(hero);    
    this.heroes.push(hero);
    localStorage.setItem('heroes', JSON.stringify(this.heroes));
    
  }

  update(id: string, datosActualizados: Hero): void {
      const elemento = this.heroes.find(item => item.id === id)  as Hero;
      if (!elemento) {
      console.error(`Elemento con ID ${elemento} no encontrado`);
      return;
    }
    elemento.name = datosActualizados.name;
    elemento.power = datosActualizados.power;
  
  }


  getData(): any[] {
    return this.heroes;
  }

  getById(id: string): Hero{
    return this.heroes.find(hero => hero.id === id) as Hero;
  }

  delete(id: string | number) {
    const indice = this.heroes.findIndex(t => t.id === id);
    if (indice !== -1) {
      this.heroes.splice(indice, 1);
    }
  }



}