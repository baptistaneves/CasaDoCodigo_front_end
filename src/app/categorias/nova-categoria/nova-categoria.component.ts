import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/base-component/form-base.component';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-nova-categoria',
  templateUrl: './nova-categoria.component.html'
})
export class NovaCategoriaComponent extends FormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  cadastroForm: FormGroup;
  categoria: Categoria;

  constructor(private fb: FormBuilder,
              private categoriaService: CategoriaService,
              private toastr: ToastrService,
              private router: Router) {
      
      super();

      this.validationMessages = {
        descricao: {
          required: "Informe a descrição"
        }
      };

      super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.cadastroForm);
  }

  inicializarFormulario() {

    this.cadastroForm = this.fb.group({
      descricao: ['', [Validators.required]]
    });
  }

  adicionar() {
    if(this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.categoria = Object.assign({}, this.categoria, this.cadastroForm.value);

      this.categoriaService.adicionar(this.categoria)
            .subscribe(
              sucesso => { this.processarSucesso() },
              erros => { this.processarFalha(erros) }
            );
    }
  }

  processarSucesso() {
    this.cadastroForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Cadastro realizado com Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/admin/categorias']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.data;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

}
