import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { CategoriaRoutingModule } from "./categoria-routing.module";
import { CategoriaService } from "./services/categoria.service";
import { CategoriaResolver } from "./services/categoria.resolver";
import { NovaCategoriaComponent } from "./nova-categoria/nova-categoria.component";
import { ListarCategoriasComponent } from "./listar-categorias/listar-categorias.component";
import { EditarCategoriaComponent } from "./editar-categoria/editar-categoria.component";
import { DetalhesCategoriaComponent } from "./detalhes-categoria/detalhes-categoria.component";

@NgModule({
    declarations: [
      NovaCategoriaComponent,
      ListarCategoriasComponent,
      EditarCategoriaComponent,
      DetalhesCategoriaComponent
    ],
    imports: [
      CommonModule,
      CategoriaRoutingModule,
      ReactiveFormsModule
    ],
    providers: [
      CategoriaService,
      CategoriaResolver
     ]
  })
  export class CategoriaModule { }