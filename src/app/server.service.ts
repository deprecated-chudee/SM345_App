import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx';
import { Message } from '../models/message';
import { Article } from '../models/article';
import { User } from '../models/user';
import { Mentoroom } from '../models/mentoroom';

@Injectable()
export class ServerService {
  
  private URL = 'http://localhost:8085/sm345/api/app/';

  private http: Http;
  static USERID: number;
  static USERAUTH: number;
  static USERNAME: string;

  constructor(http: Http) { 
    this.http = http;
  }

  makeLogin(user: User): Promise<Message> {
    let url = this.URL + 'login';
    return this.http.post(url, user)
              .toPromise()
              .then(response => 
                response.json() as Message)
              .catch(this.handleError);
  }

  updatePassword(user: User): Promise<Message>{
    let url = this.URL + 'update_password';
    return this.http.post(url, user)
              .toPromise()
              .then(response => 
                response.json() as Message)
              .catch(this.handleError);
  }

  insertMentoroom(mentoroom: Mentoroom): Promise<Message>{
    let url = this.URL + 'insert_mentoroom';
    return this.http.post(url, mentoroom)
              .toPromise()
              .then(response => 
                response.json() as Message)
              .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}