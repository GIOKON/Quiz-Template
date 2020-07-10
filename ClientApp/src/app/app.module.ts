// Core Module
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule }               from '@angular/platform-browser/animations';
import { BrowserModule, Title }                  from '@angular/platform-browser';
import { AppRoutingModule }                      from './app-routing.module';
import { NgbModule, NgbDatepickerModule }                             from '@ng-bootstrap/ng-bootstrap';
import { NgModule }                              from '@angular/core';
import { FormsModule, ReactiveFormsModule }      from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import * as global                               from './config/globals';

// Main Component
import { AppComponent }                    from './app.component';
import { HeaderComponent }                 from './components/header/header.component';
import { SidebarComponent }                from './components/sidebar/sidebar.component';
import { SidebarRightComponent }           from './components/sidebar-right/sidebar-right.component';
import { TopMenuComponent }                from './components/top-menu/top-menu.component';
import { FooterComponent }                 from './components/footer/footer.component';
import { PanelComponent }                  from './components/panel/panel.component';
import { FloatSubMenuComponent }           from './components/float-sub-menu/float-sub-menu.component';


// Component Module
import { AgmCoreModule }                   from '@agm/core';
import { LoadingBarRouterModule }          from '@ngx-loading-bar/router';
import { TrendModule }                     from 'ngx-trend';
import { CountdownModule }                 from 'ngx-countdown';
import { SweetAlert2Module }               from '@sweetalert2/ngx-sweetalert2';
import { NvD3Module }                      from 'ng2-nvd3';
import 'd3';
import 'nvd3';
import { CalendarModule, DateAdapter }     from 'angular-calendar';
import { adapterFactory }                  from 'angular-calendar/date-adapters/date-fns';
import { PerfectScrollbarModule }          from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG }        from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DxButtonModule, DxDataGridModule, DxFormModule, DxPopupModule, DxScrollViewModule, DxTabPanelModule, DxPieChartModule, DxChartModule, DxFileUploaderModule, DxHtmlEditorModule, DxCheckBoxModule, DxDateBoxModule } from 'devextreme-angular';
import { ArchwizardModule } from 'angular-archwizard';
import { FormWizardModule } from '@betaquick/angular2-wizard';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


// Pages
import { HomePage }          from './pages/home/home';
import { LoginComponent } from './pages/login';
import { TokenInterceptor } from './shared/interceptors';
import { environment } from '../environments/environment';
import { UsersComponent } from './pages/users/users.component';
import { ServiceUserComponent } from './pages/users/components/service-user/service-user.component';
import { AdminTableComponent } from './pages/users/components/admin-table/admin-table.component';
import { SuperAdminTableComponent } from './pages/users/components/super-admin-table/super-admin-table.component';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { RegisterComponent } from './pages/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { AccountEditComponent } from './pages/account/account-edit/account-edit/account-edit.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { ProfilePictureUploaderComponent } from './pages/account/profile-picture-uploader/profile-picture-uploader.component';
import { PasswordChangeComponent } from './pages/account/password-change/password-change.component';
import { BackgroundPictureUploaderComponent } from './pages/account/background-picture-uploader/background-picture-uploader.component';
import { IconsListComponent } from './components/icons-list/icons-list.component';
import { TopComponent } from './components/top/top.component';
import { BottomComponent } from './components/bottom/bottom.component';
import { EmailFormComponent } from './components/email-form/email-form.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DatePipe } from '@angular/common';
import { AboutComponent } from './pages/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    SidebarRightComponent,
    TopMenuComponent,
    FooterComponent,
    PanelComponent,
    FloatSubMenuComponent,

    HomePage,
    LoginComponent,
    UsersComponent,
    ServiceUserComponent,
    AdminTableComponent,
    SuperAdminTableComponent,
    RegisterComponent,
    AccountComponent,
    AccountEditComponent,
    AdminPanelComponent,
    ProfilePictureUploaderComponent,
    PasswordChangeComponent,
    BackgroundPictureUploaderComponent,
    IconsListComponent,
    TopComponent,
    BottomComponent,
    EmailFormComponent,
    NotFoundComponent,
    AboutComponent,


  ],
  imports: [
    AppRoutingModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyC5gJ5x8Yw7qP_DqvNq3IdZi2WUSiDjskk' }),
    BrowserAnimationsModule,
    BrowserModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    CountdownModule,

    FormsModule,
    LoadingBarRouterModule,
    MatSortModule,
    MatTableModule,
    NgbModule,
    NvD3Module,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    NgbDatepickerModule,
    TrendModule,
    HttpClientModule,
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
    DxPopupModule,
    DxScrollViewModule,
    DxTabPanelModule,
    DxPieChartModule,
    DxChartModule,
    DxFileUploaderModule,
    DxHtmlEditorModule,
    DxDateBoxModule,
    DxCheckBoxModule,
    ArchwizardModule,
    FormWizardModule
  ],
  providers: [ Title, {

    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  DatePipe],
  bootstrap: [ AppComponent ]
})

export class AppModule {
  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        var title = environment.appName + ' | ' + this.route.snapshot.firstChild.data['title'];
        this.titleService.setTitle(title);
      }
    });
  }
}
