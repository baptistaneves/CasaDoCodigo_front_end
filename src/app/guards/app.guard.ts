import { BaseGuard } from 'src/app/services/base.guard';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AppGuard extends BaseGuard implements CanActivate {

  constructor(protected override router: Router,
              protected override toastr: ToastrService){ super(router, toastr); }

  canActivate(routeAc: ActivatedRouteSnapshot) {
    return super.validarRoles(routeAc);
  }
  
}
