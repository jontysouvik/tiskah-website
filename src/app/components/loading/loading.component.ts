import { Component, OnInit } from '@angular/core';
import { DelayService } from '../../services/delay.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  showLoading = false;
  message: string;
  constructor(private delaySvc: DelayService, private loaderSvc: LoaderService) { 
    this.loaderSvc.showLoadingEventEmmiter.subscribe((res, message) => {
      this.showLoading = res;
    });
  }

  ngOnInit() {
  }

}
