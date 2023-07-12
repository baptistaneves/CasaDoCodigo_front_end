import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DetalhesUsuarioComponent } from "./detalhes-usuario/detalhes-usuario.component";
import { ListarUsuariosComponent } from "./listar-usuario/listar-usuarios.component";
import { NovoUsuarioComponent } from "./novo-usuario/novo-usuario.component";
import { UsuarioResolver } from "./services/usuario.resolver";
import { AppGuard } from "../guards/app.guard";

const routes: Routes = [
  {path: 'usuarios', component: ListarUsuariosComponent, canActivate: [AppGuard], data: {role: ['Admin', 'User']}},
  {path: 'novo-usuario', component: NovoUsuarioComponent, canActivate: [AppGuard], data: {role: ['Admin', 'User']}},
  {
    path: 'detalhes-usuario/:id', component: DetalhesUsuarioComponent,
    canActivate: [AppGuard], 
    data: {role: ['Admin', 'User']},
    resolve: {
      usuario: UsuarioResolver
    }
  },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UsuarioRoutingModule { }