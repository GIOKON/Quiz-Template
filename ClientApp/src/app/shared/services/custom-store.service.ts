import { Injectable } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import PNotify from 'pnotify/dist/es/PNotify';
import { environment } from '../../../environments/environment';
import { PNotifyBottomRightStack } from '../../config/PNotifySettings';

@Injectable({
  providedIn: 'root'
})
export class CustomStoreService {

  constructor(private apiService: ApiService) { }

  createBoundStore(id: number, url: string) {
    return new CustomStore({
      key: 'id',
      load: () =>
        this.sendRequest(environment.apiUrl + url + '/' + id),
      insert: values =>
        this.sendRequest(
          environment.apiUrl + url + '/' + id,
          'POST',
          {
            values: JSON.stringify(values)
          }
        ),
      update: (key, values) =>
        this.sendRequest(
          environment.apiUrl + url,
          'PUT',
          {
            key: key,
            values: JSON.stringify(values)
          }
        ),
      remove: key =>
        this.sendRequest(
          environment.apiUrl + url + '/?key=',
          'DELETE',
          {
            key: key
          }
        )
    });
  }



  createNewStore(id: number, url: string) {
    return new CustomStore({
      key: 'id',
      load: () =>
        this.sendRequest(environment.apiUrl + url + '/?id=' + id),
      insert: values =>
        this.sendRequest(
          environment.apiUrl + url,
          'POST',
          {
            key: id,
            values: JSON.stringify(values)
          }
        ),
      update: (key, values) =>
        this.sendRequest(
          environment.apiUrl + url,
          'PUT',
          {
            key: key,
            values: JSON.stringify(values)
          }
        ),
      remove: key =>
        this.sendRequest(
          environment.apiUrl + url + '/?key=',
          'DELETE',
          {
            key: key
          }
        )
    });
  }
  createNewSimpleStore(url: string) {
    return new CustomStore({
      key: 'id',
      load: () =>
        this.sendRequest(environment.apiUrl + url),
      insert: values =>
        this.sendRequest(
          environment.apiUrl + url,
          'POST',
          {
            values: JSON.stringify(values)
          }
        ),
      update: (key, values) =>
        this.sendRequest(
          environment.apiUrl + url,
          'PUT',
          {
            key: key,
            values: JSON.stringify(values)
          }
        ),
      remove: key =>
        this.sendRequest(
          environment.apiUrl + url + '/?key=',
          'DELETE',
          {
            key: key
          }
        )
    });
  }

  sendRequest(url: string, method: string = 'GET', data: any = {}): any {
    const httpParams = new HttpParams({ fromObject: data });
    const httpOptions = { withCredentials: true, body: httpParams };
    let result;

    switch (method) {
      case 'GET':
        result = this.apiService.getObject(url);
        break;
      case 'PUT':
        result = this.apiService.putObject(url, data);
        break;
      case 'POST':
        result = this.apiService.postObject(url, data);
        break;
      case 'DELETE':
        result = this.apiService.deleteObject(url, data);
        break;
    }

    return result
      .toPromise()
      .then((data: any) => {
        return method === 'GET' ? data : data;
      })
      .catch(e => {
        PNotify.error({
          text: e.error,
          stack: PNotifyBottomRightStack,
          hide: true,
          icon: false,
          delay: 2500
        });
        throw e && e.error && e.error.Message;
      });
  }
}
