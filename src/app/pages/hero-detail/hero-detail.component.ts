import { Component, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Hero } from '../../entity/hero/hero';
import { environment } from '../../../envoronments/environments';
import { ActivatedRoute, Router } from '@angular/router';
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
  @Input() visible: boolean = true;
  id: string ='';
  submitted: boolean;
  env = environment;
  isHide: boolean = false;
  isShow: boolean = true;
  olderOrderBy: number;
  filteredHeroes: Hero[] = []; 
  selectedColumns: String[] = []; 
  newHero: Hero = {} as Hero; 
  selectedHero: Hero | undefined; 
  constructor(private route: ActivatedRoute, private router: Router,
    private fb: FormBuilder, private service: HeroService) {
    this.submitted = false;
    this.olderOrderBy = 0;
    this.hero = {
      id: '',
      name: '',
      power: " "
    };

  }

  ngOnInit() {
    if (this.route.snapshot.params['id'] !== undefined) {
      this.id = String(localStorage.getItem('id'));
      localStorage.getItem('heroes');
      this.getByid(this.id);
    }
     
  
  }
  onSubmit(): void {
    console.log(this.form.value);
    this.saveRegistry();
  }


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  create() {
    this.service.create(this.form.value)
    this.returnToList();
  }

  selectHero(hero: Hero) {
    this.hero = hero; 
  }

  updateHero() {
    console.log(this.id, this.form.value)
    this.service.update(this.id, this.form.value);
    this.returnToList()      
  }

  getByid(id: string) {
    const hero = this.service.getById(id);
        this.form.patchValue(hero);
    
  }

  public saveRegistry() {
    try {
      this.submitted = true;
      if (this.form.invalid) {
        return;
      }
      (this.id.length > 0) ? this.updateHero() : this.create(); 
      
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

  

  resetForm() {
    this.submitted = false;
    this.form.reset();
    localStorage.clear();
  }


}
