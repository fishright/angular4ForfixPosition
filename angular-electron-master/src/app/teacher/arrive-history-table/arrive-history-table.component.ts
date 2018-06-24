//  Created by xyx on 2018/6/17.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Component, OnInit } from '@angular/core';
import {StudentArrive, StudentArriveListService} from '../../student/student-arrive-list.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageProvider} from '../../providers/LocalStorage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Course, CourseService} from '../../course/course.service';
import {HttpParams} from '@angular/common/http';
import {Arrive, ArriveListService} from '../arrive-list.service';

@Component({
  selector: 'app-arrive-history-table',
  templateUrl: './arrive-history-table.component.html',
  styleUrls: ['./arrive-history-table.component.scss']
})
export class ArriveHistoryTableComponent implements OnInit {

  formModel:FormGroup;

  //TODO 改成服务请求，参照stock-manage.component.ts
  public courses:Array<Course>;
  public arriveList:Array<Arrive>=[];

  constructor(private routeInfo:ActivatedRoute,private router:Router,private studentArriveService:StudentArriveListService,
              private storage:LocalStorageProvider,private courseService:CourseService,private arriveListService:ArriveListService,
              private studentArriveListService:StudentArriveListService) { }


  public studentArriveList:Array<StudentArrive>=[];



  ngOnInit() {

    let userInfo=this.storage.get("UserSession",null);


    this.studentArriveList=this.studentArriveService.getStudentArriveLists(userInfo.account);
    let fb=new FormBuilder();
    this.formModel=fb.group({
      arriveId:['',[Validators.required]],
      arriveStatus:[''],
    });

    //老师查询服务
    let searchId=new HttpParams();
    searchId=searchId.append("teacherId",userInfo.account);
    searchId=searchId.append("role",userInfo.role);
    this.arriveListService.searchArriveList(searchId)
      .subscribe(data=>{
        console.log(data);
        if(data.status=='0')
          for(var index of data['checkIn']){
            this.arriveList.push(new Arrive(index['id'],index['cno'],index['cname'],index['tid'],index['early_arrive'],index['lately_arrive'],index['tname'],index['arrive_people'],index['fix_position'],index['status'],index['mobile_position']));
          }
      });
  }

  search(){
    this.studentArriveList=[];
    let arriveId=new HttpParams();
    arriveId=arriveId.append("arriveId",this.formModel.value.arriveId);
    this.studentArriveListService.searchStudentAllArriveRecordByArriveId(arriveId)
      .subscribe(data=>{
        console.log(data);
        if(data.status=='0'){
          for(var index of data['getAllStuCheckInByArriveId']){
            if(index['arrive_status']!=="2"){
              console.log(index);
              this.studentArriveList.push(new StudentArrive(index['id'],index['cno'],index['cname'],index['tid'],index['tname'],index['sno'],index['sname'],index['arrive_id'],index['fix_position'],index['mobile_position'],index['set_number'],index['status'],index['arrive_status'],index['early_arrive'],index['lately_arrive'],index['local_time']));
            }
          }
        }
      });
  }
  checkSeatNumber(){
    this.router.navigate(['./base/checkSeatNumber/'+this.formModel.value.arriveId]);
  }

}
