//  Created by xyx on 2018/6/17.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {StudentArrive, StudentArriveListService} from '../../student/student-arrive-list.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-check-seat-numbers',
  templateUrl: './check-seat-numbers.component.html',
  styleUrls: ['./check-seat-numbers.component.scss']
})
export class CheckSeatNumbersComponent implements OnInit {

  constructor(private routeInfo:ActivatedRoute,private studentArriveService:StudentArriveListService,private router:Router) { }
  public arriveId:string;
  public studentArriveList:Array<StudentArrive>=[];
  public students:Array<String>=new Array<String>(10);
  public courseName:string="";
  ngOnInit() {
    let d1=new HttpParams();
    this.routeInfo.params.subscribe((params:Params)=>this.arriveId=params["id"]);
    d1=d1.append("arriveId",this.arriveId);
    this.studentArriveService.searchStudentAllArriveRecordByArriveId(d1)
      .subscribe(data=>{
        console.log(data);
        if(data.status=='0'){
          for(var index of data['getAllStuCheckInByArriveId']){
            this.courseName=index['cname'];
            if(index['arrive_status']!==null&&index['arrive_status']>=2){
              console.log(index);
              this.studentArriveList.push(new StudentArrive(index['id'],index['cno'],index['cname'],index['tid'],index['tname'],index['sno'],index['sname'],index['arrive_id'],index['fix_position'],index['mobile_position'],index['set_number'],index['status'],index['arrive_status'],index['early_arrive'],index['lately_arrive'],index['local_time']));
            }
          }
        }
      });
  }
  ngAfterViewChecked(){
    for(var index of this.studentArriveList){
      var id=index['seatNumber'];
      document.getElementById(id).innerHTML=id+"</br>"+index['studentName']+"</br>"+index['studentId'];
      document.getElementById(id).style.backgroundColor="#BFEFFF";
    }
  }

  back(){
    this.router.navigate(['./base/arriveHistory']);
  }

}
