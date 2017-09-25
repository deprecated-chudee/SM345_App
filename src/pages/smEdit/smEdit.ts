import { Component } from '@angular/core';
import { NavController, ViewController, AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'smEdit.html'
})
export class SmEditPage {

    private count:number=1;

    constructor(public viewCtrl: ViewController, public alertCtrl: AlertController) {

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }


    addSurvey(){
        if(this.count<=4){
            this.count+=1;
        }else{
            this.showAlert('더이상 추가할 수 없습니다.');
        }
    }

    minusSurvey(){
        if(this.count>1){
            this.count-=1;
        }else{
            this.showAlert('더이상 제거할 수 없습니다');
        }
    }

    showAlert(ms:string) {
        let alert = this.alertCtrl.create({
        title: ms,
        buttons: ['OK'],
        });
        alert.present();    
    }
}
