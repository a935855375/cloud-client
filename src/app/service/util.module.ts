import {NgModule} from '@angular/core';
import {SizeFormatPipe} from './size-format.pipe';
import {DateFormatPipe} from './date-format.pipe';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    DateFormatPipe,
    SizeFormatPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DateFormatPipe,
    SizeFormatPipe
  ]
})
export class UtilModule {

}
