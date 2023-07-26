import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

//Observable es una clase que permite trabajar con los datos de forma asincrona
//es decir, que no se espera a que se carguen los datos para mostrarlos
@Injectable()
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/clientes/listar';
  private urlEndPointPost: string = 'http://localhost:8080/clientes/crear';
  private urlEndPointPut: string = 'http://localhost:8080/clientes/update';
  private urlEndPointDelete: string = 'http://localhost:8080/clientes';

  //Cabeceras para el metodo post y put
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private http: HttpClient, private router: Router) { }

  //Metodo que retorna un observable de tipo Cliente y muestra los datos de forma asincrona
  getClientes(): Observable<Cliente[]> {
    /* return of(CLIENTES); */
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }

  //Metodo para crear un cliente
  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPointPost, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.message);
        Swal.fire('Error al crear', e.error.message, 'error');
        return of(null);
      })
    );
  }

  //Metodo para obtener un cliente por id
  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.message);
        Swal.fire('Error al editar', e.error.message, 'error');
        return of(null);
      })
    );
  }
  //Metodo para actualizar un cliente
  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPointPut}/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.message);
        Swal.fire('Error al actualizar', e.error.message, 'error');
        return of(null);
      })
    );
  }
  //Metodo para eliminar un cliente
  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPointDelete}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.message);
        Swal.fire('Error al eliminar', e.error.message, 'error');
        return of(null);
      }
      )
    );
  }
}