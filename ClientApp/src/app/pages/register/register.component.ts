import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/services';
import { environment } from '../../../environments/environment';
import pageSettings from '../../config/page-settings';
import { ApiService } from '../../shared/services/api.service';
import { User } from '../../shared/models';
import { ValidatePassword } from '../../shared/Validators/validate-password';
import { PNotifyBottomRightStack } from '../../config/PNotifySettings';
import PNotify from 'pnotify/dist/es/PNotify';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  pageSettings = pageSettings;
  loginForm: FormGroup;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  referrer: string;
  error = '';
  AppName: string;
  AppMotto: string;
  SmallMotto: string;
  Year: number;
  isRegister = false;
  user = new User;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthService,
      private apiService: ApiService,
      private renderer: Renderer2,
  ) {
    this.pageSettings.pageEmpty = true;
    this.renderer.addClass(document.body, 'bg-white');

    this.AppMotto = environment.motto;
    this.AppName = environment.appName;
    this.SmallMotto = environment.smallMotto;
    this.Year = (new Date()).getFullYear();
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          email: ['', [Validators.email, Validators.required]],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          password: ['', Validators.required],
          confirmPassword: ['', [Validators.required]]
      }, {
        validator: ValidatePassword.MatchPassword // custom validation
     });

      // get return url from route parameters or default to '/'
      this.referrer = this.route.snapshot.params['referrer'];
  }

  ngOnDestroy() {
    this.pageSettings.pageEmpty = false;
    this.renderer.removeClass(document.body, 'bg-white');
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    this.user.email = this.f.email.value;
    this.user.name = this.f.firstName.value;
    this.user.surname = this.f.lastName.value;
    this.user.passwordHash = this.f.password.value;

    if (this.referrer) {
      this.user.endpoint = this.referrer;
    }

    this.authenticationService.register(this.user).subscribe(next => {
      PNotify.removeAll();

      PNotify.success({
        type: 'success',
        text: 'Successfully registered in',
        stack: PNotifyBottomRightStack,
        icon: false,
        delay: 1500
      });
    this.loading = false;
    this.router.navigate(['/admin-panel']);
    }, error => {
      PNotify.removeAll();
      PNotify.error({
        text: 'Registration failed',
        stack: PNotifyBottomRightStack,
        icon: false,
        delay: 2500
      });
    this.loading = false;
  });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPass').value;

    return pass === confirmPass ? null : { notSame: true }
  }

}
