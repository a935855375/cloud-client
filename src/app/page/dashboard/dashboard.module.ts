import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard.routing.module';
import {DashboardComponent} from './dashboard.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgZorroAntdModule,
    FormsModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule {
}
