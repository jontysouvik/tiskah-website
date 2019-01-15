import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { UtilitiesService } from './services/utilities.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isProductionReady: boolean;
  constructor(private router: Router, private utilSvc: UtilitiesService) {
    this.router.events.subscribe((event: Event) => {

      if (event instanceof NavigationStart) {
        // console.log(event, 'NavigationStart');
      }

      if (event instanceof NavigationEnd) {
        // console.log(event, 'NavigationEnd');
        this.utilSvc.addRouteToHistory(event.url);
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
