import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
const config = {
  apiKey: 'AIzaSyDsM5D-igywBeKby4nCi8nnOJ2Sh4BULTs',
  authDomain: 'tiskahinventory.firebaseapp.com',
  databaseURL: 'https://tiskahinventory.firebaseio.com',
  projectId: 'tiskahinventory',
  storageBucket: 'tiskahinventory.appspot.com',
  messagingSenderId: '21765455320'
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
