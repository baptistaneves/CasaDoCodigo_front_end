import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing-module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioModule } from './usuario/usuario.module';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './navegacao/footer/footer.component';
import { HeaderComponent } from './navegacao/header/header.component';
import { MenuComponent } from './navegacao/menu/menu.component';
import { HomeComponent } from './navegacao/home/home.component';
import { CategoriaModule } from './categorias/categoria.module';
import { ProdutoModule } from './produtos/produto.module';
import { AppGuard } from './guards/app.guard';
import { ErrorInterceptor } from './services/error.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    UsuarioModule,
    CategoriaModule,
    ProdutoModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    httpInterceptorProviders,
    AppGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }