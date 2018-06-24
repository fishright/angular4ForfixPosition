//  Created by xyx on 2018/6/18.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Course, CourseService} from '../../course/course.service';
import {CourseSelect, CourseSelectService} from '../course-select.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {DialogService} from 'ngx-bootstrap-modal';
import {MessageComponent} from '../../message/message.component';
import {LocalStorageProvider} from '../../providers/LocalStorage';
import {ComfirmComponent} from '../../comfirm/comfirm.component';
import {MessageStorageProvider} from '../../providers/MessageStorage';

@Component({
  selector: 'app-course-select',
  templateUrl: './course-select.component.html',
  styleUrls: ['./course-select.component.scss']
})
export class CourseSelectComponent implements OnInit {

  formModel:FormGroup;
  public userName:string="";
  public userId:string="";
  public userCollege:string="";
  userInfo:any;

  //TODO 改成服务请求，参照stock-manage.component.ts
  public courses:Array<Course>=[];

  public courseSelectList:Array<CourseSelect>=[];

  constructor(private routerInfo:ActivatedRoute,private courseSelectSerivce:CourseSelectService,
              private router:Router,private courseService:CourseService,private dialogService:DialogService,private storage:LocalStorageProvider,private messagStorage:MessageStorageProvider) { }

  ngOnInit() {
    //找到当前登陆用户
    this.userInfo=this.storage.get("UserSession",null);
    this.userName=this.userInfo.name;
    this.userId=this.userInfo.account;
    this.userCollege=this.userInfo.college;

    //学期选课 此处需要返回所有老师的开课课程
    this.courseService.searchAllCourse().subscribe(data=>{
      if(data.status==0){
        for(var index of data['getAllCourse']){
          this.courses.push(new Course(index['cno'], index['cname'], index['tid'], index['tname'], index['day'], index['start_week'], index['end_week'], index['ctime'], index['class_location'], index['status']));
        }
      }else{
        this.dialogService.addDialog(MessageComponent,{title:'课程查询',messge:data.message});
      }
    });

    this.searchStuCourseSelect();

  }
  searchStuCourseSelect(){
    //TODO 查询学生选课情况 学生id->选课表/成绩表
    let d1=new HttpParams();
    d1=d1.append("studentId",this.userInfo.account);
    this.courseSelectSerivce.searchStudentCourseSelectRecord(d1).subscribe(data=>{
      if(data['getSCBySno']!==undefined)
        for(var index of data['getSCBySno']){
          this.courseSelectList.push(new CourseSelect(index['id'],index['cno'],index['cname'],index['sname'],index['sno'],index['tid'],index['tname'],index['hasArrive'],index['score'],index['college']));
        }
    })
  }

  //学生选课-->可以构成 成绩表
  addCourseForMe(course){
    this.courseSelectList=[];
       let d1=new HttpParams();
       d1=d1.append("id",'');
       d1=d1.append('courseId',course.courseId);
       d1=d1.append('courseName',course.courseName);
       d1=d1.append('hasArrive',"0");
       d1=d1.append('score','null');
       d1=d1.append('teacherId',course.teacherId);
       d1=d1.append('teacherName',course.teacherName);
       d1=d1.append('studentId',this.userId);
       d1=d1.append('studentName',this.userName);
       d1=d1.append('college',this.userCollege);
       console.log("有数据吗"+d1);
       //TODU 这里做成模态框提示
       // this.dialogService.addDialog(ComfirmComponent,{title:'确认添加？',message:'添加后不能修改！'});
       this.courseSelectSerivce.addCourseSelectForMe(d1).subscribe(data=>{
         if(data.status=='0'){
           console.log(data);
            this.dialogService.addDialog(MessageComponent,{title:"学生选课",message:"添加成功"});
            this.searchStuCourseSelect();
         }else{
           this.dialogService.addDialog(MessageComponent,{title:"学生选课",message:"上课时间不能冲突"});
         }
       })

  }

}
