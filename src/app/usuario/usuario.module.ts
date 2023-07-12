import { NgModule } from "@angular/core";
import { UsuarioService } from "./services/usuario.service";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { UsuarioRoutingModule } from "./usuario-routing.module";
import { LoginComponent } from "./login/login.component";
import { DetalhesUsuarioComponent } from "./detalhes-usuario/detalhes-usuario.component";
import { NovoUsuarioComponent } from "./novo-usuario/novo-usuario.component";
import { ListarUsuariosComponent } from "./listar-usuario/listar-usuarios.component";
import { UsuarioResolver } from "./services/usuario.resolver";

@NgModule({
    declarations: [
      LoginComponent,
      DetalhesUsuarioComponent,
      NovoUsuarioComponent,
      ListarUsuariosComponent
    ],
    imports: [
      CommonModule,
      UsuarioRoutingModule,
      ReactiveFormsModule
    ],
    providers: [
      UsuarioService,
      UsuarioResolver
     ]
  })
  export class UsuarioModule { }