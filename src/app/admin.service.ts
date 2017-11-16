import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User } from '../models/user';

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

    removeRoom(m_id): Promise<any> {
        let url = this.URL + 'mentoroom/' + m_id + '/reject';
        return this.http.get(url, null)
            .toPromise()
            .then()
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}