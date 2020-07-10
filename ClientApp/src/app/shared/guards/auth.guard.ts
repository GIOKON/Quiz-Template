import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import PNotify from 'pnotify/dist/es/PNotify';
import { PNotifyBottomRightStack } from '../../config/PNotifySettings';
import { AuthService } from '../services/';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authenticationService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this.authenticationService.loggedIn()) {
        return true;
      }
      PNotify.alert({
        text: 'Please log in to view this page',
        addclass: 'custom',
        stack: PNotifyBottomRightStack,
        type: 'error',
        icon: false,
        delay: 2500
      });

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
}
