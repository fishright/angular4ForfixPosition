//  Created by xyx on 2018/6/18.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
const addCourseSelectUrl="http://140.143.1.156/zerg/public/api/v1/stuCourse/studentSC";
const searchStudentCourseSelectUrl="http://140.143.1.156/zerg/public/api/v1/stuCourse/getSCBySno";
const searchAllStudentCourseSelectUrl="http://140.143.1.156/zerg/public/api/v1/stuCourse/getSCByCno";
const studentScoreUrl="http://140.143.1.156/zerg/public/api/v1/stuCourse/updateSCScoreById";

@Injectable()
export class CourseSelectService {

  constructor(private https:HttpClient) { }
  public courseSelects:CourseSelect[]=[];


  addCourseSelectForMe(course):any{
    return this.https.post(addCourseSelectUrl,course,{headers:myheader});
  }

  //查询学生选课课表
  searchStudentCourseSelectRecord(id):any{
    return this.https.post(searchStudentCourseSelectUrl,id,{headers:myheader});
  }

  searchAllStudentCourseSelectRecord(id):any{
    return this.https.post(searchAllStudentCourseSelectUrl,id,{headers:myheader});
  }

  //录入学生成绩
  writeInStudentScore(course):any{
    return this.https.post(studentScoreUrl,course,{headers:myheader});
  }

}
export class CourseSelect{
  constructor(
    public id:string,
    public courseId:string,
    public courseName:string,
    public studentId:string,
    public studentName:string,
    public teacherId:string,
    public teacherName:string,
    public hasArrive:number,
    public score:number,
    public college:string
  ){

  }
}
