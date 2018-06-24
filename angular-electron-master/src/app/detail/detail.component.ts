//  Created by xyx on 2018/6/2.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Component, OnInit } from '@angular/core';
import {DialogComponent, DialogService} from 'ngx-bootstrap-modal';
import {CourseSelect} from '../student/course-select.service';

export interface AlertModel {
  title: string;
  message: string;
}
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends DialogComponent<AlertModel, null> implements AlertModel {
  title: string;
  message: string;
  data:CourseSelect;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
}
