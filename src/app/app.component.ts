import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'Bienvenido a Angular';
  curso: string = 'Curso de Springboot y Angular';
  alumno: string = 'Fabian';
}
