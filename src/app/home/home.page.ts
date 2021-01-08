import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { title } from 'process';
import { Local } from 'protractor/built/driverProviders';
const { LocalNotifications } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private alertCtrl: AlertController,private router: Router) {}


  async ngOnInit(){
    await LocalNotifications.requestPermission();

    LocalNotifications.registerActionTypes({
      types:[{ 
        id: 'CHAT_MSG',
        actions: [
          {
            id: 'view',
            title: 'Open Chat'
          },
          {
            id:'remove',
            title: 'Dismiss',
            destructive: true
          },
          {
            id: 'respond',
            title: 'Respond',
            input: true,
          }

        ]
      }]
    })
    
  }
  

  async scheduleBasic(){
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Route started',
          body: 'Destination: El Venizelos',
          id:1,
          extra:{
           
          },
          iconColor: '#0000FF'

        }
      ]
    });
  }

  async scheduleAdvanced(){
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Driver missing',
          body:'Where are you driver?',
          id:2,
          extra:{
            data: 'Pass your data to the hanlder'
          },
          iconColor: '#0000FF',
          actionTypeId:'CHAT_MSG',
          attachments:[
            {id: 'face', url: 'res://public/assets/pass_recover_check.png'}
          ]
        }
      ]
    });
  }


  async presentAlert(header, message){
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons:['OK']
    })
  }
}
