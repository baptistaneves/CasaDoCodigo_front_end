import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DetalhesCategoriaComponent } from "./detalhes-categoria/detalhes-categoria.component";
import { EditarCategoriaComponent } from "./editar-categoria/editar-categoria.component";
import { ListarCategoriasComponent } from "./listar-categorias/listar-categorias.component";
import { NovaCategoriaComponent } from "./nova-categoria/nova-categoria.component";
import { CategoriaResolver } from "./services/categoria.resolver";
import { AppGuard } from "../guards/app.guard";

const routes: Routes = [
  {path: 'categorias', component: ListarCategoriasComponent, canActivate: [AppGuard], data: {role: ['Admin', 'User']}},
      {path: 'nova-categoria', component: NovaCategoriaComponent, canActivate: [AppGuard], data: {role: ['Admin', 'User']}},
      {
        path: 'editar-categoria/:id', component: EditarCategoriaComponent,
        canActivate: [AppGuard], 
        data: {role: ['Admin', 'User']},
        resolve: {
          categoria: CategoriaResolver
        }
      },
      {
        path: 'detalhes-categoria/:id', component: DetalhesCategoriaComponent,
        canActivate: [AppGuard], 
        data: {role: ['Admin', 'User']},
        resolve: {
          categoria: CategoriaResolver
        }
      },
];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CategoriaRoutingModule { }