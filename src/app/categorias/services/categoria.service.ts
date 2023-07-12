import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseService {

  constructor(private http: HttpClient) { super();  }

  obterTodos() : Observable<Categoria[]>{
    return this.http
          .get<Categoria[]>(this.UrlServiceV1 + "categorias/obter-categorias", this.ObterAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  obterPorId(id:string) : Observable<Categoria>{
    return this.http
      .get<Categoria>(this.UrlServiceV1 + "categorias/obter-categoria-por-id/" + id, this.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  adicionar(categoria: Categoria) : Observable<Categoria>{
    let response = this.http
        .post<Categoria>(this.UrlServiceV1 + "categorias/nova-categoria", categoria, this.ObterAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  editar(categoria: Categoria): Observable<Categoria> {
    return this.http
        .put(this.UrlServiceV1 + "categorias/actualizar-categoria", categoria, super.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
}

excluir(id: string): Observable<Categoria> {
    return this.http
        .delete(this.UrlServiceV1 + "categorias/remover-categoria/" + id, super.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
}

}