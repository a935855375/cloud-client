import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllFileComponent} from './all-file.component';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AllFileRoutingModule} from './all-file.routing.module';
import {DateFormatPipe} from '../../../service/date-format.pipe';
import {SizeFormatPipe} from '../../../service/size-format.pipe';
import {DashboardModule} from '../dashboard.module';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    AllFileRoutingModule,
    DashboardModule
  ],
  declarations: [
    AllFileComponent,
  ]
})
export class AllFileModule {
}
