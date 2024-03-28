import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../envoronments/environments';
import { Hero } from '../../entity/hero/hero';
import { uuid } from 'uuid'; // Importa uuid
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

  getHeroes(): Hero[] {
    const heroesFromStorage = localStorage.getItem('heroes');
    return JSON.parse(heroesFromStorage || '[]') as Hero[];
  }

  create(hero: Hero) {
    let heroes : Hero[] = [];
    if (!hero.id) {
      hero.id = heroes.length + 1;
    }
    // hero.id = this.heroes.length + 1;
    heroes.push(hero);    
    localStorage.setItem('heroes', JSON.stringify(heroes));
    this.heroes.push(hero);
    
  }

  update(id: number, datosActualizados: Hero): void {
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

  getById(id: number): Hero{
    return this.heroes.find(hero => hero.id === id) as Hero;
  }

  delete(id: string | number) {
    const indice = this.heroes.findIndex(t => t.id === id);
    if (indice !== -1) {
      this.heroes.splice(indice, 1);
    }
  }



}