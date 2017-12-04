import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AdminService } from '../services/admin.service';
import { MessageService } from '../services/message.service';
import { MentoroomService } from '../services/mentoroom.service';
import { CommentService } from '../services/comment.service';
import { LoginService } from '../services/login.service';
import { ArticleService } from '../services/article.service';
import { XlsxToJsonService } from '../services/xlsx-to-json.service';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SmPage } from '../pages/sm/sm';
import { NoticePage } from '../pages/notice/notice';
import { QuestionPage } from '../pages/question/question';
import { ManagerPage } from '../pages/manager/manager';
import { RoomPage } from '../pages/room/room';
import { RoomDetailPage } from '../pages/roomDetail/roomDetail';
import { MentorAddPage } from '../pages/mentorAdd/mentorAdd';
import { MessagePage } from '../pages/message/message';
import { ReadingPage } from '../pages/reading/reading';
import { WritePage } from '../pages/write/write';
import { MessageAddPage } from '../pages/messageAdd/messageAdd';
import { SurveyPage } from '../pages/survey/survey';
import { SmEditPage } from '../pages/smEdit/smEdit';
import { MyPage } from '../pages/myPage/myPage';
import { SurveyWritePage } from '../pages/surveyWrite/surveyWrite';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SmPage,
    NoticePage,
    QuestionPage,
    RoomPage,
    ManagerPage,
    RoomDetailPage,
    MentorAddPage,
    MessagePage,
    ReadingPage,
    WritePage,
    MessageAddPage,
    SurveyPage,
    SmEditPage,
    MyPage,
    SurveyWritePage
   // EditPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    HttpModule,
    //CoolStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SmPage,
    NoticePage,
    QuestionPage,
    RoomPage,
    ManagerPage,
    RoomDetailPage,
    MentorAddPage,
    MessagePage,
    ReadingPage,
    WritePage,
    MessageAddPage,
    SurveyPage,
    SmEditPage,
    MyPage,
    SurveyWritePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AdminService,
    MessageService,
    MentoroomService,
    CommentService,
    LoginService,
    ArticleService,
    XlsxToJsonService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
