import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../shared/models';
import { EmailInformation } from '../../shared/models/EmailInformation';
import PNotify from 'pnotify/dist/es/PNotify';
import { map } from 'rxjs/operators';
import { PNotifyBottomRightStack } from '../../config/PNotifySettings';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {
  @Input() user: User;
  @Input() direct = false;
  emailInformation = {} as EmailInformation;
  formFailedValidation = false;
  url = 'api/SendEmail';
  registerActive = false;
  code; telephone;
  listing;
  now = new Date();
  dateTo; dateFrom;
  body;

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  ngOnInit() {
  }

  setListing(e) {
    this.listing = e.srcElement.value;
  }

  setFrom(e) {
    this.dateFrom = this.datePipe.transform(e.value , 'dd-MM-yyyy');
  }
  setTo(e) {
    this.dateTo = this.datePipe.transform(e.value , 'dd-MM-yyyy');
  }


  formSubmit() {
    this.registerActive = true;

    if (!this.body || !this.emailInformation.sourceEmail || !this.emailInformation.sourceEmailName
      || !this.code || !this.telephone || (!this.dateFrom && !this.direct) || (!this.dateTo && !this.direct)) {
      this.formFailedValidation = true;
      this.registerActive = false;
      PNotify.removeAll();
      PNotify.error({
        text: 'There is an issue with the email data provided.',
        addclass: 'custom',
        stack: PNotifyBottomRightStack,
        icon: false,
        delay: 2500
      });
    } else {

      PNotify.info({
        text: 'Sending email in progress',
        stack: PNotifyBottomRightStack,
        hide: false,
        icon: false
      });

      this.emailInformation.user = this.user;
      this.emailInformation.subject = 'GuestHostDirect Platform: Email by a user';
      this.emailInformation.body = this.body;
      if (!this.direct) {
        this.emailInformation.body += '<br> Listing: ' + this.listing;
        this.emailInformation.body += '<br> Dates: ' + this.dateFrom + ' - ' + this.dateTo;
      }
      this.emailInformation.body += '<br> Contact Phone: ' + this.code + ' ' + this.telephone;
      this.http
      .post(environment.apiUrl + this.url, this.emailInformation)
      .pipe(map((response: any) => {

          // todo update the User username in local storage
        })
      )
      .subscribe(
        next => {
          PNotify.removeAll();

          PNotify.alert({
            type: 'success',
            text: 'Successfully send',
            stack: PNotifyBottomRightStack,
            icon: false,
            delay: 1500
          });
          this.registerActive = false;
          // This is handled above
        },
        error => {
          this.registerActive = false;
          // Here we get an error due to API failure
            PNotify.removeAll();
            PNotify.error({
              text: 'Sending email failed',
              addclass: 'custom',
              stack: PNotifyBottomRightStack,
              icon: false,
              delay: 2500
            });
          }
      );
    }
  }

}
