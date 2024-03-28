import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { HeroComponent } from './pages/hero/hero.component';
import { HeroDetailComponent } from './pages/hero-detail/hero-detail.component';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { HeaderComponent } from './pages/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroService } from './services/hero/hero.service';
import { FormLoaderComponent } from './pages/form-loader/form-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeroComponent,
    HeroDetailComponent,
    HeaderComponent,
    FormLoaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ToastModule,
    AvatarModule,
    HttpClientModule,
    FormsModule,
    InMemoryWebApiModule, 
    AvatarGroupModule
  ],
  providers: [ HttpClientModule, HeroService  ],
  bootstrap: [AppComponent],
})
export class AppModule { }