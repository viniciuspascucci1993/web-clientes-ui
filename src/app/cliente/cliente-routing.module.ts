import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatorGuard } from '../authenticator.guard';
import { LayoutComponent } from '../layout/layout.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';


const routes: Routes = [
  { path: 'clientes', component: LayoutComponent, canActivate: [AuthenticatorGuard], children: [

    { path: 'form', component: ClienteFormComponent },
    { path: 'form/:id', component: ClienteFormComponent },
    { path: 'lista', component: ClienteListaComponent },
    { path: '', redirectTo: '/clientes/lista', pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
