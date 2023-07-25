import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//Observable es una clase que permite trabajar con los datos de forma asincrona
//es decir, que no se espera a que se carguen los datos para mostrarlos
@Injectable()
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/clientes/listar';
  private urdlEndPointPost: string = 'http://localhost:8080/clientes/crear';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private http: HttpClient) { }

  //Metodo que retorna un observable de tipo Cliente y muestra los datos de forma asincrona
  getClientes(): Observable<Cliente[]> {
    /* return of(CLIENTES); */
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }

  //Metodo para crear un cliente
  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urdlEndPointPost, cliente, { headers: this.httpHeaders });
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);

}
}