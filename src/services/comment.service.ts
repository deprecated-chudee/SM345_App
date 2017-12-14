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

    // 댓글 목록 가져오기
    commentList(article_id: number): Promise<Comment[]> {
        let url = this.URL + 'comment/list/' + article_id;
        return this.http.get(url)
            .toPromise()
            .then(res => res.json() as Comment[])
            .catch(this.handleError)
    }

    // 댓글 생성
    commentCreate(comment: Comment) {
        let url = this.URL + 'comment/create';
        return this.http.post(url, comment)
            .toPromise()
            .catch(this.handleError)
    }

    // 댓글 삭제
    commentDelete(comment_id: number) {
        let url = this.URL + 'comment/delete/' + comment_id;
        return this.http.get(url)
            .toPromise()
            .catch(this.handleError)
    }

    // 댓글 수 조회
    commentCount(comment_id: number): Promise<number> {
        let url = this.URL + 'CntComment/' + comment_id;
        return this.http.get(url)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }

    // 댓글 수정
    commentEdit(comment: Comment) {
        let url = this.URL + 'comment/edit';
        return this.http.post(url, comment)
            .toPromise()
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}