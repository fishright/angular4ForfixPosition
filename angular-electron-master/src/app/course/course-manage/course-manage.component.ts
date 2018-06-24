import {Component, OnInit } from '@angular/core';
import {Course, CourseService} from '../course.service';
import {Router} from '@angular/router';
import {LocalStorageProvider} from '../../providers/LocalStorage';
import {HttpParams} from '@angular/common/http';
import {DialogService} from 'ngx-bootstrap-modal';
import {MessageComponent} from '../../message/message.component';

@Component({
  selector: 'app-course-manage',
  templateUrl: './course-manage.component.html',
  styleUrls: ['./course-manage.component.scss']
})
export class CourseManageComponent implements OnInit {

  show:boolean
   public courses:Array<Course>=[];
  constructor(public router:Router,private courseService:CourseService,private storage:LocalStorageProvider,private dialogService:DialogService) { }
  public courseOne:Course;
  public courseTeacherName:string="";

  ngOnInit() {
    let userInfo=this.storage.get("UserSession",null);
    console.log(userInfo);
    if(userInfo.role=='1'){
      this.courseTeacherName=userInfo.name+"学生";
      this.show=true;
    }
    else {
      this.show=false;
      this.courseTeacherName=userInfo.name+"老师";
    }

    //教师课表
    let d1=new HttpParams();
    if(userInfo.role=='2') {
      d1 = d1.append("teacherId", userInfo.account);
      d1 = d1.append("role", userInfo.role);
      this.courseService.searchCourse(d1)
        .subscribe(data => {
          if(data['course']!==undefined)
          for (var index of data['course']) {
            this.courseOne = new Course(index['cno'], index['cname'], index['tid'], index['tname'], index['day'], index['start_week'], index['end_week'], index['ctime'], index['class_location'], index['status']);
            this.courses.push(this.courseOne);
          }
        });
    }else{
      //学生课表
      d1=d1.append("studentId",userInfo.account);
      this.courseService.searchStuAllCourse(d1).subscribe(data=>{
        if(data.status==0){
          if(data['getAllCourseBySno']!==undefined)
          for(var indexs of data['getAllCourseBySno']){
            for(var index of indexs){
            this.courseOne = new Course(index['cno'], index['cname'], index['tid'], index['tname'], index['day'], index['start_week'], index['end_week'], index['ctime'], index['class_location'], index['status']);
            this.courses.push(this.courseOne);
            }
          }
        }
      });
    }

  }

  ngAfterViewInit(){

  }

  ngAfterViewChecked(){
    for(var index of this.courses){
      console.log(index);
      var id=index['courseTime']+""+index['courseDay'];
      document.getElementById(id).innerHTML=index['courseName']+"</br>"+index['courseDes']+"</br>"+"第"+index['courseStartWeek']+"~"+index['courseEndWeek']+"周";
    }
  }

  create(){
    this.router.navigateByUrl('base/classInfo/0');
  }

  remove(course:Course) {
    let d1 = new HttpParams();
    d1 = d1.append("cno", course.courseId);
    this.courseService.removeCourse(d1)
      .subscribe(data => {
        if (data.status == 0) {
          this.dialogService.addDialog(MessageComponent, {title: '删除课程', message: data.message});
            this.router.navigate(['./base/classInfo']);
        } else {
          this.dialogService.addDialog(MessageComponent, {title: '删除课程', message: data.message});
        }
      });
     }
}

