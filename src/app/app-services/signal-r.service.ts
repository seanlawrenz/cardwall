import { Injectable, EventEmitter } from '@angular/core';
import { Observable, from } from 'rxjs';
import { ConfigService } from './config.service';
import { environment } from '../../environments/environment.prod';

enum ConnectionState {
  connecting = 0,
  connected = 1,
  reconnecting = 2,
  disconnecting = 3,
  disconnected = 4,
}

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  connectionChanged = new EventEmitter<number>();
  afterEventPublished = new EventEmitter<string>();

  private connection: HubConnection;
  private proxy: HubProxy;

  hubUrl: string;
  hubName = 'CardWallHub';

  connectionState: number = ConnectionState.disconnected;

  constructor(configService: ConfigService) {
    this.hubUrl = configService.config.SignalRBasePath;
  }

  private static getConnectionStateName(state: ConnectionState): string {
    switch (state) {
      case ConnectionState.connecting:
        return 'Connecting';
      case ConnectionState.connected:
        return 'Connected';
      case ConnectionState.reconnecting:
        return 'Reconnecting'; // Alternatively, lost connection or temporarily disconnected
      case ConnectionState.disconnecting:
        return 'Disconnecting';
      case ConnectionState.disconnected:
        return 'Disconnected';
      default:
        return String(state);
    }
  }

  initialize(callback?: Function): Observable<any> {
    if (!this.hubName) {
      throw new Error('hubUrl must be set before SignalR can be initialized');
    }
    if (!this.hubUrl) {
      throw new Error('hubName must be set before SignalR can be initialized.');
    }

    return this.buildConnection(callback);
    // return Observable.create(observer => {
    //   const { next, error, complete } = observer;
    //   this.connection = $.hubConnection();
    //   this.connection.url = this.hubUrl;
    //   this.connection.logging = !environment.production;
    //   this.connection.error(
    //     function(err) {
    //       console.error(err);
    //     }.bind(this),
    //   );
    //   this.connection.stateChanged(state => this.onConnectionStateChanged(state));
    //   this.proxy = this.connection.createHubProxy(this.hubName);
    //   this.subscribeToHubEvents(this.proxy);

    //   this.connection
    //     .start()
    //     .done(data => {
    //       console.log(`Now connected ${data.transport.name}, connection ID= ${data.id}`);
    //       if (callback) {
    //         const result: Observable<any> = callback();

    //         if (result) {
    //           result.subscribe(r => {
    //             next(r);
    //             complete();
    //           });
    //         } else {
    //           complete();
    //         }
    //       }
    //     })
    //     .fail(
    //       ((err: any) => {
    //         console.error(err);
    //         complete();
    //       }).bind(this),
    //     );
    // });
  }

  private buildConnection(callback?: Function): Observable<any> {
    return Observable.create(observer => {
      const { next, error, complete } = observer;
      this.connection = $.hubConnection();
      this.connection.url = this.hubUrl;
      this.connection.logging = !environment.production;
      this.connection.error(
        function(err) {
          console.error(err);
        }.bind(this),
      );
      this.connection.stateChanged(state => this.onConnectionStateChanged(state));
      this.proxy = this.connection.createHubProxy(this.hubName);
      this.subscribeToHubEvents(this.proxy);

      this.connection
        .start()
        .done(data => {
          console.log(`Now connected ${data.transport.name}, connection ID= ${data.id}`);
          if (callback) {
            const result: Observable<any> = callback();

            if (result) {
              result.subscribe(r => {
                next(r);
                complete();
              });
            } else {
              complete();
            }
          }
        })
        .fail(
          ((err: any) => {
            console.error(err);
            complete();
          }).bind(this),
        );
    });
  }

  private subscribeToHubEvents(proxy: any): void {}

  private onConnectionStateChanged(state: SignalRStateChange): void {}
}
