import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Article } from '../models/article';

@Injectable()
export class ArticleService {
  
    //private URL = 'http://localhost:8086/sm345/api/';
    private URL = 'http://220.230.112.31:8081/sm345/api/';

    constructor(private http: Http) { 
    }
 
    // 게시글 목록 가져오기
    getArticleList(board_id: number): Promise<Article[]> {
        let url = this.URL + 'article/list/' + board_id;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Article[])
            .catch(this.handleError);
    }

    // 게시글 정보 가져오기
    getArticle(article_id: number, user_id: number): Promise<Article> {
        let url = this.URL + 'article/list/' + article_id + '/' + user_id ;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Article)
            .catch(this.handleError);
    }

    // 게시글 생성
    creatArticle(article: Article) {
        let url = this.URL + 'article/create';
        return this.http.post(url, article)
            .toPromise()
            .catch(this.handleError);
    }

    // 게시글 삭제
    deleteArticle(article_id: number){
        let url = this.URL + 'article/' + article_id + '/delete';
        return this.http.get(url)
            .toPromise()
            .catch(this.handleError);
   }

    // 게시글 수정
    editArticle(article: Article): Promise<string>{
        let url = this.URL + 'article/edit';
        return this.http.post(url, article)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}