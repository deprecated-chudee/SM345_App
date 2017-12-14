import { Component, OnInit, ViewChild } from '@angular/core';
import { App, NavController, ViewController, Slides } from 'ionic-angular';

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

    constructor(
      public viewCtrl: ViewController,
      public appCtrl: App,
      private surveyService: SurveyService
    ) {}

    ngOnInit() {
        this.surveyService.surveyObjList()
        .then(surveyObj => this.surveyObjs = surveyObj);
        this.surveyService.surveySubjList()
        .then(surveySubj => this.surveySubjs = surveySubj);
    }

    //slide 다음 페이지로 이동
    gotoNextSlide() {
        this.slides.slideNext();
    }

    //슬라이드 끝
    finishSlide() {
        this.openRoomDetailPage();
    }

    dismiss() {
        this.viewCtrl.dismiss();
     }
    
     openRoomDetailPage() {
        this.appCtrl.getRootNav().setRoot(RoomPage);
     }
    
    //  ngOnInit() {
    //     this.articleService.getArticleList(1)
    //     .then(article => this.articles = article);
    //  }
}
