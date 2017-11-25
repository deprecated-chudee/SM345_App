import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MessageService {
  
    // private URL = 'http://localhost:8085/sm345/api/';
    private URL = 'http://220.230.112.31:8081/sm345/api/';

    constructor(private http: Http) {
    }

    messageList(user_id: number): Promise<any> {
        let url = this.URL + 'message/list/' + user_id;
        return this.http.get(url)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    messageRead(message_id: number): Promise<any> {
        let url = this.URL + 'message/' + message_id;
        return this.http.get(url)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }

    getUsername(u_id: number): Promise<any> {
        let url = this.URL + 'message/username/' + u_id;
        return this.http.post(url, null)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }

    createMessage(message): Promise<string> {
        let url = this.URL + 'message/create';
        return this.http.post(url, message)
            .toPromise()
            .then(res => res)
            .catch(this.handleError)
    }

    removeMessage(m_id): Promise<any> {
        let url = this.URL + 'message/'+ m_id + '/delete';
        return this.http.post(url, m_id)
            .toPromise()
            .then()
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}