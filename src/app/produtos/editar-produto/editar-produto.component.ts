import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageTransform, ImageCroppedEvent, Dimensions } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';

import { FormBaseComponent } from 'src/app/base-component/form-base.component';
import { CategoriaService } from 'src/app/categorias/services/categoria.service';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/produto';
import { Categoria } from 'src/app/categorias/models/categoria';


@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html'
})
export class EditarProdutoComponent  extends FormBaseComponent implements OnInit, AfterViewInit {

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
  produtoForm: FormGroup;
  produto: Produto;

  constructor(private fb: FormBuilder,
              private produtoService: ProdutoService,
              private categoriaService: CategoriaService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute) {
      
      super();
      this.produto = this.route.snapshot.data['produto'];

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
    this.preencherFormulario();
  }

  preencherFormulario() {
    this.produtoForm.patchValue({
      nome: this.produto.titulo,
      categoriaId: this.produto.categoriaId,     
      descricao: this.produto.descricao  
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.produtoForm);
  }

  inicializarFormulario() {

    this.produtoForm = this.fb.group({
        titulo: ['', [Validators.required]],
        imagem: ['', [Validators.required]],
        categoriaId: ['', [Validators.required]],
        descricao: [''] 
    });
  }

  editar() {
    if(this.produtoForm.dirty && this.produtoForm.valid) {
      let oldImage = this.produto.imagem;

      this.produto = Object.assign({}, this.produto, this.produtoForm.value);
      
      if(this.croppedImage.split(',')[1]) {
        this.produto.imageOnByteArrayFormat = this.croppedImage.split(',')[1];
        this.produto.imagem = this.imagemNome;
      }
      else {
        this.produto.imagem = oldImage;
      }

      this.produtoService.editar(this.produto)
            .subscribe(
              sucesso => { this.processarSucesso() },
              erros => { this.processarFalha(erros) }
            );
    }
  }

  processarSucesso() {
    this.produtoForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Alteração realizada com Sucesso!');
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
