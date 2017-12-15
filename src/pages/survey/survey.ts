import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { SurveyService } from '../../services/survey.service';
import { SurveySubject } from '../../models/surveySubject';
import { SurveyObject } from '../../models/surveyObject';
import { SurveySubjectContent } from '../../models/surveySubjectContent';

@Component({
  templateUrl: 'survey.html'
})
export class SurveyPage implements OnInit{
  //설문조사
  private surveyObj: SurveyObject;
  private surveySubj: SurveySubject;
  private surveyObjs: SurveyObject[] = [];
  private surveySubjs: SurveySubject[] = [];

  private surveySubjCon: SurveySubjectContent;
  private surveySubjCons: SurveySubjectContent[] = [];

  private currentUser;
  private USERID;

  constructor(
    public viewCtrl: ViewController,
    private surveyService: SurveyService,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.USERID = this.currentUser.USERID;

  }

  ngOnInit() {
    this.surveyService.surveyObjList()
      .then(surveyObj => this.surveyObjs = surveyObj);
    this.surveyService.surveySubjList()
      .then(surveySubj => this.surveySubjs = surveySubj);

    this.surveyService.surveyObjResult();
    this.surveyService.surveySubjResult()
      .then(surveySubjCon => this.surveySubjCons = surveySubjCon);
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }
}
