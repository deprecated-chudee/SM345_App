import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import { Message } from '../models/message';
import { Article } from '../models/article';
import { User } from '../models/user';
import { Mentoroom } from '../models/mentoroom';
import { MentoRoomInfo } from '../models/mentoRoomInfo';

@Injectable()
export class ServerService {
  
    //private URL = 'http://localhost:8086/sm345/api/';
    private URL = 'http://220.230.112.31:8081/sm345/api/';

    static USERID: number;
    static USERAUTH: number;
    static USERNAME: string;

    constructor(private http: Http) { 
        console.log(ServerService.USERID)
        console.log(ServerService.USERAUTH)
        console.log(ServerService.USERNAME)
    }

    makeLogin(user: User): Promise<Message> {
        let url = this.URL + 'login';
        return this.http.post(url, user)
            .toPromise()
            .then(response => response.json() as Message)
            .catch(this.handleError);
    }

    getLoginrecord(user_id: number): Promise<Message> {
        let url = this.URL + 'login_record/' + user_id;
        return this.http.get(url)
              .toPromise()
              .then(response => response.json() as Message)
              .catch(this.handleError);
    }

    updatePassword(user: User): Promise<Message>{
        let url = this.URL + 'updatepassword';
        return this.http.post(url, user)
            .toPromise()
            .then(response => response.json() as Message)
            .catch(this.handleError);
    }

    createMentoroom(mentoroom: Mentoroom): Promise<Message>{
        let url = this.URL + 'mentoroom/create';
        return this.http.post(url, mentoroom)
            .toPromise()
            .then(response => response.json() as Message)
            .catch(this.handleError);
    }

    getMentoroomListByYear(year: number): Promise<Mentoroom[]> {
        let url = this.URL + 'mentoroom/' + year + '/1';
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Mentoroom[])
            .catch(this.handleError);
    }

    getMentoroomList(): Promise<Mentoroom[]> {
      let url = this.URL + 'mentoroom'
      return this.http.get(url)
          .toPromise()
          .then(response => response.json() as Mentoroom[])
          .catch(this.handleError);
    }

    getList(board_id: number): Promise<Article[]> {
        let url = this.URL + 'list/' + board_id;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Article[])
            .catch(this.handleError);
    }

    getArticle(board_id: number, id: number): Promise<Article> {
        let url = this.URL + 'list/' + board_id + '/' + id;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Article)
            .catch(this.handleError);
    }

    creatArticle(article: Article){
        let url = this.URL + 'list/' + article.board_id + '/create';
        return this.http.post(url, article)
            .toPromise()
            .catch(this.handleError);
    }

    deleteArticle(id: number, board_id: number){
      let url = this.URL + 'list/' + board_id + '/' + id + '/delete';
      return this.http.get(url)
                .toPromise()
                .catch(this.handleError);
   }
/*
   createComment(comment: Comment){
    let url = this.URL + 'mentoroom/3/' + comment.article_id + '/comment/create';
    return this.http.post(url, comment)
        .toPromise()
        .catch(this.handleError);
  }
  */

    getMentoroom(mentoroom_id: number): Promise<Mentoroom> {
        let url = this.URL + 'mentoroom/' + mentoroom_id;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Mentoroom)
            .catch(this.handleError);
    }

    confirmMentoroom(mentoroom: Mentoroom){
        let url = this.URL + 'mentoroom/' + mentoroom.mentoroom_id + '/confirm';
        return this.http.post(url, mentoroom)
            .toPromise()
            .catch(this.handleError);
    }

    rejectMentoroom(mentoroom_id: number){
        let url = this.URL + 'mentoroom/' + mentoroom_id + '/reject';
        return this.http.get(url)
            .toPromise()
            .catch(this.handleError);
    }

    updateEmpowerUser(user_id: number){
      let url = this.URL + 'admin/empower/' + user_id;
      return this.http.get(url)
          .toPromise()
          .catch(this.handleError);
    }

    updateLeaveUser(user_id: number){
    let url = this.URL + 'admin/leave/' + user_id;
    return this.http.get(url)
        .toPromise()
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    //멘토방설정 저장
    createMentoRoomInfo(mentoRoomInfo: MentoRoomInfo): Promise<any>{
        let url = this.URL + 'admin/room_info/edit';
        return this.http.post(url, mentoRoomInfo)
            .toPromise()
            .then()
            .catch(this.handleError);
    }

    //멘토방 설정 불러오기
    getMentoRoomInfo(): Promise<any> {
        let url = this.URL + 'admin/room_info';
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as MentoRoomInfo)
            .catch(this.handleError);
    }
}