import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {FileComponent} from './file/file.component';
import {DocComponent} from './doc/doc.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {path: '', component: FileComponent},
      {path: 'doc', component: DocComponent},
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
