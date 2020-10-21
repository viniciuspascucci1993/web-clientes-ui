import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Cliente } from './cliente/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor( private http: HttpClient ) {
    

   }

   insert( cliente: Cliente ) : Observable<Cliente> {
    return this.http.post<Cliente>('http://localhost:8080/api/clientes', cliente)
   }

  getClient() : Cliente {
    let cliente : Cliente = new Cliente();

    cliente.nome = "Vinicius";
    cliente.cpf = "445.225.554-78";
    return cliente;
  }
}
