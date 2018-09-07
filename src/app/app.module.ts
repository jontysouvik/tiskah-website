import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { LoadingComponent } from './components/loading/loading.component';
import { HttpClientModule } from '@angular/common/http';
const config = {
  apiKey: 'AIzaSyBLmxKJs6pTHLQ4I-XnCWpDU9l7IW2-PU0',
  authDomain: 'tiskah-website.firebaseapp.com',
  databaseURL: 'https://tiskah-website.firebaseio.com',
  projectId: 'tiskah-website',
  storageBucket: 'tiskah-website.appspot.com',
  messagingSenderId: '582975799486'
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    PlaceholderComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
