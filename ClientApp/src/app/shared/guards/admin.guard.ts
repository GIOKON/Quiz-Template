import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import PNotify from 'pnotify/dist/es/PNotify';
import { AuthService } from '../services';
import { PNotifyBottomRightStack } from '../../config/PNotifySettings';


@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.loggedIn()
    && (this.authenticationService.getIsAdmin() || this.authenticationService.getIsSuperAdmin())) {
      return true;
    }
    PNotify.alert({
      text: 'This page is only available to users with higher elevation.',
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
