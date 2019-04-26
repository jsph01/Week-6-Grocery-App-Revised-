import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import {Http, Headers, RequestOptions}  from "@angular/http";

export interface Item {
  name: string,
  quantity: string,
  cost: number
}

const ITEMS_KEY = 'my-items';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  addItem(item: Item): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Item[])=>{
      if(items){
        items.push(item);
        return this.storage.set(ITEMS_KEY, items);
      }else{
        return this.storage.set(ITEMS_KEY, [item])
      }
    });
  }
  addItemWithRestApi(item: Item): Promise<any> {

    this.http.post('https://www.example.com/AddItem.php',item)
    .map(res => res.json())
    .subscribe(res => {
    
     loader.dismiss()
    this.items=res.server_response;
    
    console.log(this.items);
    });


    return this.storage.get(ITEMS_KEY).then((items: Item[])=>{
      if(items){
        items.push(item);
        return this.storage.set(ITEMS_KEY, items);
      }else{
        return this.storage.set(ITEMS_KEY, [item])
      }
    });
  }

  getItems(): Promise<Item[]> {
    return this.storage.get(ITEMS_KEY);
  }

  updateItem(item: Item, index: number): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Item[])=>{
      if(!items || items.length === 0) {
        return null;
      }
      items[index] = item;
      return this.storage.set(ITEMS_KEY, items);
    });
  }

  deleteItem(index: number): Promise<Item> {
    return this.storage.get(ITEMS_KEY).then((items: Item[])=>{
      if(!items || items.length === 0){
        return null;
      }

      items.splice(index, 1);
      return this.storage.set(ITEMS_KEY, items);
    });
  }
}
