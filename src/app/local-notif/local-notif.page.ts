import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-local-notif',
  templateUrl: './local-notif.page.html',
  styleUrls: ['./local-notif.page.scss'],
})
export class LocalNotifPage implements OnInit {

  constructor(private localNotifications: LocalNotifications) { }

  ngOnInit() {
    this.notif();
  }

  notif() {
    this.localNotifications.schedule({
      title: 'The big survey',
      text: 'Are you a fan of RB Leipzig?',
      attachments: ['https://s1.bukalapak.com/uploads/attachment/106001/Notif-2.png'],
      actions: [
        { id: 'yes', title: 'Yes' },
        { id: 'no', title: 'No' }
      ]
    });

    this.localNotifications.on('click').subscribe(res => {
      alert(JSON.parse(res));
    }, err => {
      alert(JSON.parse(err));
    });
  }


}
