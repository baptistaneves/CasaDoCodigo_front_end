import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CategoriaService } from './categoria.service';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaResolver implements Resolve<Categoria> {

  constructor(private categoriaService: CategoriaService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.categoriaService.obterPorId(route.params['id']);
  }
}