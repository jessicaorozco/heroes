import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from '../../../envoronments/environments';
import { Router } from '@angular/router';
import { Hero } from '../../entity/hero/hero';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  api = '';

  headers: HttpHeaders;
  

  constructor( private httpClient: HttpClient, private router: Router) {
    this.api = `${environment.apiUrl}/${environment.endPoints}`;
    this.headers = new HttpHeaders();
  }

  getListHero(): Observable<any> {
    return this.httpClient.get(`${this.api}/hero`);
  }
  getHeroById(id: number) : Observable<any>{
    return this.httpClient.get<any>(`${this.api}/hero/${id}`);
  }  
  create(model: Hero) : Observable<any>{
    return this.httpClient.post(`${this.api}/hero/save`, model);
  }

  update(id: string | number, model: Hero): Observable<any> {
    return this.httpClient.put(`${this.api}/hero/${id}`, model);
  }

  remove(id: string | number) : Observable<any>{
    return this.httpClient.delete(`${this.api}/hero/${id}`);
  }
  
}