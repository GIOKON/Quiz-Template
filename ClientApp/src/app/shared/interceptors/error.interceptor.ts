import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services';
import PNotify from 'pnotify/dist/es/PNotify';
import { PNotifyBottomRightStack } from '../../config/PNotifySettings';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout(false);
            }

            const error = err.error.message || err.statusText;

            PNotify.error({
              text: err.error,
              addclass: 'custom',
              stack: PNotifyBottomRightStack,
              icon: false,
              delay: 2500
            });
            return throwError(error);
        }));
    }
}
