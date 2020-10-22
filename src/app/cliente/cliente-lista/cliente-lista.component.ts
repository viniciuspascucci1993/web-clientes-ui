import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/cliente.service';
import { Cliente } from '../cliente';

import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {

  clienteList: Cliente[] = [];
  clienteSelecionado: Cliente;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor( 
      private service: ClienteService, 
      private router: Router ) { }

  ngOnInit(): void {
    this.service.
      findAll()
      .subscribe( response => this.clienteList = response );
  }

  insertNew() {
    this.router.navigate(['/cliente-form'])
  }

  readyToDeleting(cliente: Cliente) {
    this.clienteSelecionado = cliente;
  }

  delete() {
    this.service.delete(this.clienteSelecionado)
      .subscribe( 
        response => { 
            this.mensagemSucesso = 'Cliente deletado com sucesso!',
            this.ngOnInit();
        },

       erro => this.mensagemErro = 'Ocorreu um erro ao deletar o cliente.'
      )
  }
}
