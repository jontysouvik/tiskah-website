import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  routeHistory: string[] = [];
  constructor() { }
  public getRouteFirendlyName(name: string) {
    if (!name) {
      return '';
    }
    while (name.indexOf('  ') > -1) {
      name = name.replace('  ', ' ');
    }
    name = this.removeSpacesFromBothEnd(name);
    while (name.indexOf(' ') > -1) {
      name = name.replace(' ', '-');
    }
    return name.toLowerCase();
  }
  public removeSpacesFromBothEnd(name: string) {
    while (name.indexOf(' ') === 0) {
      name = name.replace(' ', '');
    }
    while (name.lastIndexOf(' ') === name.length - 1) {
      name = name.substring(0, name.length - 1);
    }
    return name;
  }
  public addRouteToHistory(url: string) {
    if (this.routeHistory.length > 5) {
      this.routeHistory.splice(0, 1);
    }
    if (!url.includes('/user/auth')) {
      this.routeHistory.push(url);
    }
  }
  public getLastRoute() {
    return this.routeHistory[this.routeHistory.length - 1];
  }
  public getLastRouteAsArray() {
    const lastRoute = this.routeHistory[this.routeHistory.length - 1];
    const returnRouteArray = [];
    if (lastRoute && lastRoute.startsWith('/') && lastRoute.length === 1) {
      returnRouteArray.push('/');
    }
    if (lastRoute && lastRoute.startsWith('/') && lastRoute.length > 1) {
      const routeSegements = lastRoute.split('/');
      for (let routeIndex = 0; routeIndex < routeSegements.length; routeIndex++) {
        let segment = routeSegements[routeIndex];
        if (segment) {
          if (returnRouteArray.length === 0) {
            segment = '/' + segment;
          }
          returnRouteArray.push(segment);
        }
      }
    }
    if (!returnRouteArray.length) {
      returnRouteArray.push('/');
    }
    console.log(returnRouteArray);
    return returnRouteArray;
  }
}
