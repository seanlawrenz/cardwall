import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// App Level Components
import { AppComponent } from './app.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationComponent } from './notifications/notification/notification.component';

// Modules
import { DirectiveModule } from './shared/directives';
import { SharedModule } from './shared/shared.module';
import { TDXAgilePipesModule } from './shared/pipes';

// Routing
import { AppRoutingModule } from './app.router';
import { CustomSerializer } from './store/utils/custom-route-serializer';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

// ngrx Store
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RootStoreModule } from './store';

// 3rd Party
import { SortablejsModule } from 'angular-sortablejs';

@NgModule({
  declarations: [AppComponent, NotificationsComponent, NotificationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RootStoreModule,
    DirectiveModule,
    SharedModule,
    SortablejsModule,
    StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer }),
    StoreDevtoolsModule.instrument({ maxAge: 50 }),
    TDXAgilePipesModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
