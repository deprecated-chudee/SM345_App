import { Component, OnInit, ViewChild } from '@angular/core';
import { App, NavController, ViewController, Slides, ToastController } from 'ionic-angular';

import { RoomPage } from '.././room/room';

//설문조사
import { SurveyObject } from '../../models/surveyObject';
import { SurveySubject } from '../../models/surveySubject';
import { SurveyService } from '../../services/survey.service';

@Component({
  templateUrl: 'surveyWrite.html'
})

export class SurveyWritePage implements OnInit {
    @ViewChild(Slides) slides: Slides;
    private surveyObj: SurveyObject;
    private surveySubj: SurveySubject;
    private surveyObjs: SurveyObject[] =[];
    private surveySubjs: SurveySubject[] =[];
    private lengthObj: number;
    private lengthSubj: number;
    
    private surveyObjWrites: number[] = []; //객관식 설문조사 답변 배열
    private surveySubjWrites: string[] = []; //주관식 설문조사 답변 배열

    private currentUser;
    private USERID;

    private num1: number = 0;
    private num2: number = 0;

    constructor(
      public viewCtrl: ViewController,
      public appCtrl: App,
      public navCtrl: NavController,
      public toastCtrl: ToastController,
      private surveyService: SurveyService,
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.USERID = this.currentUser.USERID;

    }

    ngOnInit() {
        this.surveyService.surveyObjList()
        .then(surveyObj => { this.surveyObjs = surveyObj;
                             this.lengthObj = this.surveyObjs.length;
        });
        this.surveyService.surveySubjList()
        .then(surveySubj => { this.surveySubjs = surveySubj;
                              this.lengthSubj = this.surveySubjs.length;
        });
    }

    numPlus1() {
        this.num1 = this.num1 + 1;
    }

    numPlus2() {
        this.num2 = this.num2 + 1;
    }

    //멘토, 멘티 - 객관식 설문응답 저장
    surveyObjWrite() {
        this.surveyService.surveyObjWrite(this.USERID, this.surveyObjWrites);
    }

    //멘토, 멘티 - 주관식 설문응답 저장
    surveySubjWrite() {
        this.surveyService.surveySubjWrite(this.USERID, this.surveySubjWrites);
    }

    //slide 다음 페이지로 이동
    gotoNextSlide() {
        this.slides.slideNext();
    }

    //슬라이드 끝
    finishSlide() {
        this.surveyObjWrite();
        this.surveySubjWrite();
        this.openRoomDetailPage();
        this.Toast('설문조사가 완료되었습니다.')
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
    
    openRoomDetailPage() {
        this.navCtrl.setRoot(RoomPage);
    }

    Toast(message) {
        let toast = this.toastCtrl.create({
          message: message,
          duration: 3000,
          position: 'bottom',
        });
        toast.present();
      }
    
}
