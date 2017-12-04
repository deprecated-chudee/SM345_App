import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { SurveyObject } from '../models/surveyObject';
import { SurveySubject } from '../models/surveySubject';

@Injectable()
export class SurveyService {
  
    //private URL = 'http://localhost:8086/sm345/api/';
    private URL = 'http://220.230.112.31:8081/sm345/api/';

    constructor(private http: Http) { 
    }

    //관리자 - 객관식 설문조사 항목등록
    createSurveyObj(surveyObj: Array<string>) {
        let url = this.URL + 'surveyOB/insert';
        return this.http.post(url, surveyObj)
            .toPromise()
            .catch(this.handleError);
    }

    //관리자 - 주관식 설문조사 항목등록
    createSurveySubj(surveySubj: Array<string>) {
        let url = this.URL + 'surveySQ/insert';
        return this.http.post(url, surveySubj)
            .toPromise()
            .catch(this.handleError);
    }

    //멘토, 멘티 - 객관식 설문조사 목록
    surveyObjList() {
        let url = this.URL + 'surveyOB/list';
        return this.http.get(url)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }

    //멘토, 멘티 - 주관식 설문조사 목록
    surveySubjList(){
        let url = this.URL + 'surveySQ/list';
        return this.http.get(url)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }

    //설문조사 참여 여부
    surveyCheck(user_id: number) {
        let url = `${this.URL}${user_id}/survey_check`;
        return this.http.get(url)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    //멘토, 멘티 - 객관식 설문조사 답변 등록
    surveyObjWrite(u_id: number, surveyObjWrite: Array<number>) {
        let url = `${this.URL}surveyOB/insert/${u_id}`;
        return this.http.post(url, surveyObjWrite)
            .toPromise()
            .catch(this.handleError)
    }

    //멘토, 멘티 - 주관식 설문조사 답변 등록
    surveySubjWrite(u_id: number, surveySubjWrite: Array<string>) {
        let url = `${this.URL}surveySC/insert/${u_id}`;
        return this.http.post(url, surveySubjWrite)
            .toPromise()
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

