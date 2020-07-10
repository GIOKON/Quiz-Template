import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  messageReceived = new EventEmitter<any>();
  connectionEstablished = new EventEmitter<Boolean>();

  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();

  }


  sendMessage(message: string) {
    this._hubConnection.invoke('SendMessage', message);
  }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(environment.apiUrl + '/signal')
      .build();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(function () { this.startConnection(); }, 5000);
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('DonationListeners', (data: any) => {
      this.messageReceived.emit(data);
    });
  }
}
