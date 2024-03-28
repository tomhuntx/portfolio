import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleCardComponent } from './title-card/title-card.component';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomepageComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
