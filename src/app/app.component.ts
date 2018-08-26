import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isProductionReady: boolean;
  constructor() {
    if (environment.production) {
      this.isProductionReady = false;
    } else {
      this.isProductionReady = true;
    }
  }
  title = 'tiskah-website';
}
