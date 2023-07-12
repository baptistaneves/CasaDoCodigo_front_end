import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

import { BaseService } from 'src/app/services/base.service';
import { Usuario } from '../models/usuario';
import { Login } from '../models/login';
import { UsuarioResponse } from '../models/usuarioResponse';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService {

  constructor(private http: HttpClient) { super();  }

  obterTodos() : Observable<Usuario[]>{
    return this.http
          .get<Usuario[]>(this.UrlServiceV1 + "account/obter-usuarios", this.ObterAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  obterPorId(id:string) : Observable<Usuario>{
    return this.http
      .get<Usuario>(this.UrlServiceV1 + "account/obter-usuario-por-id/" + id, this.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  adicionar(usuario: Usuario) : Observable<Usuario>{
    let response = this.http
        .post<Usuario>(this.UrlServiceV1 + "account/criar-usuario", usuario, this.ObterAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  login(login: Login) : Observable<UsuarioResponse>{
    let response = this.http
        .post<UsuarioResponse>(this.UrlServiceV1 + "account/login", login, this.ObterHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }
}