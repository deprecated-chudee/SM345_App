import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Comment } from '../models/comment';

@Injectable()
export class CommentService {
  
    // private URL = 'http://localhost:8085/sm345/api/';
    private URL = 'http://220.230.112.31:8081/sm345/api/';

    constructor(private http: Http) {
    }

    commentList(article_id: number): Promise<Comment[]> {
        let url = this.URL + 'list/' + article_id + '/comment';
        return this.http.get(url)
            .toPromise()
            .then(res => res.json() as Comment[])
            .catch(this.handleError)
    }

    commentCreate(comment: Comment): Promise<any> {
        let url = this.URL + 'list/0/0/comment/create';
        return this.http.post(url, comment)
            .toPromise()
            .then()
            .catch(this.handleError)
    }

    // commentRemove(): Promise<any> {
    // }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}