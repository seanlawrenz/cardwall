import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// App Level Components
import { AppComponent } from './app.component';

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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RootStoreModule,
    DirectiveModule,
    SharedModule,
    TDXAgilePipesModule.forRoot(),
    StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer }),
    StoreDevtoolsModule.instrument({ maxAge: 50 }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
