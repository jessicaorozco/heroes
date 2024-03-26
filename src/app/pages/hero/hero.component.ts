import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';
import { Router } from "@angular/router";
import { HeroService } from '../../services/hero/hero.service';
import { MessagesModule } from 'primeng/messages';
import { environment } from '../../../envoronments/environments';
import { Hero } from '../../entity/hero/hero';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormLoaderComponent } from '../form-loader/form-loader.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule, TableModule, FormLoaderComponent,AvatarModule, ReactiveFormsModule, MessagesModule, AvatarGroupModule],
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
  heroes: any = [];
  showDataTable: boolean = false;
  loading: boolean = true;
  showNoRecordText: boolean = false;
  env = environment;
  messages: any;
  items: any;
  isSelected: string = '';
  heroSelected: Hero[] = [];
  visible=false;
  
  constructor( private router: Router,
    private heroService: HeroService
  ) {


  }

  ngOnInit() {
    this.getData();
  }

  public addRegistry() {
    this.router.navigate(['api/hero/save']);
  }


  public getData() {

    this.showDataTable = this.showNoRecordText = false;
    this.heroService.getListHero().subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          this.heroes = response;
          this.showDataTable = true;
        } else {
          this.showNoRecordText = true;
        }
        this.loading = false;
      },
      error: (e) => {
        this.heroes = [];
        this.showDataTable = false;
        this.showNoRecordText = true;
        console.error(e);
        this.loading = false;
      }
    });
  }

  public editData(id: number) {
    try {
      this.router.navigate(['api/hero/', id])
    } catch (e) {
      console.error(e);
    }

  }
  public deleteModalData() {
    try {
      // this.messages.push({severity:"warn", summary:"", detail:"Está seguro que desea Eliminar?"})
      this.messages = [{ severity: 'warn', summary: 'hero(s)', detail: 'Está seguro que desea Eliminar?', confirm: this.deleteData() }];
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

  public deleteData() {
    console.log(this.heroSelected);
    this.heroSelected.forEach((obj) => {
      if (obj.id != undefined) {
        this.isSelected += obj.id + ',';
      }
    })
    this.isSelected = this.isSelected.slice(0, -1);
    console.log(this.isSelected);
    this.heroService.remove(this.isSelected).subscribe(response => {
      this.messages = [{ severity: 'sucess', summary: 'Hero(s)', detail: 'Eliminado correctamente' }];
      this.getData();
    })

  }
  public getEventValue($event: any): string {
    return $event.target.value;
  }

  onReject() {
    this.messages.clear();
    this.messages = [{ severity: 'error', summary: 'Operación cancelada', detail: 'El usuario ha rechazado la confirmación' }];

  }
   

}
