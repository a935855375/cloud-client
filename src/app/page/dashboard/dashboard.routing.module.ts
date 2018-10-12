import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {FileComponent} from './file/file.component';
import {DocComponent} from './doc/doc.component';
import {PicComponent} from './pic/pic.component';
import {VideoComponent} from './video/video.component';
import {AudioComponent} from './audio/audio.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {path: '', component: FileComponent},
      {path: 'doc', component: DocComponent},
      {path: 'pic', component: PicComponent},
      {path: 'video', component: VideoComponent},
      {path: 'audio', component: AudioComponent},
      {path: '', redirectTo: '', pathMatch: 'full',}
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule {
}
