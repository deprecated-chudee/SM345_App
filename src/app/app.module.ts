import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SmPage } from '../pages/sm/sm';
import { NoticePage } from '../pages/notice/notice';
import { QuestionPage } from '../pages/question/question';
import { SmLoginPage } from '../pages/smLogin/smLogin';
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
    SmLoginPage,
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
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SmPage,
    NoticePage,
    QuestionPage,
    SmLoginPage,
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
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
