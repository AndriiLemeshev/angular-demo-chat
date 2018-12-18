import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {SessionService} from '../services';

@Injectable()
export class CanActivateChat implements CanActivate {
  constructor(
    private service: SessionService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.service.get().pipe(map(session => {
      if (session !== null) {
        return true;
      }

      this.router.navigate(['login']);
      return false;
    }));
  }

}
