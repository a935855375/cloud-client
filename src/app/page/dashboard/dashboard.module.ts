import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard.routing.module';
import {DashboardComponent} from './dashboard.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {SizeFormatPipe} from '../../service/size-format.pipe';
import {DateFormatPipe} from '../../service/date-format.pipe';
import {DocComponent} from './doc/doc.component';
import {FileComponent} from './file/file.component';
import {AllFileModule} from './all-file/all-file.module';
import {UtilModule} from '../../service/util.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    AllFileModule,
    UtilModule
  ],
  declarations: [
    DashboardComponent,
    DocComponent,
    FileComponent,
  ],
})
export class DashboardModule {
}
