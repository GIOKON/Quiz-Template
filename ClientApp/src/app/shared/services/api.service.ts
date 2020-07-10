import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getObject(url: string) {
    return this.http.get(url);
  }

  putObject(url: string, data: any) {
    return this.http.put(url, data);
  }

  postObject(url: string, data: any) {
    return this.http.post(url, data);
  }

  deleteObject(url: string, data: any) {
    return this.http.delete(url + data.key);
  }

  getAmenities() {
    return this.http.get(environment.apiUrl + '/api/Amenities');
  }

  getEndpoint() {
    return this.http.get(environment.apiUrl + '/api/FindEndpoint');
  }

  getHouseRules() {
    return this.http.get(environment.apiUrl + '/api/HouseRules');
  }
  GetUserListings() {
    return this.http.get(environment.apiUrl + '/api/GetUserListings');
  }
  getCountries() {
    return this.http.get(environment.apiUrl + '/api/GetCountries');
  }


  getUser() {
    return this.http.get(environment.apiUrl + 'Api/GetUser');
  }

  RetrieveMyListings() {
    return this.http.get(environment.apiUrl + 'Api/RetrieveMyListings');
  }

  CheckReferred() {
    return this.http.get(environment.apiUrl + 'Api/CheckReferred');
  }

  FindEndpoint() {
    return this.http.get(environment.apiUrl + 'Api/FindEndpoint');
  }

  getListing(listingId) {
    return this.http.get(environment.apiUrl + 'Api/Listings/' + listingId);
  }

  retrieveUserListings(endpoint) {
    return this.http.get(environment.apiUrl + 'Api/RetrieveUserListings/' + endpoint);
  }

  GetUsers() {
    return this.http.get(environment.apiUrl + '/api/Users');
  }

  GetRoles() {
    return this.http.get(environment.apiUrl + '/api/GetRoles');
  }

}
