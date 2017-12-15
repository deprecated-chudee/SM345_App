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
  
  private surveySubjs: SurveySubject[] = [];
  private surveyobList: SurveyObject[] = [];
  private surveysbList1: SurveySubjectContent[] = [];
  private surveysbList2: SurveySubjectContent[] = [];
  private sbq1: string;
  private sbq2: string;
  private sbid1: number;
  private sbid2: number;

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
  
    this.surveyService.surveySubjList()
      .then(surveySubj => { this.surveySubjs = surveySubj;
                            this.sbq1 = surveySubj[0].subject_question;
                            this.sbq2 = surveySubj[1].subject_question;
                            this.sbid1 = surveySubj[0].id;
                            this.sbid2 = surveySubj[1].id;
                         });

    this.surveyService.surveyObjResult()
    .then( surveyobresult => this.surveyobList = surveyobresult);


    this.surveyService.surveySubjResult()
      .then(surveysbresult => { for(let s of surveysbresult){
                                  if(s.question_id == this.sbid1){
                                    this.surveysbList1.push(s);
                                  }
                                  if(s.question_id == this.sbid2){
                                    this.surveysbList2.push(s);
                                  }
                                  console.log(this.sbid1);
                                  console.log(this.sbid2);
                                  console.log(this.surveysbList1)
                                  console.log(this.surveysbList2)
      } });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
