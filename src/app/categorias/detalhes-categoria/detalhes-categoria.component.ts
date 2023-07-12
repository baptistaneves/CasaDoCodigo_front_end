import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-detalhes-categoria',
  templateUrl: './detalhes-categoria.component.html'
})
export class DetalhesCategoriaComponent {
  categoriaForm: FormGroup;
  categoria: Categoria = new Categoria();

  constructor(private fb: FormBuilder,
              private categoriaService: CategoriaService,
              private route: ActivatedRoute) {
      
      this.categoria = this.route.snapshot.data['categoria'];
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.preencherForm();
  }

  preencherForm() {
    this.categoriaForm.patchValue({
      descricao: this.categoria.descricao
    });

    this.categoriaForm.disable();
  }

  inicializarFormulario() {
    this.categoriaForm = this.fb.group({
      descricao: ['']
    });
  }
}
