import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard.routing.module';
import {DashboardComponent} from './dashboard.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {SizeFormatPipe} from '../../service/size-format.pipe';
import {DateFormatPipe} from '../../service/date-format.pipe';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgZorroAntdModule,
    FormsModule
  ],
  declarations: [
    DashboardComponent,
    DateFormatPipe,
    SizeFormatPipe
  ],
  exports: [
    DateFormatPipe,
    SizeFormatPipe
  ]
})
export class DashboardModule {
}
