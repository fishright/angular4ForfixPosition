//  Created by xyx on 2018/6/12.
//  Copyright © 2018年 谢鑫. All rights reserved.
import {Injectable} from '@angular/core';
@Injectable()
export class LocalStorageProvider {
  storage = window.localStorage;
  constructor() {
    console.log('Hello LocalStorageProvider Provider');
  }
  get(key:string, defaultValue:any):any{
    let value:any = this.storage.getItem(key);
    try{
      value = JSON.parse(value);
    }
    catch(error){
      value = null;
    }
    if(value===null && defaultValue){
      value = defaultValue;
    }
    return value;
  }

  set(key:string,value:any){
    this.storage.setItem(key,JSON.stringify(value));
  }

  remove(key:string){
    this.storage.removeItem(key);
  }
}
