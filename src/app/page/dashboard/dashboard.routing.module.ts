import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {path: 'all-file', loadChildren: './all-file/all-file.module#AllFileModule'},
      {path: '', redirectTo: 'all-file', pathMatch: 'full'}
    ]
  }
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
