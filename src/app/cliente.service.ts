import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Cliente } from './cliente/cliente';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiURL: string = environment.API_URL_BASE + '/api/clientes';

  constructor( private http: HttpClient ) { }

   insert( cliente: Cliente ) : Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiURL}`, cliente)
   }

   
   findAll() : Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiURL);
   }

   findById(id: number): Observable<Cliente> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
   }

   update( cliente: Cliente ) : Observable<any> {
    return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente)
   }

   delete( cliente: Cliente ) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${cliente.id}`)
   }
}
