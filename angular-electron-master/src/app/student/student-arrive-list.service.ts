//  Created by xyx on 2018/6/18.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
const createStudentArriveRecordUrl="http://140.143.1.156/zerg/public/api/v1/stuCheckIn/updateStuCheckInBySno";
const searchStudentAllArriveRecordUrl="http://140.143.1.156/zerg/public/api/v1/stuCheckIn/getStuCheckInBySno";
const searchStudentAllArriveRecordByArriveIdUrl="http://140.143.1.156/zerg/public/api/v1/stuCheckIn/getAllStuCheckInByArriveId"

@Injectable()
export class StudentArriveListService {

  constructor(private https:HttpClient) { }

  public arriveStudentList:StudentArrive[]=[
  ]
  public arriveList:Array<StudentArrive>;
  //TODO 改成服务+需要传入学生id,返回应该是多条记录
  getStudentArriveLists(id:string):Array<StudentArrive>{
    return this.arriveStudentList;
  }

  searchStudentAllArriveRecord(id):any{
    return this.https.post(searchStudentAllArriveRecordUrl,id,{headers:myheader});
  }

  createStudentArriveRecord(studentList):any{
    return this.https.post(createStudentArriveRecordUrl,studentList,{headers:myheader});
  }

  executeStudentArriveRecord(studentList):any{
    return this.https.post(createStudentArriveRecordUrl,studentList,{headers:myheader});
  }

  searchStudentAllArriveRecordByArriveId(id):any{
    return this.https.post(searchStudentAllArriveRecordByArriveIdUrl,id,{headers:myheader});
  }

  //TODO 课程id+请假/旷课 forTeacher
}
export class StudentArrive{
  constructor(
    public id:string,
    public courseId:string,
    public courseName:string,
    public teacherId:string,
    public teacherName:string,
    public studentId:string,
    public studentName:string,
    public arriveId:string,//老师发起的签到记录id
    public fixPosition:string,
    public mobileFixPosition:string,
    public seatNumber:string,
    public status:string,//签到是否被关闭
    public arriveStatus:string,//请假or签到
    public earlyArrive:Date,
    public latelyArrive:Date,
    public localTime:Date,
  ){

  }
}
