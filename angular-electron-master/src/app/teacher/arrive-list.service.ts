//  Created by xyx on 2018/6/17.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Injectable } from '@angular/core';
import {DatePipe} from '@angular/common';
import {Http,ResponseOptions,Headers,HttpModule,URLSearchParams} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {headersToString} from 'selenium-webdriver/http';
/**
 * Created by 由天才卡题少男谢鑫～～ on 18-6-7.
 */
const fixPositionUrl="http://api.map.baidu.com/location/ip?ak=gh5OVEc95ztQAmc7UWdUqYpOAU9Z1UUR&coor=bd09ll";
const createCoursePositionTableUrl="http://140.143.1.156/zerg/public/api/v1/checkIn/createCheckIn";
const searchCoursePositionTableUrl="http://140.143.1.156/zerg/public/api/v1/checkIn/getCheckInByTid";
const editCoursefixPositionStatusUrl="http://140.143.1.156/zerg/public/api/v1/checkIn/changeCheckInStatus";

const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')


@Injectable()
export class ArriveListService {

  constructor(private https:HttpClient){
  }

  public arriveList:Arrive[]=[
    new Arrive("0","1","软件工程训练","0002",new Date(),new Date(),"谢鑫教授",0,"",0,"")
  ]

  //TODO 改成服务
  getArriveLists():Arrive[]{
    return this.arriveList;
  }

  //TODO 改成服务
  getArriveList(id:string):Arrive{
    return this.arriveList.find(arrive=>arrive.id===id);
  }

  //查询老师创建签到记录(教师端）
  searchArriveList(list):any{
    return this.https.post(searchCoursePositionTableUrl,list,{headers:myheader});
  }

  //创建定位服务
  createXYPosition(){
    return this.https.post(fixPositionUrl,'',{headers:myheader});
  }

  //创建课程签到表（老师端)
  createCoursePositionTable(user):any{
    return this.https.post(createCoursePositionTableUrl,user,{headers:myheader});
  }

  //修改签到记录的状态(教师端）
  editCoursefixPositionStatus(id):any{
    return this.https.post(editCoursefixPositionStatusUrl,id,{headers:myheader});
  }

}
export class Arrive{
  constructor(
    public id:string,
    public courseId:string,
    public courseName:string,
    public courseTeacherId:string,
    public earlyArrive:Date,
    public latelyArrive:Date,
    public teacherName:string,
    public arrivePeople:number,
    public fixPosition:string,
    public status:number,
    public mobilefixPosition:string,
  ){}
}
