import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';


const routes: Routes = [
  {path: 'disk', loadChildren: './page/dashboard/dashboard.module#DashboardModule'},
  {path: '', redirectTo: 'disk', pathMatch: 'full'}
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
