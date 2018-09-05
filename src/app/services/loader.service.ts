import { Injectable, EventEmitter } from '@angular/core';
import { DelayService } from './delay.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public showLoading: Observable<boolean>;
  public showLoadingEventEmmiter: EventEmitter<boolean>
  constructor(private delaySvc: DelayService) {
    this.showLoadingEventEmmiter = new EventEmitter();
    // this.delaySvc.delay(5000).then(() => {
    //   // console.log('Loader off');
    //   // this.showLoading. = false;
    //   this.showLoadingEventEmmiter.emit(false);
    //   this.delaySvc.delay(5000).then(() => {
    //     console.log('Loader off 2');
    //     // this.showLoading. = false;
    //     this.showLoadingEventEmmiter.emit(true);
    //     this.delaySvc.delay(5000).then(() => {
    //       console.log('Loader off 3');
    //       // this.showLoading. = false;
    //       this.showLoadingEventEmmiter.emit(false);
    //     });
    //   });
    // });
  }
}
