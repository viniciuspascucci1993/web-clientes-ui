import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './login/usuario';

import { environment } from '../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  BASE_URL: string = environment.API_URL_BASE + "/api/usuarios";
  TOKEN_URL: string = environment.API_URL_BASE + "/oauth/token";
  CLIENT_ID: string = environment.CLIENT_ID;
  CLIENTE_SECRET: string = environment.CLIENT_SECRET;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor( private http: HttpClient ) { }

  getToken() {
    const tokenString = localStorage.getItem('access_token')
    if(tokenString) {
      const token = JSON.parse(tokenString).access_token
      return token;
    }
    return null;
  }

  finishSession() {
    localStorage.removeItem('access_token')
  }

  getUserAuthenticated() {
    const token = this.getToken();
    if(token) {
      const user = this.jwtHelper.decodeToken(token).user_name
      return user;
    }
    return null;
  }

  isAutheticated(): boolean { 
    const token = this.getToken();
    if(token) {
      const isExpired = this.jwtHelper.isTokenExpired(token);
      return !isExpired;
    }
    return false;
  }

  insert( usuario: Usuario ): Observable<any>  {
    return this.http.post<any>(this.BASE_URL, usuario);
  }

  getAuth( cpf: string, password: string): Observable<any> {
    const params = new HttpParams()
        .set('username', cpf)
        .set('password', password)
        .set('grant_type', 'password')

  const headers = { 
    'Authorization': 'Basic ' + btoa(`${this.CLIENT_ID}:${this.CLIENTE_SECRET}`),
    'Content-Type': 'application/x-www-form-urlencoded'
   }  
    return this.http.post(this.TOKEN_URL, params.toString() , { headers });
  }
}
