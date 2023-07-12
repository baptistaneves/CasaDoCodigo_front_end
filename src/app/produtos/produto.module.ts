import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ProdutoRoutingModule } from "./produto-routing.module";
import { ProdutoService } from "./services/produto.service";
import { ProdutoResolver } from "./services/produto.resolver";
import { NovoProdutoComponent } from "./novo-produto/novo-produto.component";
import { ImageCropperModule } from "ngx-image-cropper";
import { ListarProdutosComponent } from "./listar-produtos/listar-produtos.component";
import { EditarProdutoComponent } from "./editar-produto/editar-produto.component";
import { DetalhesProdutoComponent } from "./detalhes-produto/detalhes-produto.component";

@NgModule({
    declarations: [
      NovoProdutoComponent,
      ListarProdutosComponent,
      EditarProdutoComponent,
      DetalhesProdutoComponent
    ],
    imports: [
      CommonModule,
      ProdutoRoutingModule,
      ReactiveFormsModule,
      ImageCropperModule
    ],
    providers: [
      ProdutoService,
      ProdutoResolver
     ]
  })
  export class ProdutoModule { }