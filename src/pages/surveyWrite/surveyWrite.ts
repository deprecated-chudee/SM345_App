import { Component, OnInit, ViewChild } from '@angular/core';
import { App, NavController, ViewController, Slides } from 'ionic-angular';

import { RoomPage } from '.././room/room';

import { SurveyObject } from '../../models/surveyObject';
import { SurveySubject } from '../../models/surveySubject';

@Component({
  templateUrl: 'surveyWrite.html'
})

export class SurveyWritePage {
    @ViewChild(Slides) slides: Slides;
    private surveyObj: SurveyObject;
    private surveySubj: SurveySubject;
  
    private surveyObjs: SurveyObject[] =[];
    private surveySubjs: SurveySubject[] =[];

    constructor(
      public viewCtrl: ViewController,
      public appCtrl: App
    ) {}

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
