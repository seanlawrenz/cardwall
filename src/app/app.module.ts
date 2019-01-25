import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// App Level Components
import { AppComponent } from './app.component';

// Routing
import { AppRoutingModule } from './app.router';
import { CustomSerializer } from './store/utils/custom-route-serializer';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

// ngrx Store
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RootStoreModule } from './store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RootStoreModule,
    StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer }),
    StoreDevtoolsModule.instrument({ maxAge: 50 }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
