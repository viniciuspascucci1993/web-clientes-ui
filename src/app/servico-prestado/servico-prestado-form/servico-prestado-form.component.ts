import { Component, OnInit } from '@angular/core';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ClienteService } from '../../cliente.service';
import { Cliente } from '../../cliente/cliente';
import { ServicoPrestado } from '../servicePrestado';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente [] = []
  servicoPrestado: ServicoPrestado;
  msgSucces: boolean = false;
  errors: String[];

  constructor(
      private clienteService: ClienteService,
      private servicePrestado: ServicoPrestadoService) { 
        this.servicoPrestado = new ServicoPrestado();
       }

  ngOnInit(): void {
    this.clienteService
      .findAll()
        .subscribe( response => this.clientes = response );
  }

  onSubmit() {
    this.servicePrestado
      .insert(this.servicoPrestado)
      .subscribe(response => {
        this.msgSucces = true;
        this.errors = null;
        this.servicoPrestado = new ServicoPrestado();
      } , errorResponse => {
        this.msgSucces = false;
        this.errors = errorResponse.error.errors;
      }
      )
  }

}
