import { Injectable, EventEmitter } from '@angular/core';
import { Observable, from, of, observable } from 'rxjs';
import { ConfigService } from './config.service';
import { NotificationService } from './notification.service';
import { ConnectionState, Notification } from '@app/models';
import { environment } from '../../environments/environment.prod';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  connectionChanged = new EventEmitter<number>();
  afterEventPublished = new EventEmitter<string>();

  private connection: HubConnection;
  private proxy: HubProxy;
  private lastNotification: Notification;
  private hasBeenConnected = false;

  hubUrl: string;
  hubName = 'CardWallHub';

  connectionState: number = ConnectionState.disconnected;

  constructor(configService: ConfigService, private notifyService: NotificationService, private spinnerService: SpinnerService) {
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

  initialize(callback?: Function) {
    // Validate our inputs
    if (!this.hubName) {
      throw new Error('hubUrl must be set before SignalR can be initialized.');
    }
    if (!this.hubUrl) {
      throw new Error('hubName must be set before SignalR can be initialized.');
    }

    return this.buildConnectObservable(callback);
  }

  invoke(method: string, ...params: any[]): Observable<any> {
    if (this.connectionState !== ConnectionState.disconnected) {
      const pInvoke: any = this.proxy.invoke(method, ...params);
      return from(pInvoke);
    } else {
      return this.initialize(() => this.performInvoke(method, ...params));
    }
  }

  private performInvoke(method: string, ...params: any[]): Observable<any> {
    const pInvoke: any = this.proxy.invoke(method, ...params);
    return from(pInvoke);
  }

  private buildConnectObservable(callback?: Function): Observable<any> {
    const signalRInit$ = new Observable(observer => {
      // observable execution
      this.connection = $.hubConnection();
      this.connection.url = this.hubUrl;
      this.connection.logging = !environment.production;
      this.connection.error(
        function(err) {
          console.error('SignalR Error Encountered', err);
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
            const result = callback();
            if (result) {
              result.subscribe(res => {
                observer.next(res);
                observer.complete();
              });
            } else {
              observer.next(this.connectionState);
              observer.complete();
            }
          } else {
            observer.next(this.connectionState);
            observer.complete();
          }
        })
        .fail(
          (err => {
            console.error(`Could not connect ${err}`);
            observer.complete();
          }).bind(this),
        );
    });

    // signalRInit$.subscribe(data => console.log(data));
    return signalRInit$;
  }

  private subscribeToHubEvents(proxy: any): void {
    // New Card Created
    // proxy.on('CardCreateReceive', (info: CardOperationInfo): void => {
    //   this.cardCreated.emit(info);
    //   this.afterEventPublished.emit('cardCreated');
    // });
    // Card Updated
    // proxy.on('CardUpdateReceive', (card: Card): void => {
    //   this.cardUpdated.emit(card);
    //   this.afterEventPublished.emit('cardUpdated');
    // });
    // Card Published
    // proxy.on('CardPublishReceive', (card: Card): void => {
    //   this.cardPublished.emit(card);
    //   this.afterEventPublished.emit('cardPublished');
    // });
    // CardReorderReceive
    // proxy.on('CardReorderReceive', reorder => {
    //   this.cardReordered.emit(reorder);
    //   this.afterEventPublished.emit('cardReordered');
    // });
    // CardDeleteReceive
    // proxy.on('CardDeleteReceive', card => {
    //   this.cardDeleted.emit(card);
    //   this.afterEventPublished.emit('cardDeleted');
    // });
    // ListUpdateReceive
    // proxy.on('ListUpdateReceive', list => {
    //   this.listUpdated.emit(list);
    //   this.afterEventPublished.emit('listUpdated');
    // });
    // ListCreateReceive
    // proxy.on('ListCreateReceive', list => {
    //   this.listCreated.emit(list);
    //   this.afterEventPublished.emit('afterEventPublished');
    // });
    // ListReorderReceive
    // proxy.on('ListReorderReceive', reorder => {
    //   this.listReordered.emit(reorder);
    //   this.afterEventPublished.emit('listReordered');
    // });
    // Notification Received
    // proxy.on('NotificationReceive', BrowserNotification => {
    //   this.notificationReceived.emit(BrowserNotification);
    //   this.afterEventPublished.emit('notificationReceived');
    // });
  }

  private onConnectionStateChanged(state: SignalRStateChange): void {
    this.connectionChanged.emit(this.connectionState);
    this.connectionState = state.newState;

    const oldName: string = SignalRService.getConnectionStateName(state.oldState);
    const newName: string = SignalRService.getConnectionStateName(state.newState);
    console.log(`Connection state changed from ${oldName} to ${newName}`);

    if (this.lastNotification) {
      this.notifyService.remove(this.lastNotification);
      this.lastNotification = null;
    }

    /* tslint:disable:max-line-length */
    switch (state.newState) {
      case ConnectionState.reconnecting:
        this.spinnerService.showSpinner();
        this.lastNotification = this.notifyService.warning(
          newName,
          `You have temporarily lost connection to TeamDynamix and will not be able to carry out actions or receive updates until the connection is restored. Check your internet connection.`,
        );
        break;

      case ConnectionState.disconnected:
        this.spinnerService.showSpinner();
        this.lastNotification = this.notifyService.danger(
          newName,
          `The application has lost connection to TeamDynamix for an extended period of time and will not be able to carry out actions or receive updates until the connection is restored and the page is refreshed.`,
        );
        break;

      case ConnectionState.connected:
        this.spinnerService.hideSpinner();
        if (this.hasBeenConnected) {
          this.lastNotification = this.notifyService.success(newName, 'Your connection has been restored.', 5);
        } else {
          this.hasBeenConnected = true;
        }
        break;
    }
  }
}
