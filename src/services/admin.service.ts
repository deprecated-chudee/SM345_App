import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user';
import { Mentoroom } from '../models/mentoroom';
import { MentoroomInfo } from '../models/mentoroomInfo';
import { Observable } from 'rxjs/Observable';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';

@Injectable()
export class AdminService {
  
    // private URL = 'http://localhost:8085/sm345/api/';
    private URL = 'http://220.230.112.31:8081/sm345/api/';

    constructor(private http: Http) {
    }

    // 사용자 목록
    userList(auth: any): Promise<User[]> {
        let url = this.URL + 'admin/user/' + auth;
        return this.http.get(url)
            .toPromise()
            .then(res => res.json() as User[])
            .catch(this.handleError);
    }

    // 멘토방 삭제
    removeRoom(m_id) {
        let url = this.URL + 'mentoroom/' + m_id + '/reject';
        return this.http.get(url, null)
            .toPromise()
            .catch(this.handleError)
    }

    // 관리자 멘토방 승인
    confirmMentoroom(mentoroom: Mentoroom) {
        let url = this.URL + 'mentoroom/' + mentoroom.mentoroom_id + '/' + mentoroom.mento_id + '/confirm';
        return this.http.get(url)
            .toPromise()
            .catch(this.handleError);
    }

    // 관리자 멘토방 거절
    rejectMentoroom(mentoroom_id: number) {
        let url = this.URL + 'mentoroom/' + mentoroom_id + '/reject';
        return this.http.get(url)
            .toPromise()
            .catch(this.handleError);
    }

    // 관리자 등록
    updateEmpowerUser(user_id: number) {
      let url = this.URL + 'admin/empower/' + user_id;
      return this.http.get(url)
          .toPromise()
          .catch(this.handleError);
    }

    // 관리자 해제
    updateLeaveUser(user_id: number) {
    let url = this.URL + 'admin/leave/' + user_id;
    return this.http.get(url)
        .toPromise()
        .catch(this.handleError);
    }

    // Q&A 답변완료
    updateAnswer(user_id: number) {
        let url = this.URL + 'admin/' + user_id + '/answer';
        return this.http.get(url)
            .toPromise()
            .catch(this.handleError);
    }

    // 멘토방 설정 저장
    createMentoRoomInfo(mentoroomInfo: MentoroomInfo) {
        let url = this.URL + 'admin/room_info/edit';
        return this.http.post(url, mentoroomInfo)
            .toPromise()
            .catch(this.handleError);
    }

    //멘토방 설정 불러오기
    getMentoRoomInfo(): Promise<MentoroomInfo> {
        let url = this.URL + 'admin/room_info';
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as MentoroomInfo)
            .catch(this.handleError);
    }

    // 보고서 승인
    reportConfirm(f_id: number) {
        let url = this.URL + 'admin/report_confirm/' + f_id;
        return this.http.get(url)
            .toPromise()
            .catch(this.handleError)
    }

    // 보고서 거절
    reportReject(f_id: number) {
        let url = this.URL + 'admin/report_reject/' + f_id;
        return this.http.get(url)
            .toPromise()
            .catch(this.handleError)
    }

    // 보고서 목록 불러오기
    reportList(year: number): Promise<any> {
        let url = this.URL + 'admin/report/' + year;
        return this.http.get(url)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}