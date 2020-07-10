import { Component, OnInit } from '@angular/core';
import { style } from '@angular/animations';
import { SimpleRequest } from '../../../../shared/models/SimpleRequest';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import PNotify from 'pnotify/dist/es/PNotify';
import { map } from 'rxjs/operators';
import { PNotifyBottomRightStack } from '../../../../config/PNotifySettings';
import { User } from '../../../../shared/models';
import { ApiService } from '../../../../shared/services/api.service';
import { Country } from '../../../../shared/models/Country';


@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {
  registerActive = false;
  namePattern: any = /^[^0-9]+$/;
  user = new User;
  countries = {} as Country[];

  buttonOptionsEdit: any = {
    text: 'Submit Changes',
    type: 'success',
    useSubmitBehavior: true,
  };
  url = 'Api/UpdateUserData';

  constructor(public http: HttpClient, public apiService: ApiService) {
    this.apiService.getCountries().subscribe((model: any) => {
      this.countries = model;
      console.log(this.countries);

    });
    this.getUserSetForm();
   }

  getUserSetForm () {
    // todo set loading? maybe not needed
    this.apiService.getUser().subscribe((model: any) => {
      this.user = model;
    });
  }

  onFormSubmit = function(e) {
    e.preventDefault();
    PNotify.alert({
      text: 'Updating in progress',
      stack: PNotifyBottomRightStack,
      hide: false,
      icon: false
    });
    this.registerActive = true;

    this.http
      .post(environment.apiUrl + this.url, this.user)
      .pipe(map((response: any) => {
          PNotify.removeAll();

          PNotify.alert({
            type: 'success',
            text: 'Successfully updated',
            stack: PNotifyBottomRightStack,
            icon: false,
            delay: 1500
          });

          this.user = response.localUser;
          // todo update the User username in local storage
        })
      )
      .subscribe(
        next => {
          this.registerActive = false;
          // This is handled above
        },
        error => {
          this.registerActive = false;
          // Here we get an error due to API failure
            PNotify.removeAll();
            PNotify.alert({
              text: 'Account Update failed',
              addclass: 'custom',
              stack: PNotifyBottomRightStack,
              icon: false,
              delay: 2500
            });
          }
      );
  };

  // Use to validate unique Endpoint
  // validateEmail(params) {
  //   const email: SimpleRequest = new SimpleRequest();
  //   email.Value = params.value;
  //   this.http
  //     .post(environment.apiUrl + 'api/CheckEmail', email)
  //     .subscribe(response => {
  //       params.rule.isValid = !response['exists'];
  //       params.rule.message = 'Email already in use.';
  //       params.validator.validate();
  //     });
  //   // Validation result until the response is received
  //   return false;
  // }


  ngOnInit() {
  }

}
