import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import { ProdutoService } from './produto.service';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoResolver implements Resolve<Produto> {
  constructor(private produtoService: ProdutoService) {}

  resolve(route: ActivatedRouteSnapshot){
    return this.produtoService.obterPorId(route.params['id']);
  }
}
