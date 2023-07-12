import { ListarProdutosComponent } from './listar-produtos/listar-produtos.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NovoProdutoComponent } from "./novo-produto/novo-produto.component";
import { ProdutoResolver } from "./services/produto.resolver";
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { DetalhesProdutoComponent } from './detalhes-produto/detalhes-produto.component';
import { AppGuard } from '../guards/app.guard';

const routes: Routes = [
  {path: 'produtos', component: ListarProdutosComponent, canActivate: [AppGuard], data: {role: ['Admin', 'User']}},
      {path: 'novo-produto', component: NovoProdutoComponent, canActivate: [AppGuard], data: {role: ['Admin', 'User']}},
      {
        path: 'editar-produto/:id', component: EditarProdutoComponent,
        canActivate: [AppGuard], 
        data: {role: ['Admin']},
        resolve: {
          produto: ProdutoResolver
        }
      },
      {
        path: 'detalhes-produto/:id', component: DetalhesProdutoComponent,
        canActivate: [AppGuard], 
        data: {role: ['Admin', 'User']},
        resolve: {
          produto: ProdutoResolver
        }
      },
];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProdutoRoutingModule { }