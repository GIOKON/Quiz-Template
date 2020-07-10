import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  jwtHelper = new JwtHelperService();
  getEmail = localStorage.getItem('email');
  getUserRoles = localStorage.getItem('userRoles');
  getId = localStorage.getItem('userId');
  getTokenTimeout = null;
  isLive = false;

constructor() {
  if (localStorage.getItem('token') !== 'null' && localStorage.getItem('token') !== null) {
    this.getTokenTimeout = this.jwtHelper.getTokenExpirationDate(localStorage.getItem('token'));
    this.isLive = !this.jwtHelper.isTokenExpired(localStorage.getItem('token'));
  }
 }
 public getUsername() {
    return localStorage.getItem('username');
 }

 public checkLive() {
  if (localStorage.getItem('token') !== 'null' && localStorage.getItem('token') !== null) {
    this.getTokenTimeout = this.jwtHelper.getTokenExpirationDate(localStorage.getItem('token'));
    return(!this.jwtHelper.isTokenExpired(localStorage.getItem('token')));
  } else {
    return false;
  }
 }

}
