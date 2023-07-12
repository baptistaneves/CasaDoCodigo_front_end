import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/base-component/form-base.component';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';
import { CategoriaService } from 'src/app/categorias/services/categoria.service';
import { Categoria } from 'src/app/categorias/models/categoria';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html'
})
export class NovoProdutoComponent extends FormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imageURL: string;
  imagemNome: string;

  errors: any[] = [];
  categorias: Categoria[] = [];
  cadastroForm: FormGroup;
  produto: Produto;

  constructor(private fb: FormBuilder,
              private produtoService: ProdutoService,
              private categoriaService: CategoriaService,
              private toastr: ToastrService,
              private router: Router) {
      
      super();

      this.validationMessages = {
        titulo: {
          required: "Informe o titulo"
        },
        imagem: {
          required: "Selecione uma imagem"
        },
        categoriaId: {
          required: "Informe a categoria"
        }
      };

      super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  listarCategorias() {
    this.categoriaService.obterTodos()
    .subscribe(
      categorias => this.categorias = categorias,
      erros => this.errors
    )
  }

  ngOnInit(): void {
    this.listarCategorias();

    this.inicializarFormulario();
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.cadastroForm);
  }

  inicializarFormulario() {

    this.cadastroForm = this.fb.group({
      titulo: ['', [Validators.required]],
      imagem: ['', [Validators.required]],
      categoriaId: ['', [Validators.required]],
      descricao: ['']      
    });
  }

  adicionar() {
    if(this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.produto = Object.assign({}, this.produto, this.cadastroForm.value);
      
      this.produto.imageOnByteArrayFormat = this.croppedImage.split(',')[1];
      this.produto.imagem = this.imagemNome;

      this.produtoService.adicionar(this.produto)
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
        this.router.navigate(['/produtos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.data;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imagemNome = event.currentTarget.files[0].name;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    this.showCropper = true;
  }
  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }
  loadImageFailed() {
    this.errors.push('O formato do arquivo ' + this.imagemNome + ' não é aceito.');
  }

}
