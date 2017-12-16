import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HomePage } from '.././home/home';
import { RoomDetailPage } from '.././roomDetail/roomDetail';
import { MentorAddPage } from '.././mentorAdd/mentorAdd';

import { MentoroomService } from '../../services/mentoroom.service';
import { AdminService } from '../../services/admin.service';

import { Mentoroom } from '../../models/mentoroom';

@Component({
    templateUrl: 'room.html'
})
export class RoomPage  implements OnInit {
    private mentorooms: Mentoroom[];
    private currentUser;
    private USERAUTH;
    private mento_start;
    private mento_end;
    private date: Date;

    constructor( 
        private mentoroomService: MentoroomService, 
        private adminService: AdminService,
        public navCtrl: NavController, 
        public modalCtrl: ModalController
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.USERAUTH = this.currentUser.USERAUTH;
        this.date = new Date();
    }

    ngOnInit() {
        this.mentoroomService.getMentoroomList()
            .then(mentorooms => {
                this.mentorooms = mentorooms
                console.log(this.mentorooms)
            });
        this.getMentoRoomInfo()
    }

    openHomePage() {
        this.navCtrl.setRoot(HomePage);
    }

    openRoomDetailPage(selectedRoom) {
        this.navCtrl.push(RoomDetailPage, {
            selectedRoom: selectedRoom
        });
    }

    openMentorAddPage() {
        let modal = this.modalCtrl.create(MentorAddPage);
        modal.present();
    }

    getMentoRoomInfo() {
        this.adminService.getMentoRoomInfo()
            .then(res => {
                this.mento_start = new Date(res.mento_start);
                this.mento_end = new Date(res.mento_end);
        })
    }
}
