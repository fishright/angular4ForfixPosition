//  Created by xyx on 2018/6/15.
//  Copyright © 2018年 谢鑫. All rights reserved.
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DialogComponent, DialogService} from 'ngx-bootstrap-modal';
import {AlertModel} from '../message/message.component';
import {LocalStorageProvider} from '../providers/LocalStorage';
import {MessageStorageProvider} from '../providers/MessageStorage';


export interface AlertModel {
  title: string;
  message: string;
}

@Component({
  selector: 'app-comfirm',
  templateUrl: './comfirm.component.html',
  styleUrls: ['./comfirm.component.scss']
})
export class ComfirmComponent  extends DialogComponent<AlertModel, null> implements AlertModel,OnInit{


  ngOnInit(){

  }

  title: string;
  message: string;

  @Output()
  conFirm:EventEmitter<string>=new EventEmitter<string>();


  constructor(dialogService: DialogService,private storage:MessageStorageProvider) {
    super(dialogService);
  }

  submit(){
    this.storage.remove("ok");
     this.storage.set("ok","0");
     this.conFirm.emit("0");
     this.dialogService.removeAll();
  }
  cancel(){
    this.storage.remove("ok");
    this.storage.set("ok","1");
    this.conFirm.emit("1");
    this.dialogService.removeAll();
  }

}
