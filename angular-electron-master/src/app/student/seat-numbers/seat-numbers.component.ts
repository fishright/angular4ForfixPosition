//  Created by xyx on 2018/6/18.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {StudentArrive, StudentArriveListService} from '../student-arrive-list.service';
import {HttpParams} from '@angular/common/http';
import {LocalStorageProvider} from '../../providers/LocalStorage';
import {ArriveListService} from '../../teacher/arrive-list.service';
import {DialogService} from 'ngx-bootstrap-modal';
import {MessageComponent} from '../../message/message.component';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-seat-numbers',
  templateUrl: './seat-numbers.component.html',
  styleUrls: ['./seat-numbers.component.scss']
})
export class SeatNumbersComponent implements OnInit {

  constructor(private routeInfo:ActivatedRoute,private studentArriveService:StudentArriveListService,private storage:LocalStorageProvider,private arriveListService:ArriveListService,private dialogService:DialogService,private datePipe:DatePipe) {

  }
  public students:Array<String>=new Array<String>(10);
  public fixPostion:string="";


  public studentArriveListId:string;
  public teacherArriveId:string;
  public studentArriveList:Array<StudentArrive>=[];

  ngOnInit() {
    let d1=new HttpParams();
    this.routeInfo.queryParams.subscribe(queryParams=>
    {
      this.studentArriveListId= queryParams.studentArriveId;
      this.teacherArriveId=queryParams.arriveId;
    });
   console.log(this.studentArriveListId);
   console.log(this.teacherArriveId);
     //获取该生现在所在的位置信息
    this.arriveListService.createXYPosition()
      .subscribe(data=>{
        this.fixPostion=data['content']['point']['x']+" "+data['content']['point']['y'];
        console.log(this.fixPostion);
      },err=>{
        this.fixPostion="位置获取失败";
      });

    //加载已经在座位的人
    let d2=new HttpParams();
    d2=d2.append("arriveId",this.teacherArriveId);
    this.studentArriveService.searchStudentAllArriveRecordByArriveId(d2)
      .subscribe(data=>{
        console.log(data);
        if(data.status=='0'){
          for(var index of data['getAllStuCheckInByArriveId']){
            if(index['arrive_status']!==null&&index['arrive_status']>=2){
              console.log(index);
              this.studentArriveList.push(new StudentArrive(index['id'],index['cno'],index['cname'],index['tid'],index['tname'],index['sno'],index['sname'],index['arrive_id'],index['fix_position'],index['mobile_position'],index['set_number'],index['status'],index['arrive_status'],index['early_arrive'],index['lately_arrive'],index['local_time']));
            }
          }
        }
      });
  }

  ngAfterViewChecked(){
    //标记已经签到在座位上的人
    for(var index of this.studentArriveList){
      var id=index['seatNumber'];
      document.getElementById(id).innerHTML=id+"</br>"+index['studentName']+"</br>"+index['studentId'];
      document.getElementById(id).style.backgroundColor="#BFEFFF";
    }
  }
  seatPosition(id){
     let d1=new HttpParams();
     d1=d1.append('studentArriveId',this.studentArriveListId);
     d1=d1.append('arriveStatus','2');
     d1=d1.append('arriveId',this.teacherArriveId);
     d1=d1.append('seatNumber',id);
     d1=d1.append('fixPosition',this.fixPostion);
     d1=d1.append("localTime",this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss'));
     this.studentArriveService.createStudentArriveRecord(d1).subscribe(data=>{
       if(data.status===0){
         this.dialogService.addDialog(MessageComponent,{title:'课程签到',message:'签到成功'});
       }else{
         this.dialogService.addDialog(MessageComponent,{title:'课程签到',message:data.message});
       }
     })

  }

}
