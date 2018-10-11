import {Pipe, PipeTransform} from '@angular/core';
import {isInteger} from 'ng-zorro-antd';

@Pipe({name: 'size'})
export class SizeFormatPipe implements PipeTransform {
  transform(value: any): string {
    let unit = 'B';
    if(value >= 1024) {
      value = value / 1024;
      unit = 'KB'
    }
    if(value >= 1024) {
      value = value / 1024;
      unit = 'MB'
    }
    if(value >= 1024) {
      value = value / 1024;
      unit = 'GB'
    }
    if(value >= 1024) {
      value = value / 1024;
      unit = 'TB'
    }
    if(!isInteger(value))
      value = value.toFixed(2);
    return value + ' ' + unit;
  }

}
