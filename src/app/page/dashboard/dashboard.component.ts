import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../service/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selected = 1;
  use = 0;
  total = 1024 * 1024 * 1024;

  constructor(private commonService: CommonService) {
  }

  ngOnInit() {
    this.commonService.getDiskUsage().then((x: any) => {
      this.use = x.use;
      this.total = x.total;
      console.log(this.total);
    });
  }

}
