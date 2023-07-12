import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioResolver implements Resolve<Usuario> {
  constructor(private usuarioService: UsuarioService) { }

  resolve(route: ActivatedRouteSnapshot){
    return this.usuarioService.obterPorId(route.params['id']);
  }
}
