//  Created by xyx on 2018/6/17.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Component, OnInit } from '@angular/core';
import {DialogComponent, DialogService} from 'ngx-bootstrap-modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CourseSelect, CourseSelectService} from '../../student/course-select.service';
import {HttpParams} from '@angular/common/http';
import {MessageComponent} from '../../message/message.component';

export interface AlertModel {
  title: string;
  message: string;
}
@Component({
  selector: 'app-course-score-edit',
  templateUrl: './course-score-edit.component.html',
  styleUrls: ['./course-score-edit.component.scss']
})
export class CourseScoreEditComponent extends DialogComponent<AlertModel, null> implements AlertModel {

  formModel:FormGroup;
  title: string;
  message: string;
  data:CourseSelect

  constructor(dialogService: DialogService,private courseSelectService:CourseSelectService) {
    super(dialogService);
  }

  ngOnInit(){
    let fb=new FormBuilder();
    this.formModel=fb.group({
      id:[this.data.id],
      score:[this.data.score,[Validators.required]]
    })
  }

  //TODO 提交修改申请 id+成绩
  submit(){
    let d1=new HttpParams();
    d1=d1.append("id",this.formModel.value.id);
    d1=d1.append("score",this.formModel.value.score);
    this.courseSelectService.writeInStudentScore(d1).subscribe(data=>{
      if(data.status=='0'){
        this.dialogService.addDialog(MessageComponent,{title:"录入成绩",message:"修改成功"});
      }else{
        this.dialogService.addDialog(MessageComponent,{title:"录入成绩",message:"网络错误"});

      }
    });
    this.dialogService.removeAll();
  }
}
