import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/base-component/form-base.component';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../services/categoria.service';


@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html'
})
export class EditarCategoriaComponent extends FormBaseComponent implements OnInit, AfterViewInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  categoriaForm: FormGroup;
  categoria: Categoria = new Categoria();

  constructor(private fb: FormBuilder,
              private categoriaService: CategoriaService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute) {
      
      super();

      this.validationMessages = {
        descricao: {
          required: "Informe a descrição"
        }
      };

      super.configurarMensagensValidacaoBase(this.validationMessages);

      this.categoria = this.route.snapshot.data['categoria'];
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.preencherForm();
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.categoriaForm);
  }

  preencherForm() {
    this.categoriaForm.patchValue({
      descricao: this.categoria.descricao,
    });
  }

  inicializarFormulario() {
    this.categoriaForm = this.fb.group({
      descricao: ['', [Validators.required]]
    });
  }

  editar() {
    if(this.categoriaForm.dirty && this.categoriaForm.valid) {
      this.categoria = Object.assign({}, this.categoria, this.categoriaForm.value);

      this.categoriaService.editar(this.categoria)
      .subscribe(
        sucesso => { this.processarSucesso() },
        erros => { this.processarFalha(erros) }
      );
    }
  }

  processarSucesso() {
    this.errors = [];

    let toast = this.toastr.success('Categoria Alterada com Sucesso!');
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
