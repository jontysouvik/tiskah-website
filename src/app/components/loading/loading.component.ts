import { Component, OnInit } from '@angular/core';
import { DelayService } from '../../services/delay.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  showLoading = true;
  constructor(private delaySvc: DelayService) { }

  ngOnInit() {
    this.delaySvc.delay(5000).then(() => {
      this.showLoading = false;
    });
  }

}
