import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  cpf: string;
  password: string;
  cadastrarNovoUsuario: boolean;
  mensagemSucesso: string;
  errors: String[];

  constructor(
    private router: Router,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    
    this.authService
      .getAuth(this.cpf, this.password)
      .subscribe( response => {
        const access_token = JSON.stringify(response);
        localStorage.setItem('access_token', access_token)
        this.router.navigate(['/home'])
      }, errorResponse => {
        this.errors = ['CPF e/ou Senha incorretos.']
      })
    
    
  }

  readyToAddUser(event) {
    event.preventDefault();
    this.cadastrarNovoUsuario = true;
  }

  cancelAndBackToFormLogin() {
    this.cadastrarNovoUsuario = false;
  }

  insert() {
    const usuario: Usuario = new Usuario();
    usuario.cpf = this.cpf;
    usuario.password = this.password;

    this.authService.insert( usuario )
      .subscribe( response => {
        this.mensagemSucesso = "Cadastro realizado com sucesso! Favor efetuar o login.";
        this.cadastrarNovoUsuario = false;
        this.cpf = "";
        this.password = "";
        this.errors = [];
      }, errorResponse => {
        this.mensagemSucesso = null;
        this.errors = errorResponse.error.errors;
      })
  }
}
