import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Mentoroom } from '../models/mentoroom';
import { Menti } from '../models/menti';
import { Upload } from '../models/upload';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class MentoroomService {
  
    //private URL = 'http://localhost:8086/sm345/api/';
    private URL = 'http://220.230.112.31:8081/sm345/api/';

    constructor(private http: Http) { 
    }

    // 멘토방 생성 첫 번째 (멘토방)
    createMentoroom1(mentoroom: Mentoroom): Promise<number>{
        let url = this.URL + 'mentoroom/create';
        return this.http.post(url, mentoroom)
            .toPromise()
            .then(response => response.json() as number)
            .catch(this.handleError)
    }

    // 멘토방 생성 두 번째 (사진, 파일)
    createMentoroom2(r_id: number, kind: number, upload: FormData): Promise<any> {
        let headers = new Headers();
        headers.append('enctype', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({headers: headers});
        
        let url = `${this.URL}mentoroom/create/${r_id}/${kind}`;
        return this.http.post(url, upload, options)
            .toPromise()
            .then(res => res.text())
            .catch(this.handleError)
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

    // 보고서 업로드
    fileUpload(upload: FormData, room_id: number, kind: number) {
        let headers = new Headers();
        headers.append('enctype', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({headers: headers});

        let url = `${this.URL}mentoroom/fileupload/${room_id}/${kind}`; 
        return this.http.post(url, upload, options)
            .toPromise()
            .catch(this.handleError)
    }

    // 파일 리스트
    fileList(room_id: number): Promise<Upload[]> {
        let url = this.URL + 'mentoroom/filelist/' + room_id;
        return this.http.get(url)
            .toPromise()
            .then(res => res.json() as Upload[])
            .catch(this.handleError)
    }

    // 파일 삭제
    fileDelete(room_id: number, file_id: number) {
        let url = `${this.URL}mentoroom/filedelete/${room_id}/${file_id}`;
        return this.http.get(url)
            .toPromise()
            .catch(this.handleError)
    }

     // 홈화면 사진 목록 가져오기
     getPictureList(): Promise<Upload[]> {
        let url = this.URL + 'home/filelist'
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Upload[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}