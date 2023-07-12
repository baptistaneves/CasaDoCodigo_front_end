import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseService {

  constructor(private http: HttpClient) { super();  }

  obterTodos() : Observable<Produto[]>{
    return this.http
          .get<Produto[]>(this.UrlServiceV1 + "produtos/obter-produtos", this.ObterAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  obterPorId(id:string) : Observable<Produto>{
    return this.http
      .get<Produto>(this.UrlServiceV1 + "produtos/obter-produto-por-id/" + id, this.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  adicionar(produto: Produto) : Observable<Produto>{
    let response = this.http
        .post<Produto>(this.UrlServiceV1 + "produtos/novo-produto", produto, this.ObterAuthHeaderJson())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  editar(produto: Produto): Observable<Produto> {
    return this.http
        .put(this.UrlServiceV1 + "produtos/actualizar-produto", produto, super.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
}

excluir(id: string): Observable<Produto> {
    return this.http
        .delete(this.UrlServiceV1 + "produtos/remover-produto/" + id, super.ObterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
}
}

