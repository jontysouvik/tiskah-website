import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isProductionReady: boolean;
  constructor(private router: Router) {
    if (environment.production) {
      this.isProductionReady = false;
    } else {
      this.isProductionReady = true;
    }
    this.router.events.subscribe( (event: Event) => {

      if (event instanceof NavigationStart) {
          console.log(event, 'NavigationStart');
      }

      if (event instanceof NavigationEnd) {
        console.log(event, 'NavigationEnd');
      }

      // if (event instanceof NavigationError) {
      //     // Hide loading indicator
      //     // Present error to user
      //     console.log(event.error);
      // }
  });
  }
  title = 'tiskah-website';
}
