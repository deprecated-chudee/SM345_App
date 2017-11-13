import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import { Message } from '../models/message';
import { Article } from '../models/article';
import { User } from '../models/user';
import { Mentoroom } from '../models/mentoroom';

@Injectable()
export class AdminService {
  
    // private URL = 'http://localhost:8085/sm345/api/';
    private URL = 'http://220.230.112.31:8081/sm345/api/';

    constructor(private http: Http) {
    }

    userList(auth: any): Promise<any> {
        let url = this.URL + 'admin/user/' + auth;
        return this.http.post(url, null)
            .toPromise()
            .then(res => res.json() as User[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}