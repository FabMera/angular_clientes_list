import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';



@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
})
export class ClientesComponent {
    clientes: Cliente[];
    constructor(private clienteService: ClienteService,private activatedRoute : ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(params => {
            let page: number = +params.get('page');
            if (!page) {
                page = 0;
            }
            this.clienteService.getClientes(page).pipe(
                tap((response: any) => {
                    console.log('ClientesComponent: tap 3');
                    (response.content as Cliente[]).forEach(cliente => {
                        console.log(cliente.nombre);
                    });
                })
            ).subscribe(
                response => {
                    this.clientes = response.content as Cliente[];
                }
            );
        });
    }
    delete(cliente: Cliente): void {
        Swal.fire({
            title: 'Está seguro?',
            text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar!',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                this.clienteService.delete(cliente.id).subscribe(
                    response => {
                        this.clientes = this.clientes.filter(cli => cli !== cliente)
                        Swal.fire(
                            'Cliente Eliminado!',
                            `Cliente ${cliente.nombre} eliminado con éxito.`,
                            'success'
                        )
                    }
                )

            }
        }

        )
    }
}
