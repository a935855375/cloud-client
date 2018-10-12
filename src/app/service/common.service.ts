import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {saveAs as importedSaveAs} from 'file-saver';

@Injectable()
export class CommonService {
  disk;

  constructor(private http: HttpClient) {
  }

  getRootDir() {
    const url = environment.apiUrl + 'dirs';
    return this.http.get(url).toPromise();
  }

  download(md5, filename) {
    const params = new HttpParams().set('md5', md5).append('file', filename);
    const url = environment.apiUrl + 'download';
    this.http.get(url, {params: params, observe: 'response', responseType: 'blob', reportProgress: true})
      .subscribe(x => importedSaveAs(x.body, filename));
  }

  rename(path, uuid, filename) {
    const params = new HttpParams().set('path', path)
      .append('uuid', uuid)
      .append('filename', filename);

    const url = environment.apiUrl + 'rename';

    return this.http.get(url, {params: params}).toPromise();
  }

  newFolder(path, filename) {
    const params = new HttpParams().set('path', path).append('name', filename);

    const url = environment.apiUrl + 'newFolder';

    return this.http.get(url, {params: params}).toPromise();
  }

  deleteFile(path, uuid) {
    const params = new HttpParams().set('path', path).append('uuid', uuid);

    const url = environment.apiUrl + 'delete';

    return this.http.get(url, {params: params}).toPromise();
  }

  moveFile(source, uuid, to) {
    const params = new HttpParams().set('from', source)
      .append('to', to)
      .append('uuid', uuid);

    const url = environment.apiUrl + 'move';

    return this.http.get(url, {params: params}).toPromise();
  }

  getClassifiedFile(type) {
    const params = new HttpParams().set('type', type);

    const url = environment.apiUrl + 'file';

    return this.http.get(url, {params: params}).toPromise();
  }

  getDiskUsage() {
    const url = environment.apiUrl + 'diskUsage';

    return this.http.get(url).toPromise();
  }
}
