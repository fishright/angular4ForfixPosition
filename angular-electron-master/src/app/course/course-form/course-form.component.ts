import {Component,OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Course, CourseService} from '../course.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {LocalStorageProvider} from '../../providers/LocalStorage';
import {DialogService} from 'ngx-bootstrap-modal';
import {MessageComponent} from '../../message/message.component';

declare  let laydate;

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  formModel:FormGroup;
  userInfo:any;
  public fb:FormBuilder=new FormBuilder();
  course:Course=new Course("0","","","","","","","","","");

  constructor(private routerInfo:ActivatedRoute,private courseService:CourseService,
              private router:Router,private storage:LocalStorageProvider,private dialogService:DialogService) { }

  ngOnInit() {
    let courseId=this.routerInfo.snapshot.params['id'];
    this.userInfo=this.storage.get("UserSession",null);

    this.formModel=this.fb.group({
      courseName:['',[Validators.required,Validators.minLength(2)]],
      courseDay:['',[Validators.required]],
      courseWeekInfo:this.fb.group({
        courseStartWeek:['',[Validators.required]],
        courseEndWeek:['',[Validators.required]],
      },{validator:this.courseWeekValidator}),
      courseTime:['',[Validators.required]],
      courseDes:['',[Validators.required]],
    });


    console.log("判断是修改还是创建"+courseId);//创建id为0，修改id>0;

  }
  cancel(){
    // this.router.navigate(['./base/classInfo']);
    this.router.navigateByUrl('base/classInfo');
  }
  save(){
     if(this.formModel.valid){
       let d1=new HttpParams();
       d1=d1.append("teacherId",this.userInfo.account);
       d1=d1.append("teacherName",this.userInfo.name);
       d1=d1.append("courseName",this.formModel.value.courseName);
       d1=d1.append("courseDay",this.formModel.value.courseDay);
       d1=d1.append("courseStartWeek",this.formModel.value.courseWeekInfo.courseStartWeek);
       d1=d1.append("courseEndWeek",this.formModel.value.courseWeekInfo.courseEndWeek);
       d1=d1.append("courseTime",this.formModel.value.courseTime);
       d1=d1.append("courseDes",this.formModel.value.courseDes);
       d1=d1.append("courseStatus","0");
       console.log("输入数据为何"+d1);
       this.courseService.createCourse(d1)
         .subscribe(data=>{
           if(data.status==0){
             this.dialogService.addDialog(MessageComponent,{title:'创建课程',message:data.message});
               this.router.navigate(['./base/classInfo']);
           }else{
             this.dialogService.addDialog(MessageComponent,{title:'创建课程',message:data.message});
           }
         });

     }
  }

  courseWeekValidator(info:FormControl):any{
    let courseStartWeek:FormControl=info.get('courseStartWeek') as FormControl;
    let courseEndWeek:FormControl=info.get('courseEndWeek') as FormControl;
    if(courseStartWeek!=null&&courseEndWeek!=null){
      let valid:boolean=(courseStartWeek.value<=courseEndWeek.value);
      console.log("courseWeekInfo是否通过验证"+valid);
      return valid?null:{courseStartWeek:{description:'起止周逻辑错误，请从新选择'}};
    }
    return null;
  }
}
