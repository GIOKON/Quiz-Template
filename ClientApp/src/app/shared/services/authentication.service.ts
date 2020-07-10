import { environment } from '../../../environments/environment';
import { ApplicationUser, UserRole, User } from '../models';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import PNotify from 'pnotify/dist/es/PNotify';
import { PNotifyBottomRightStack } from '../../config/PNotifySettings';
import { Injectable } from '@angular/core';
import pageMenus from '../../config/page-menus';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl;
  user = new ApplicationUser();
  jwtHelper = new JwtHelperService();
  token: any;
  isUserLoggedIn: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isOwner: boolean;
  isUser: boolean;
  username: string;
  role: string;
  observableUserLogin;
  observableUserAdmin;
  observableUserSuperAdmin;
  observableUserOwner;
  observableUser;
  observableUsername;

  constructor(private http: HttpClient, private router: Router) {
    if (
      localStorage.getItem('token') !== 'null' &&
      localStorage.getItem('token') !== null
    ) {
      this.isUserLoggedIn = !this.jwtHelper.isTokenExpired(
        localStorage.getItem('token')
      );
    }
    this.observableUserLogin = new BehaviorSubject<boolean>(
      this.isUserLoggedIn
    );

    this.rolesAndMenus();

    this.observableUserAdmin = new BehaviorSubject<boolean>(this.isSuperAdmin);
    this.observableUserAdmin = new BehaviorSubject<boolean>(this.isAdmin);
    this.observableUserOwner = new BehaviorSubject<boolean>(this.isOwner);
    this.observableUser = new BehaviorSubject<boolean>(this.isUser);

    this.username = localStorage.getItem('username');
    this.observableUsername = new BehaviorSubject<string>(this.username);
  }

  rolesAndMenus() {
    let admin = false;
    if (localStorage.getItem('userRoles') !== null) {
      const userRoles = JSON.parse(localStorage.getItem('userRoles'));
      userRoles.forEach((element) => {
        if (element === 'Admin') {
          admin = true;
          pageMenus.length = 0;
          pageMenus.push({
            'icon': 'fa fa-link',
            'title': 'Admin Panel',
            'url': '/admin-panel'
          },{
            'icon': 'fa fa-link',
            'title': 'Account',
            'url': '/account'
          },{
            'icon': 'fa fa-link',
            'title': 'Users',
            'url': '/users-table'
          });
        }
      });
    }
    this.isAdmin = admin;
    this.observableUserAdmin = new BehaviorSubject<boolean>(this.isAdmin);

    let superAdmin = false;
    if (localStorage.getItem('userRoles') !== null) {
      const userRoles = JSON.parse(localStorage.getItem('userRoles'));
      userRoles.forEach((element) => {
        if (element === 'SuperAdmin') {
          superAdmin = true;
          pageMenus.length = 0;
          pageMenus.push({
            'icon': 'fa fa-link',
            'title': 'Admin Panel',
            'url': '/admin-panel'
          },{
            'icon': 'fa fa-link',
            'title': 'Account',
            'url': '/account'
          },{
            'icon': 'fa fa-link',
            'title': 'Users',
            'url': '/users-table'
          });
        }
      });
    }
    this.isSuperAdmin = superAdmin;
    this.observableUserSuperAdmin = new BehaviorSubject<boolean>(
      this.isSuperAdmin
    );

    let owner = false;
    if (localStorage.getItem('userRoles') !== null) {
      const userRoles = JSON.parse(localStorage.getItem('userRoles'));
      userRoles.forEach((element) => {
        if (element === 'Owner') {
          owner = true;
          pageMenus.length = 0;
          pageMenus.push({
            'icon': 'fa fa-link',
            'title': 'Admin Panel',
            'url': '/admin-panel'
          },{
            'icon': 'fa fa-link',
            'title': 'Account',
            'url': '/account'
          });
        }
      });
    }
    this.isOwner = owner;
    this.observableUserAdmin = new BehaviorSubject<boolean>(this.isOwner);

    let user = false;
    if (localStorage.getItem('userRoles') !== null) {
      const userRoles = JSON.parse(localStorage.getItem('userRoles'));
      userRoles.forEach((element) => {
        if (element === 'user') {
          user = true;
          pageMenus.length = 0;
          pageMenus.push({
            'icon': 'fa fa-link',
            'title': 'Admin Panel',
            'url': '/admin-panel'
          },  {
            'icon': 'fa fa-link',
            'title': 'Account',
            'url': '/account'
          });
        }
      });
    }
    this.isUser = user;

  }

  eventChange() {
    if (
      localStorage.getItem('token') !== 'null' &&
      localStorage.getItem('token') !== null
    ) {
      this.isUserLoggedIn = !this.jwtHelper.isTokenExpired(
        localStorage.getItem('token')
      );
    } else {
      this.isUserLoggedIn = false;
    }

   this.rolesAndMenus();

    this.username = localStorage.getItem('username');
    this.observableUserLogin.next(this.isUserLoggedIn);
    this.observableUserAdmin.next(this.isAdmin);
    this.observableUserOwner.next(this.isOwner);
    this.observableUsername.next(this.username);
  }

  login(email, password) {
    return this.http
      .post(this.baseUrl + '/Api/Authenticate/Login', {
        values: JSON.stringify({ email, password }),
      })
      .pipe(
        map((response: any) => {
          this.user.email = response.email;
          this.user.username = response.userName;
          this.user.userRoles = response.userRoles;

          localStorage.setItem('email', response.email);
          localStorage.setItem('username', response.userName);
          localStorage.setItem('role', response.userRoles[0]);
          localStorage.setItem('userRoles', JSON.stringify(response.userRoles));
          localStorage.setItem('token', response.token);
          this.eventChange();
        })
      );
  }

  register(model: User) {
    return this.http
      .post(this.baseUrl + '/Api/Authenticate/Register', {
        key: 0,
        values: JSON.stringify(model),
      })
      .pipe(
        map((response: any) => {
          this.user.email = response.email;
          this.user.username = response.userName;
          this.user.userRoles = response.userRoles;

          localStorage.setItem('email', response.email);
          localStorage.setItem('username', response.userName);
          localStorage.setItem('role', response.userRoles[0]);
          localStorage.setItem('userRoles', JSON.stringify(response.userRoles));
          localStorage.setItem('token', response.token);
          this.eventChange();
        })
      );
  }

  public getToken(): string {
    if (localStorage.getItem('token') !== 'null') {
      return localStorage.getItem('token');
    }
  }

  loggedIn() {
    if (
      localStorage.getItem('token') !== 'null' &&
      localStorage.getItem('token') !== null
    ) {
      return !this.jwtHelper.isTokenExpired(localStorage.getItem('token'));
    }
    return false;
  }

  getIsAdmin() {
    return this.isAdmin;
  }
  getIsSuperAdmin() {
    return this.isSuperAdmin;
  }
  getIsOwner() {
    return this.isOwner;
  }
  getIsUser() {
    return this.isUser;
  }

  getUsername() {
    if (localStorage.getItem('username') !== 'null') {
      return localStorage.getItem('username');
    }
  }

  getRole() {
    if (localStorage.getItem('role') !== 'null') {
      return localStorage.getItem('role');
    }
  }

  logout(showMessage) {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('userRoles');
    if (showMessage) {
      PNotify.success({
        text: 'Logout Complete',
        stack: PNotifyBottomRightStack,
        icon: false,
        delay: 1500,
      });
    }
    this.eventChange();

    this.router.navigate(['/login']);
  }
}
