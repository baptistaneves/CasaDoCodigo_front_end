import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html'
})
export class ListarUsuariosComponent implements OnInit{
  
  usuarios: Usuario[];
  errorMessage: string;


  constructor(private usuarioService: UsuarioService) {}
  
  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.usuarioService.obterTodos()
          .subscribe(
            usuarios => this.usuarios = usuarios,
            erros => this.errorMessage
          )
  }

}
