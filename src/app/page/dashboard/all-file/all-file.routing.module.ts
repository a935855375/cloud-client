import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AllFileComponent} from './all-file.component';

const routes: Routes = [
  {path: '', component: AllFileComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AllFileRoutingModule {

}
