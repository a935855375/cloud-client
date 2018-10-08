import {Component, OnInit, Renderer2} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpEventType, HttpRequest} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {CommonService} from '../../../service/common.service';
import * as SparkMD5 from 'spark-md5';
import * as moment from 'moment';

@Component({
  selector: 'app-all-file',
  templateUrl: './all-file.component.html',
  styleUrls: ['./all-file.component.scss']
})
export class AllFileComponent implements OnInit {
  selectAll = false;
  fileList = [];
  selectedList = [];

  curDir = [];

  constructor(private httpClient: HttpClient,
              private message: NzMessageService,
              private commonService: CommonService,
              private renderer: Renderer2) {

  }

  handler = (item) => {
    const ob = new Observable(x => {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(item.file as File);

      fileReader.onload = (evt) => {
        if (evt.target.readyState == FileReader.DONE) {
          const bin = evt.target.result;

          const md5 = new SparkMD5();

          md5.appendBinary(bin);

          const md5_value = md5.end();

          const formData = new FormData();
          formData.append('file', item.file);
          formData.append('md5', md5_value);
          formData.append('size', item.file.size);
          formData.append('path', this.getCurDirUUID());

          const request = new HttpRequest('POST', item.action, formData, {reportProgress: true});

          this.httpClient.request(request)
            .subscribe((event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                item.onProgress(event.loaded / event.total);
              }
              if (event.type === HttpEventType.Response) {
                item.onSuccess(event.body);
                x.next(event.body);
              }
            }, err => {
              item.onError(err);
              x.error(err);
            });
        }
      };
    });

    return ob.subscribe((x: any) => {
      const idx = this.curDir.length - 1;
      this.curDir[idx].files.push(x.file);
      this.fileList = this.sortFiles(this.curDir[idx].files);
      this.message.success('上传成功');
    }, () => {
      this.message.error('上传失败');
    });
  };


  ngOnInit(): void {
    this.commonService.getRootDir().then((x: any) => {
      this.fileList = this.sortFiles(x.files);
      this.curDir.push(x);
      console.log(this.curDir);
    });
  }

  changeStatus(x) {
    if (this.selectedList.length > 1) {
      this.selectedList.forEach(z => {
        if (z != x)
          z.selected = false;
      });
    }
    if (!x.selected)
      x.selected = true;

    if (x.selected) {
      this.selectedList.forEach(z => {
        if (z != x)
          z.selected = false;
      });
      this.selectedList = [x];
    }
  }

  changeButton(e, x) {
    x.selected = e;

    if (x.selected) {
      this.selectedList.push(x);
    } else {
      const index = this.selectedList.indexOf(x);
      this.selectedList.splice(index, 1);
    }
  }

  changeAll(e) {
    if (e) {
      this.selectedList = this.fileList;
      this.selectedList.forEach(x => x.selected = true);
    } else {
      this.selectedList.forEach(x => x.selected = false);
      this.selectedList = [];
    }
  }

  download() {
    this.selectedList.forEach(x => {
      if (!x.isFolder)
        this.commonService.download(x.md5, x.name);
    });
  }

  getFileSVGImg(file) {
    let svg = '';
    if (file.isFold)
      svg = 'icon-file-m.svg';
    else {
      switch (file.type) {
        case 'zip':
          svg = 'icon-zip-m.svg';
          break;
        case 'txt':
          svg = 'icon-txt-m.svg';
          break;
        case 'doc':
          svg = 'icon-doc-m.svg';
          break;
        case 'pic':
          svg = 'icon-pic-m.svg';
          break;
        case 'video':
          svg = 'icon-video-m.svg';
          break;
        case 'audio':
          svg = 'icon-audio-m.svg';
          break;
        case 'pdf':
          svg = 'icon-pdf-m.svg';
          break;
        case 'apk':
          svg = 'icon-apk-m.svg';
          break;
        case 'code':
          svg = 'icon-code-m.svg';
          break;
        default:
          svg = 'icon-nor-m.svg';
          break;
      }
    }
    return 'url(assets/img/' + svg + ')';
  }

  select(tag, value) {
    tag.selectionStart = 0;
    const t = value.lastIndexOf('.');
    if (t != -1)
      tag.selectionEnd = t;
    else
      tag.selectionEnd = value.length;
  }

  rename() {
    if (this.selectedList.length == 1) {
      this.selectedList[0].rename = this.selectedList[0].name;
      this.selectedList[0].edit = true;
      const index = this.fileList.findIndex(x => x == this.selectedList[0]);
      let onElement = this.renderer.selectRootElement('#input' + index);
      setTimeout(() => onElement.focus(), 0);
    }
  };

  fixRename(file) {
    if (!file.newFolder) {
      if (file.name != file.rename) {
        this.commonService.rename(this.getCurDirUUID(), file.uuid, file.rename).then((x: any) => {
          if (x.status) {
            this.message.success(x.message);
            file.name = file.rename;
          } else {
            this.message.error(x.message);
          }
          file.edit = false;
        });
      } else {
        file.edit = false;
      }
    } else {
      this.commonService.newFolder(this.getCurDirUUID(), file.rename).then((x: any) => {
        if (x.status) {
          file.name = file.rename;
          const idx = this.curDir.length - 1;
          this.curDir[idx].files.push(x.file);
          this.fileList = this.sortFiles(this.curDir[idx].files);
          this.message.success(x.message);
        } else {
          this.message.error(x.message);
        }
        file.edit = false;
      });
    }
  }

  newFolder() {
    const date = moment().format('YYYY-MM-DD HH:mm:ss').toString();

    const temp = {
      date: date,
      isFold: true,
      files: null,
      name: '新建文件夹',
      rename: '新建文件夹',
      size: 0,
      edit: true,
      newFolder: true,
    };

    this.fileList = [temp, ...this.fileList];

    setTimeout(() => {
      let onElement = this.renderer.selectRootElement('#input0');
      onElement.focus();
    }, 0);
  }

  deleteFile() {
    if (this.selectedList.length > 0) {
      const uuid = this.selectedList.map(x => x.uuid);
      this.commonService.deleteFile(this.getCurDirUUID(), uuid).then((x: any) => {
        if (x.status) {
          const idx = this.curDir.length - 1;
          this.selectedList.forEach(x => {
            const index = this.curDir[idx].files.indexOf(x);
            this.curDir[idx].files.splice(index, 1);
          });
          this.fileList = this.sortFiles(this.curDir[idx].files);
          this.message.success('删除文件成功');
        } else {
          this.message.error('删除文件失败');
        }
      });
    }
  }

  enter(file) {
    if (file.isFold) {
      this.curDir.push(file);
      this.selectedList.forEach(x => {
        x.selected = false;
        x.edit = false;
      });
      this.selectedList = [];
      this.fileList = this.sortFiles(file.files);
    }
  }

  clickBread(file, status) {
    if (!status) {
      const idx = this.curDir.findIndex(x => x.uuid == file.uuid);
      this.curDir = this.curDir.filter((v, index) => index <= idx);
      this.selectedList.forEach(x => x.selected = false);
      this.selectedList = [];
      this.fileList = this.sortFiles(this.curDir[idx].files);
    }
  }

  sortFiles(files) {
    return files.sort((a, b) => {
      if (a.isFold && !b.isFold)
        return -1;
      else if (!a.isFold && b.isFold)
        return 1;
      else
        return 0;
    });
  }

  getCurDirUUID() {
    return this.curDir.map(x => x.uuid).toString();
  }
}
