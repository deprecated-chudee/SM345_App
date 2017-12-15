import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MessageService {
  
    // private URL = 'http://localhost:8085/sm345/api/';
    private URL = 'http://220.230.112.31:8081/sm345/api/';

    constructor(private http: Http) {
    }

    // 쪽지 목록 가져오기
    messageList(user_id: number): Promise<any> {
        let url = this.URL + 'message/list/' + user_id;
        return this.http.get(url)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    // 사용자 이름 가져오기
    getUsername(u_id: number): Promise<string> {
        let url = this.URL + 'message/username/' + u_id;
        return this.http.get(url)
            .toPromise()
            .then(res => res.text())
            .catch(this.handleError)
    }

    // 쪽지 보내기
    createMessage(message) {
        let url = this.URL + 'message/create';
        return this.http.post(url, message)
            .toPromise()
            .catch(this.handleError)
    }

    // 쪽지 삭제
    removeMessage(m_id) {
        let url = this.URL + 'message/'+ m_id + '/delete';
        return this.http.get(url)
            .toPromise()
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}