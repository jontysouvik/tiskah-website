import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }
  public getTimeString() {
    const date = new Date();
    const time = date.getTime().toString();
    return time;
  }
}
