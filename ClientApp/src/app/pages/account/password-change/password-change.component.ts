import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import PNotify from 'pnotify/dist/es/PNotify';
import { PNotifyBottomRightStack } from '../../../config/PNotifySettings';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import pageSettings from '../../../config/page-settings';
import { map } from 'rxjs/operators';
import { User, Login } from '../../../shared/models';
import { ApiService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services';
import { environment } from '../../../../environments/environment';
import { DxFormComponent } from 'devextreme-angular';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {
  pageSettings = pageSettings;
  user = new Login;
  registerActive = false;
  passwordOptions: any;
  componentName = 'Change Password';
  url = 'Api/ChangeUserPassword';
  @ViewChild(DxFormComponent) form: DxFormComponent;

  changePasswordBool = false;

  buttonOptions: any = {
    text: 'Change Password',
    type: 'default',
    useSubmitBehavior: true
  };

  constructor(public apiService: ApiService,
    public authService: AuthService, public http: HttpClient, public router: Router) {}

  passwordComparison = () => {
    return this.form.instance.option('formData').password;
  }

  checkComparison() {
    return true;
  }

  onFormSubmit = function(e) {
    e.preventDefault();
    PNotify.alert({
      text: 'Registration in progress',
      stack: PNotifyBottomRightStack,
      hide: false,
      icon: false
    });
    this.registerActive = true;

    return this.http.post(environment.apiUrl + this.url,
    {
      values: JSON.stringify(this.user)
    }).pipe(
        map((response: any) => {
          PNotify.removeAll();
          PNotify.alert({
            type: 'success',
            text: 'Successfully updated password',
            stack: PNotifyBottomRightStack,
            icon: false,
            delay: 1500
          });
        })
      )
      .subscribe(
        next => {
          this.registerActive = false;
          this.form.clear();
          // This is handled above
        },
        error => {
          this.registerActive = false;
          // Here we get an error due to API failure
            PNotify.removeAll();
            PNotify.alert({
              text: 'Password Change failed',
              addclass: 'custom',
              stack: PNotifyBottomRightStack,
              icon: false,
              delay: 2500
            });
        }
      );
  };


  ngOnInit() {}
}
