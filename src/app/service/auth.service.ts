import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../entity/User';
import * as moment from 'moment';
import {Subject} from 'rxjs';

@Injectable()
export class AuthService {
  private isLogin;
  apiUrl = environment.apiUrl;
  loginSubject = new Subject<Boolean>();

  constructor(private http: HttpClient) {
    this.isLogin = localStorage.getItem('id_token') !== undefined;
  }

  getLoginSubject() {
    return this.loginSubject;
  }


  login(username: string, password: string) {
    const url = this.apiUrl + 'login';
    const user = new User();
    user.username = username;
    user.password = password;

    return this.http.post(url, user).toPromise().then(res => {
      this.setSession(res);
      return res as any;
    });
  }

  private setSession(authResult) {
    if (authResult.status === 0) {
      const expiresAt = moment().add(authResult.expiresIn, 'second');
      localStorage.setItem('id_token', authResult.id_token);
      localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
      this.isLogin = true;
      this.loginSubject.next(true);
    }
  }

  logout() {
    this.isLogin = false;
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.loginSubject.next(false);
  }

  public isLoggedIn() {
    return this.isLogin && moment().isBefore(this.getExpiration());
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }


}
