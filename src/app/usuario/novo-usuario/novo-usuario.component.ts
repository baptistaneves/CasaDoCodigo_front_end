import { AfterViewInit, Component, OnInit, ViewChildren, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName } from '@angular/forms';


import { FormBaseComponent } from 'src/app/base-component/form-base.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html'
})
export class NovoUsuarioComponent extends FormBaseComponent implements OnInit, AfterViewInit{

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  cadastroForm: FormGroup;
  usuario: Usuario;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private toastr: ToastrService,
              private router: Router) {
      
      super();

      this.validationMessages = {
        email: {
          required: "Informe o e-mail",
          email: "E-mail inválido"
        },
        perfil: {
          required: "Informe o perfil"
        },
        senha: {
          required: "Informe a senha",
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
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      perfil: ['', [Validators.required]],
      senha: ['', [Validators.required]],
    });
  }

  adicionar() {
    if(this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);

      this.usuarioService.adicionar(this.usuario)
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
        this.router.navigate(['/usuarios']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.data;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}