
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HeroService } from './services/hero/hero.service';
// import { HttpClientHeroService } from './services/http-client-hero.service';

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [HeroService],
 
})
export class AppRoutingModule { }
