import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

export abstract class BaseGuard { 

    private localStorageUtils = new LocalStorageUtils();
    result: boolean = false;

    constructor(protected router: Router,
                protected toastr: ToastrService){}

    protected validarRoles(routeAc: ActivatedRouteSnapshot) : boolean {

        if(!this.localStorageUtils.obterTokenUsuario()) {
            this.router.navigate(['/login/'], { queryParams: { returnUrl: this.router.url }});
            return false;
        }

        let roles = routeAc.data['role'] as Array<string>;

        if(roles) {

            if(this.roleMatch(roles)) {
                this.result = true;
            }
            else {
              this.navegarAcessoNegado();
                return false;
            }
        }

        return this.result;
    }

  private decodefyToken(token:any) {
    return atob(token.split('.')[1]);
  }

  private roleMatch(roles: any[]) : boolean
  {
    let isMatch: boolean = false;
    let payload = JSON.parse(this.decodefyToken(this.localStorageUtils.obterTokenUsuario()));
    
    roles.forEach(element => {
      if(payload.role == element) {
        isMatch = true;
      }
    });

    return isMatch;
  }

  private navegarAcessoNegado() {
    this.toastr.error('Acesso Negado!', 'Opa :(');
} 
}
