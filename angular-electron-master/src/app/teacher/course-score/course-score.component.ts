//  Created by xyx on 2018/6/17.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Component, OnInit } from '@angular/core';
import {CourseSelect, CourseSelectService} from '../../student/course-select.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Course, CourseService} from '../../course/course.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from 'ngx-bootstrap-modal';
import {DetailComponent} from '../../detail/detail.component';
import {CourseScoreEditComponent} from '../course-score-edit/course-score-edit.component';
import {HttpParams} from '@angular/common/http';
import {userInfo} from 'os';
import {LocalStorageProvider} from '../../providers/LocalStorage';


@Component({
  selector: 'app-course-score',
  templateUrl: './course-score.component.html',
  styleUrls: ['./course-score.component.scss']
})
export class CourseScoreComponent implements OnInit {

  formModel: FormGroup;
  public nameFile: FormControl = new FormControl();

  //TODO 改成服务请求，参照stock-manage.component.ts
  public courses:Array<Course>=[];
  public courseOne:Course;
  public courseSelectList: Array<CourseSelect>=[];

  constructor(private routerInfo: ActivatedRoute, private courseSelectSerivce: CourseSelectService,
              private router: Router, private courseService: CourseService,
              private dialogService:DialogService,private storage:LocalStorageProvider) {
  }


  ngOnInit() {
    let userInfo=this.storage.get("UserSession",null);
    //TODO 改成服务+任课老师的id :查找任课老师的课程
    let d1=new HttpParams();
    d1=d1.append('teacherId',userInfo.account);
    d1=d1.append('role',userInfo.role);
    this.courseService.searchCourse(d1)
      .subscribe(data=>{
       if(data['course']!==undefined)
        for(var index of data['course']){
          this.courseOne=new Course(index['cno'], index['cname'], index['tid'], index['tname'], index['day'], index['start_week'], index['end_week'], index['ctime'], index['class_location'], index['status'])
          this.courses.push(this.courseOne);
        }
      })
    // this.courses = this.courseService.getCourses();

    //TODO 改成服务：任课老师的id:查找出所有的学生列表 先加载出任课老师的
    // this.courseSelectList = this.courseSelectSerivce.getCourseSelects();

    let fb = new FormBuilder();
    this.formModel = fb.group({
      courseId: ['', [Validators.required]]
    });

  }

  search() {
    this.courseSelectList=[];
    let d1=new HttpParams();
    d1=d1.append('courseId',this.formModel.value.courseId);
    this.courseSelectSerivce.searchAllStudentCourseSelectRecord(d1).subscribe(data=>{
      if(data.status==0){
        // if(data['getSCByCno']!==undefined)
         for(var index of data['getSCByCno']){
           this.courseSelectList.push(new CourseSelect(index['id'],index['tid'],index['cname'],index['sno'],index['sname'],index['tid'],index['tname'],index['has_arrive'],index['score'],index['college']));
         }
      }
    })
  }

  // ngAfterViewChecked(){
  //  this.search();
  // }

  title:any;
  update(courseSelect: CourseSelect) {
        this.title="修改["+courseSelect.studentName+"]学生成绩";
        this.dialogService.addDialog(CourseScoreEditComponent,{title:this.title,message: "修改成绩",data:courseSelect});
  }

}

