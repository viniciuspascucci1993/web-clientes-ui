import { Component, OnInit } from '@angular/core';

import { Cliente } from '../cliente';
import { ClienteService } from '../../cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  cliente: Cliente;

  constructor( private service: ClienteService ) { 
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service
      .insert(this.cliente)
      .subscribe(response => {
        console.log(response);
      });
  }

}
