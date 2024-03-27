import { Component, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Hero } from '../../entity/hero/hero';
import { environment } from '../../../envoronments/environments';
import { ActivatedRoute, Router } from '@angular/router';
// import { AppComponent } from '../../../app.component';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';

import { HeroService } from '../../services/hero/hero.service';
import { FormLoaderComponent } from '../form-loader/form-loader.component';


@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [CommonModule, InputTextareaModule, FormLoaderComponent, MessagesModule, ReactiveFormsModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent implements OnInit{
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    power: new FormControl(''),

  });
  
  hero: Hero;
  messages: any;
  @Input() id: any;
  @Input() heroes: any;
  @Input() visible: boolean = true;
  
  submitted: boolean;
  env = environment;
  isHide: boolean = false;
  isShow: boolean = true;
  olderOrderBy: number;
  filteredHeroes: Hero[] = []; // Lista de héroes filtrados
  selectedColumns: String[] = []; // Columnas seleccionadas para el filtro
  newHero: Hero = {} as Hero; // Objeto vacío para un nuevo héroe
  selectedHero: Hero | undefined; // Héroe seleccionado para editar/eliminar

  // heroes: Hero[] = [{ id: 1, name: "SUperman", power: "vision" },
  // { id: 1, name: "Batman", power: "vision" },
  // { id: 1, name: "Wonder Woman", power: "vision" }
  // ];
  constructor(private route: ActivatedRoute, private router: Router,
    private fb: FormBuilder, private service: HeroService) {
    this.submitted = false;
    this.olderOrderBy = 0;
    this.hero = {
      id: 0,
      name: '',
      power: " "
    };

  }

  ngOnInit() {
    this.getByid(this.id);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  create(hero: Hero) {
    // Call the create service method with a copy of the newHero object
    this.service.create(hero);
    // this.getByid(hero.id); // Refresh the hero list after creation
    hero = {} as Hero; // Reset the newHero object for a new entry
    this.returnToList()
  }

  selectHero(hero: Hero) {
    this.hero = hero; // Assign the selected hero
  }

  updateHero() {
    if (this.hero) {
      // Call the update service method with a copy of the selectedHero object
      this.service.update({ ...this.hero });
      this.returnToList()
      // this.getByid(this.id); // Refresh the hero list after update
      // hero = undefined; // Deselect the hero after update
    }
  }

  getByid(id: number) {
    console.log(this.id)
    const hero = this.service.getByid(id);
    this.form.patchValue(hero);
    
  }

  // public addRegistry() {
  //   try {
  //     this.router.navigate(['api/heroes']);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  public saveRegistry() {
    try {
      this.submitted = true;
      if (this.form.invalid) {
        return;
      }
      if (this.id > 0) {
         this.updateHero();
      } else {
        this.create(this.form.value);
      }

    } catch (e) {
      console.error(e);
    }
  }


  public returnToList() {
    try {
      this.router.navigate(['api/heroes']);
    } catch (e) {
      console.error(e);
    }
  }

  

  // public updateData() {
  //   try {
  //     // const hero: Hero = this.form.value;
  //     // this.service.updateHero(this.hero).subscribe(response => {
  //     //   this.messages = [{ severity: 'sucess', summary: 'hero(s)', detail: 'Actualización exitosa' }];
  //     //   console.log(response)
  //     // })

  //   } catch (e) {
  //     console.error(e);
  //   }
  // }


  resetForm() {
    this.submitted = false;
    this.form.reset();
  }


}
