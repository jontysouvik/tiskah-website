import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

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
}
