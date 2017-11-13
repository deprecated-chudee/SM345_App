import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HomePage } from '.././home/home';
import { SmEditPage } from '.././smEdit/smEdit';
import { ServerService } from '../../app/server.service';
import { Article } from '../../models/article';

@Component({
  templateUrl: 'sm.html'
})
export class SmPage implements OnInit  {
  serverService: ServerService;
  private articles: Article[] =[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, serverService: ServerService) {
    this.serverService = serverService;
  }

  ngOnInit() {
    this.serverService.getList(1).then(
      article => { this.articles = article;
    });
  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  OpenSmEditPage() {
    let modal = this.modalCtrl.create(SmEditPage);
    modal.present();
  }
}
