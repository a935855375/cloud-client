import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../service/common.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selected = 1;
  use = 0;
  total = 1024 * 1024 * 1024;

  constructor(private commonService: CommonService,
              private router: Router) {
  }

  ngOnInit() {
    this.commonService.getDiskUsage().then((x: any) => {
      this.use = x.use;
      this.total = x.total;
    });
  }

  select(idx) {
    this.selected = idx;
    switch (idx) {
      case 1:
        this.router.navigate(['/disk']);
        break;
      case 2:
        this.router.navigate(['/disk/doc']);
        break;
      case 3:
        this.router.navigate(['/disk/pic']);
        break;
      case 4:
        this.router.navigate(['/disk/video']);
        break;
      case 5:
        this.router.navigate(['/disk/audio']);
        break;
    }
  }
}
