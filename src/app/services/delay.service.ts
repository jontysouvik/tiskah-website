import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DelayService {

  constructor() { }
  delay(milisec?: number) {
    return new Promise<any>((resolve, reject) => {
        const delay = milisec ? milisec : 1000;
        setTimeout( () => {
            resolve(true);
        }, delay);
    });
}
}
