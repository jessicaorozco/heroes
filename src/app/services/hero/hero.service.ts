import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
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
  
  constructor( private httpClient: HttpClient) {
    this.api = `${environment.apiUrl}:${environment.port}/${environment.endPoints}`;
    this.headers = new HttpHeaders();
    this.heroes = [
      { id: 1, name: 'Superman', power: 'Superfuerza' },
      { id: 2, name: 'Batman', power: 'Inteligencia' },
      { id: 3, name: 'Wonder Woman', power: 'Lazo de la verdad' },
      { id: 4, name: 'Spiderman', power: 'Sentido arácnido' },
      { id: 5, name: 'Iron Man', power: 'Tecnología' }
    ];
  }
  
  getHeroes(): Observable<any> {
    return  this.httpClient.get(`${this.api}/heroes`);
  }
  
  //   getListHero(): Observable<any> {
  //   return this.httpClient.get(`${this.api}/heroes`);
  // }
  // getHeroById(id: number) : Observable<any>{
  //   return this.httpClient.get<any>(`${this.api}/heroes/${id}`);
  // }  
  // create(model: Hero) : Observable<any>{
  //   return this.httpClient.post(`${this.api}/hero`, model);
  // }

  // update(id: string | number, model: Hero): Observable<any> {
  //   return this.httpClient.put(`${this.api}/hero/${id}`, model);
  // }

  // remove(id: string | number) : Observable<any>{
  //   return this.httpClient.delete(`${this.api}/hero/${id}`);
  // }
 
  
  create(hero: any) {
    hero.id = this.heroes.length + 1;
    this.heroes.push(hero);
}

update(hero: any) {
  const indice = this.heroes.findIndex(t => t.id === hero.id);
if (indice !== -1) {
  this.heroes[indice] = hero;
}
  hero.id = this.heroes.length + 1;
  this.heroes.push(hero);
}

getData(): any[] {
return this.heroes;
}

getById(hero: Hero) {
  const indice = this.heroes.findIndex(t => t.id === hero.id);
if (indice !== -1) {
  this.heroes[indice] = hero;
}
  return hero;
}

getByid(id: number): any | undefined {
return this.heroes.find(hero => hero.id === id);
}

delete(id: number) {
const indice = this.heroes.findIndex(t => t.id === id);

if (indice !== -1) {
  this.heroes.splice(indice, 1);
}



}





}