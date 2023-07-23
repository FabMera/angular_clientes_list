import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
//Observable es una clase que permite trabajar con los datos de forma asincrona
//es decir, que no se espera a que se carguen los datos para mostrarlos
@Injectable()
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/clientes/';

  constructor(private http: HttpClient) {}
  
  getClientes(): Observable<Cliente[]> {
    /* return of(CLIENTES); */
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }
}
