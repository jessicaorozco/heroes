import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TabMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  items: MenuItem[] = [];
  activeItem: MenuItem = this.items[0] ;

  ngOnInit() {
   this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink: ['home']
      },
      {
        label: 'Súper Hero',
        badge: '2',
        badgeSeverity: 'info',
        icon: 'pi pi-fw pi-ticket',
        routerLink: ['api/hero'] 
      }

    ];
    // this.activeItem = this.items[0]
  }
}
