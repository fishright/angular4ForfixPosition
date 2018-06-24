//  Created by xyx on 2018/6/13.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Component, OnInit } from '@angular/core';
import {DialogComponent, DialogService} from 'ngx-bootstrap-modal';


export interface AlertModel {
  title: string;
  message: string;
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent extends DialogComponent<AlertModel, null> implements AlertModel {
  title: string;
  message: string;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
}
