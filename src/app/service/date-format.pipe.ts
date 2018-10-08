import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';

@Pipe({name: 'format'})
export class DateFormatPipe implements PipeTransform {

  transform(value: any): string {
    const last = moment(value);
    const now = moment();
    if (last.year() == now.year()) {
      if (last.month() == now.month()) {
        if (last.date() == now.date()) {
          return '今天 ' + last.format('HH:mm');
        } else if (last.date() == (now.date() - 1)) {
          return '昨天 ' + last.format('HH:mm');
        }
      }
      return last.format('MM月DD日 HH:mm');
    }
    return last.format('y年MM月DD日');
  }

}
