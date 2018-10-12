import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard.routing.module';
import {DashboardComponent} from './dashboard.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {DocComponent} from './doc/doc.component';
import {FileComponent} from './file/file.component';
import {AllFileModule} from './all-file/all-file.module';
import {UtilModule} from '../../service/util.module';
import {PicComponent} from './pic/pic.component';
import {VideoComponent} from './video/video.component';
import {AudioComponent} from './audio/audio.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    NgZorroAntdModule,
    AllFileModule,
    UtilModule
  ],
  declarations: [
    DashboardComponent,
    FileComponent,
    DocComponent,
    PicComponent,
    VideoComponent,
    AudioComponent
  ],
})
export class DashboardModule {
}
