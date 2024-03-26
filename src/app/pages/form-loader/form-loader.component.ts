import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-loader',
  standalone: true,
  imports: [],
  templateUrl: './form-loader.component.html',
  styleUrl: './form-loader.component.css'
})
export class FormLoaderComponent implements OnInit {
  //private database: Database = inject(Database);

  @Input() text: string = 'Cargando... por favor espere...';
  @Input() greater = false;
  constructor() {}

  ngOnInit(): void {
    //firebase.child('massive-charge')
  }

}
