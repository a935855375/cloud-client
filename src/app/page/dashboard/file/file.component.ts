import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-file-all',
  template: `
    <app-all-file [type]="'all'"></app-all-file>
  `
})
export class FileComponent implements OnInit{
  ngOnInit(): void {
  }

}
