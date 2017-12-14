import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user';

@Injectable()
export class LoginService {
    //private URL = 'http://localhost:8086/sm345/api/';
    private URL = 'http://220.230.112.31:8081/sm345/api/';

    constructor(private http: Http) { 
    }

    // 로그인
    makeLogin(user: User): Promise<User> {
        let url = this.URL + 'login';
        return this.http.post(url, user)
            .toPromise()
            .then(response => response.json() as User)
            .catch(this.handleError);
    }

    // 로그인 레코드 가져오기
    getLoginrecord(user: User): Promise<User> {
        let url = this.URL + 'login_record/';
        return this.http.post(url, user)
            .toPromise()
            .then(response => response.json() as User)
            .catch(this.handleError);
    }

    // 비밀번호 변경
    updatePassword(user: User): Promise<User>{
        let url = this.URL + 'updatepassword';
        return this.http.post(url, user)
            .toPromise()
            .then(response => response.json() as User)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}