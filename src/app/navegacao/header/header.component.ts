import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageUtils } from "src/app/utils/localstorage";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
  })
export class HeaderComponent {

  localStorageUtil = new LocalStorageUtils();

  constructor(private router: Router) {}

  logOut() {
    this.localStorageUtil.limparDadosLocaisUsuario();
    this.router.navigate(['/login']);
  }

}