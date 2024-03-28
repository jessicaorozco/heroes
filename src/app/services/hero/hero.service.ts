import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { environment } from '../../../envoronments/environments';
import { Router } from '@angular/router';
import { Hero } from '../../entity/hero/hero';

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
    this.heroes = [
      { id: 1, name: 'Superman', power: 'Superfuerza' },
      { id: 2, name: 'Batman', power: 'Inteligencia' },
      { id: 3, name: 'Wonder Woman', power: 'Lazo de la verdad' },
      { id: 4, name: 'Spiderman', power: 'Sentido arácnido' },
      { id: 5, name: 'Iron Man', power: 'Tecnología' }
    ];
  }

  getHeroes() {
    return this.heroes;
  }

  create(hero: Hero) {
    localStorage.setItem('heroes', JSON.stringify(hero))
  }

  update(id: number): void {
      const elemento = this.heroes.find(item => item.id === id);
      if (!elemento) {
      console.error(`Elemento con ID ${id} no encontrado`);
      return;
    }
  }


  getData(): any[] {
    return this.heroes;
  }

  getById(id: number): Hero | undefined {
    return this.heroes.find(hero => hero.id === id) as Hero;
  }

  delete(id: string | number) {
    const indice = this.heroes.findIndex(t => t.id === id);
    if (indice !== -1) {
      this.heroes.splice(indice, 1);
    }
  }



}