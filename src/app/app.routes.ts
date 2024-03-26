import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeroComponent } from './pages/hero/hero.component';
import { HeroDetailComponent } from './pages/hero-detail/hero-detail.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'herp', component: HeroComponent },
  { path: 'hero/:id', component: HeroDetailComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Handle 404 errors
];

