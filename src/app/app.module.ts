import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// App Level Components
import { AppComponent } from './app.component';

// Routing
import { AppRoutingModule } from './app.router';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
