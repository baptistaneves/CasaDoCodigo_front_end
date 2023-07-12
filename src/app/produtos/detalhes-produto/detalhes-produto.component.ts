import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../models/produto';
import { Categoria } from 'src/app/categorias/models/categoria';
import { CategoriaService } from 'src/app/categorias/services/categoria.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html'
})
export class DetalhesProdutoComponent {

  produtoForm: FormGroup;
  produto: Produto;

  categorias: Categoria[] = [];

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private categoriaService: CategoriaService,) {

      this.produto = this.route.snapshot.data['produto'];
  }


  ngOnInit(): void {
    this.listarCategorias();

    this.inicializarFormulario();
    this.preencherFormulario();
  }

  listarCategorias() {
    this.categoriaService.obterTodos()
    .subscribe(
      categorias => this.categorias = categorias,
    )
  }

  preencherFormulario() {
    this.produtoForm.patchValue({
        nome: this.produto.titulo,
        categoriaId: this.produto.categoriaId,     
        descricao: this.produto.descricao  
      });

    this.produtoForm.disable();
  }

  inicializarFormulario() {

    this.produtoForm = this.fb.group({
        titulo: [''],
        categoriaId: [''],
        descricao: ['']       
    });
  }

}
