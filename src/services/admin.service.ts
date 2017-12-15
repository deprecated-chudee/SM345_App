import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user';
import { Mentoroom } from '../models/mentoroom';
import { MentoroomInfo } from '../models/mentoroomInfo';
import { Observable } from 'rxjs/Observable';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';
import { XlsxToJsonService } from './xlsx-to-json.service';
import * as _ from 'lodash';
import * as FileSaver from 'file-saver';

@Injectable()
export class AdminService {
  
    // private URL = 'http://localhost:8085/sm345/api/';
    private URL = 'http://220.230.112.31:8081/sm345/api/';
    public result: any; //엑셀 데이터
    private xlsxToJsonService: XlsxToJsonService;

    constructor(private http: Http, xlsxToJsonService: XlsxToJsonService) {
        this.xlsxToJsonService = xlsxToJsonService;
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

    // 리포트 날짜 리스트 저장하기
    createReportList(reports) {
        let url = this.URL + 'admin/report_date/create';
        return this.http.post(url, reports)
            .toPromise()
            .then(res => console.log(res))
            .catch(this.handleError)
    }

    // 리포트 날짜 리스트 불러오기
    getReportList() {
        let url = this.URL + 'admin/report_date';
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError)
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

    // 보고서 삭제
    reportRemove(f_id) {
        let url = this.URL + 'admin/filedelete/' + f_id;
        return this.http.get(url)
            .toPromise()
            .catch(this.handleError)
    }

    // 엑셀 업로드
   handleFile(event) {
    let file = event.target.files[0];
        this.xlsxToJsonService.processFileToJson({}, file)
            .subscribe(data => {
                data = _.map(data['sheets']['수강학생목록_데이터베이스실습'], (user) => {
                  console.log(user)
                  return {
                    user_id: user['학번'],
                    user_major: user['학과'],
                    user_manor: user['복수/부전공'],
                    user_name: user['이름'],
                    user_email: user['이메일'],
                    user_security: user['주민번호'],
                    user_phone: user['휴대폰'],
                  }
                  // console.log(user)
                })
                this.result = JSON.stringify(data)
                console.log(this.result);
            })
    }
    // 신입생 엑셀 등록
    excelEnter(excel: Array<Object>) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({headers: headers});

        let url = this.URL + 'admin/excel';
        return this.http.post(url, excel, options)
            .toPromise()
            .catch(this.handleError)
    }

    //멘토방 폐설
    mentoroom_close(r_id: number) {
        let url = this.URL + 'admin/mentoroom/' + r_id + '/close';
        return this.http.get(url)
            .toPromise()
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}