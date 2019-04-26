import { Injectable } from '@angular/core';
import { GroceriesServiceService } from './groceries-service.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(public alertCtrl: AlertController, public dataService: GroceriesServiceService) { }

  async showPrompt(item?, index?) {
    const prompt = await this.alertCtrl.create({
      header: item ? "Edit " + item.name : "Add item",
      inputs : [
        {
          name: 'name',
          type: 'text',
          placeholder: 'type in the name of an item',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          type: 'number',
          placeholder: '0',
          value: item ? item.quantity : null
        },
        {
          name: 'cost',
          type: 'number',
          placeholder: 'how much does the item cost?',
          value: item ? item.cost : null
        }
      ],
      buttons: [
        {
          text: item ? 'Edit' : "Add",
          cssClass: 'primary',
          handler: (item) => {
            if(index !== undefined)
              this.dataService.editItem(index, item);
            else
              this.dataService.addItem(item);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            console.log('confirm cancel');
          }
        }
      ]
    });
    await prompt.present();
  }
}
