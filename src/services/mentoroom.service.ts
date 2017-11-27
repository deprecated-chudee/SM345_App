import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Mentoroom } from '../models/mentoroom';
import { MentoroomInfo } from '../models/mentoRoomInfo';
import { Menti } from '../models/menti';

@Injectable()
export class MentoroomService {
  
    //private URL = 'http://localhost:8086/sm345/api/';
    private URL = 'http://220.230.112.31:8081/sm345/api/';

    constructor(private http: Http) { 
    }

    // 멘토방 생성
    createMentoroom(mentoroom: Mentoroom): Promise<Mentoroom>{
        let url = this.URL + 'mentoroom/create';
        return this.http.post(url, mentoroom)
            .toPromise()
            .then(response => response.json() as Mentoroom)
            .catch(this.handleError);
    }

    // 연도별 멘토방 목록 가져오기 
    getMentoroomListByYear(year: number): Promise<Mentoroom[]> {
        let url = this.URL + 'admin/mentoroom/' + year;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Mentoroom[])
            .catch(this.handleError);
    }

    // 멘토방 목록 가져오기
    getMentoroomList(): Promise<Mentoroom[]> {
        let url = this.URL + 'mentoroom'
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Mentoroom[])
            .catch(this.handleError);
    }

    // 멘토방 정보 가져오기
    getMentoroom(mentoroom_id: number): Promise<Mentoroom> {
        let url = this.URL + 'mentoroom/' + mentoroom_id;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Mentoroom)
            .catch(this.handleError);
    }

    // 멘티 신청
    joinMentee(mid: number, uid: number): Promise<string> {
        let url = `${this.URL}mentoroom/${mid}/${uid}/menti_join`;
        return this.http.get(url)
            .toPromise()
            .then(response => response)
            .catch(this.handleError)
    }

    // 멘티 신청 취소
    cancelMentee(mid: number, uid: number): Promise<string> {
        let url = `${this.URL}mentoroom/${mid}/${uid}/menti_cancel`;
        return this.http.get(url)
            .toPromise()
            .then(response => response)
            .catch(this.handleError)
    }

    // 멘티 목록
    menti_list(m_id: number): Promise<Menti[]> {
        let url = `${this.URL}mentoroom/${m_id}/menti_list`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Menti[])
            .catch(this.handleError)
    }

    // <멘티신청>
    // api/mentoroom/:mid/:uid/menti_join - 멘티신청 [get] :mid- mento_id / :uid - menti_id , return: 멘티신청이 완료되었습니다
    
    // api/mentoroom/:mid/:uid/menti_canceal - 멘티신청취소 [get] :mid- mento_id / :uid - menti_id, return - 멘티신청이 취소되었습니다
    
    // api/mentoroom/:m_id/menti_list - 멘티목록 [get] mento_id를 받아서 멘티목록을 조회

    // 파일 업로드
    fileUpload(formData, room_id, type) {
        let headers = new Headers();
        headers.append('enctype', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({headers: headers});

        let url = this.URL + 'fileupload/' + room_id + '/' + type;
        return this.http.post(url, formData, options)
            .toPromise()
            .then(res => res)
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}