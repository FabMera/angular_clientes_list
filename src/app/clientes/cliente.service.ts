import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { Cliente } from './cliente';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

//Observable es una clase que permite trabajar con los datos de forma asincrona
//es decir, que no se espera a que se carguen los datos para mostrarlos
@Injectable()
export class ClienteService {

    private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  
    
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
    constructor(private http: HttpClient, private router: Router) { }

    //Metodo que retorna un observable de tipo Cliente y muestra los datos de forma asincrona
    getClientes(page: number): Observable<any> {
        return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
            tap((response: any) => {
                console.log('ClienteService: tap 1');
                (response.content as Cliente[]).forEach(cliente => {
                    console.log(cliente.nombre);
                });
            }),
            map((response: any) => {
                (response.content as Cliente[]).map(cliente => {
                    cliente.nombre = cliente.nombre.toUpperCase();
                    cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
                    return cliente;
                });
                return response;
            }
            ),
        )

    }

    //Metodo para crear un cliente
    create(cliente: Cliente): Observable<any> {
        return this.http.post<any>(this.urlEndPoint, cliente, { headers: this.httpHeaders }).pipe(
            catchError(e => {
                console.error(e.error.message);
                Swal.fire('Error al crear un cliente', e.error.message, 'error');
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
        return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
            catchError(e => {

                console.error(e.error.message);
                Swal.fire('Error al actualizar', e.error.message, 'error');
                return of(null);
            })
        );
    }
    //Metodo para eliminar un cliente
    delete(id: number): Observable<Cliente> {
        return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
            catchError(e => {
                console.error(e.error.message);
                Swal.fire('Error al eliminar', e.error.message, 'error');
                return of(null);
            }
            )
        );
    }
}