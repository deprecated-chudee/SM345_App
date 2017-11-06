import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx';
import { Message } from '../models/message';
import { Article } from '../models/article';
import { User } from '../models/user';

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
/*
  getList(id: number, sp:number, st:string): Promise<Nutee_article[]> {
    let url = this.URL + 'list/' + id+ '/' + sp + '/' + st;
    return this.http.get(url)
              .toPromise()
              .then(response => response.json() as Nutee_article[])
              .catch(this.handleError);
  }
  */

  updatePassword(user: User): Promise<Message>{
    let url = this.URL + 'update_password';
    return this.http.post(url, user)
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