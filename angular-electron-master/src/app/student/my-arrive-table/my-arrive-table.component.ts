//  Created by xyx on 2018/6/18.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Component, OnInit } from '@angular/core';
import {StudentArrive, StudentArriveListService} from '../student-arrive-list.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageProvider} from '../../providers/LocalStorage';
import {HttpParams} from '@angular/common/http';
import {ArriveListService} from '../../teacher/arrive-list.service';
import {DialogService} from 'ngx-bootstrap-modal';
import {MessageComponent} from '../../message/message.component';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-my-arrive-table',
  templateUrl: './my-arrive-table.component.html',
  styleUrls: ['./my-arrive-table.component.scss']
})
export class MyArriveTableComponent implements OnInit {


  public studentArriveList:Array<StudentArrive>=[];
  public fixPostion:string="";

  constructor(private routeInfo:ActivatedRoute,private router:Router,private studentArriveService:StudentArriveListService,
              private storage:LocalStorageProvider,private arriveListService:ArriveListService,private dialogService:DialogService,private datePipe:DatePipe) { }

  ngOnInit() {

    let userInfo=this.storage.get("UserSession",null);
    let d1=new HttpParams();
    d1=d1.append('studentId',userInfo.account);

    //TODO 学生端课程签到记录-改成如下服务
    this.studentArriveService.searchStudentAllArriveRecord(d1).subscribe(data=>{
      console.log(data);
      if(data.status==0){
         for(var index of data['getStuCheckInBySno']){
           this.studentArriveList.push(new StudentArrive(index['id'],index['cno'],index['cname'],index['tid'],index['tname'],index['sno'],index['sname'],index['arrive_id'],index['fix_position'],index['mobile_position'],index['set_number'],index['status'],index['arrive_status'],index['early_arrive'],index['lately_arrive'],index['local_time']));
         }
      }
    });


    //获取该生现在所在的位置信息
    this.arriveListService.createXYPosition()
      .subscribe(data=>{
        this.fixPostion=data['content']['point']['x']+" "+data['content']['point']['y'];
      },err=>{
        this.fixPostion="IP地址获取失败";
      });


  }

  //TODO 签到>1
  fix(student){
    let now=this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    let early=student.earlyArrive;
    let late=student.latelyArrive;
    if(now>=early&&now<=late){
      this.router.navigate(['./base/seatNumber'],{
        queryParams: {
          studentArriveId: student.id,
          arriveId:student.arriveId
        }
      });
    }else{
      this.dialogService.addDialog(MessageComponent,{title:"签到",message:"已过签到时间"});
    }

  }

  //TODO 请假=1
  execute(student){
    let d1=new HttpParams();
    d1=d1.append('studentArriveListId',student.id);
    d1=d1.append('arriveStatus',"1");
    d1=d1.append('seatNumber',"");
    d1=d1.append("arriveId",student.arriveId);
    d1=d1.append('fixPosition',this.fixPostion);
    d1=d1.append("localTime",this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss'));
    this.studentArriveService.executeStudentArriveRecord(d1).subscribe(data=>{
      if(data.status==0){
        this.dialogService.addDialog(MessageComponent,{title:'课程签到',message:'请假成功'});
      }else{
        this.dialogService.addDialog(MessageComponent,{title:'课程签到',message:'发生未知错误'});
      }
    })
  }

}
