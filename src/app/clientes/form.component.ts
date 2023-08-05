import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

    public cliente: Cliente = new Cliente();
    public titulo: string = "Crear Cliente";
    public errores: string[];

    constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }
    ngOnInit() {
        this.cargarCliente();
    }

    cargarCliente(): void {
        this.activatedRoute.paramMap.subscribe(params => {
            let id = +params.get('id')
            if (id) {
                this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
            }
        })
    }
    create(): void {
        this.clienteService.create(this.cliente).subscribe(response => this.router.navigate(['/clientes']))
        Swal.fire('Nuevo Cliente', `Cliente ${this.cliente.nombre} creado con éxito!`, 'success')
    }
    update(): void {
        this.clienteService.update(this.cliente).subscribe(
            cliente => this.router.navigate(['/clientes'])
        )
        Swal.fire('Cliente Actualizado', `Cliente ${this.cliente.nombre} actualizado con éxito!`, 'success');
    }
}