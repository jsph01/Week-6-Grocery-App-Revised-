import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';
import { InputDialogService } from '../input-dialog.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = "Grocery";
  

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public dataService: GroceriesServiceService, public inputDialogService: InputDialogService) {

  }

  loadItems(){
    return this.dataService.getItems();
  }

  async addItem() {
    this.inputDialogService.showPrompt();
  }

  async editItem(item, index) {
    this.inputDialogService.showPrompt(item, index);
    
    let toast = await this.toastCtrl.create({
      message: 'updating ' + item.name,
      duration: 300
    });

    return await toast.present();
  }

  async removeItem(item, index) {
    let toast = await this.toastCtrl.create({
      message: item.name + ' was removed',
      duration: 300
    });

    this.dataService.removeItem(index);
    return await toast.present();
  }
}