import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import PNotify from 'pnotify/dist/es/PNotify';

import { AuthService } from '../../shared/services';
import pageSettings from '../../config/page-settings';
import { environment } from '../../../environments/environment';
import { PNotifyBottomRightStack } from '../../config/PNotifySettings';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit, OnDestroy {
    pageSettings = pageSettings;
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    AppName: string;
    AppMotto: string;
    SmallMotto: string;
    Year: number;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthService,
        private renderer: Renderer2
    ) {
      this.pageSettings.pageEmpty = true;
      this.renderer.addClass(document.body, 'bg-white');

      this.AppMotto = environment.motto;
      this.AppName = environment.appName;
      this.SmallMotto = environment.smallMotto;
      this.Year = (new Date()).getFullYear();
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    ngOnDestroy() {
      this.pageSettings.pageEmpty = false;
      this.renderer.removeClass(document.body, 'bg-white');
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.email.value, this.f.password.value).subscribe(next => {
          PNotify.removeAll();

          PNotify.success({
            type: 'success',
            text: 'Successfully logged in',
            stack: PNotifyBottomRightStack,
            icon: false,
            delay: 1500
          });
          this.loading = false;
          this.router.navigate([this.returnUrl]);
      }, error => {
          PNotify.removeAll();
          PNotify.error({
            text: 'Login failed',
            stack: PNotifyBottomRightStack,
            icon: false,
            delay: 2500
          });
          this.loading = false;

      });
    }
}
