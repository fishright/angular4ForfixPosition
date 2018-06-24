//  Created by xyx on 2018/6/17.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Course, CourseService} from '../../course/course.service';
import {Arrive, ArriveListService} from '../arrive-list.service';
import {LocalStorageProvider} from '../../providers/LocalStorage';
import {HttpParams} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {DialogService} from 'ngx-bootstrap-modal';
import {MessageComponent} from '../../message/message.component';

/**
 * create by 天才卡题少男谢鑫 2018-6-14
 */
declare var BMap;
declare  let laydate;
@Component({
  selector: 'app-arrive-table',
  templateUrl: './arrive-table.component.html',
  styleUrls: ['./arrive-table.component.scss']
})
export class ArriveTableComponent implements OnInit {

  formModel:FormGroup;
  public fb:FormBuilder=new FormBuilder();
  //TODO 改成服务请求，参照stock-manage.component.ts
  public courses:Array<Course>=[];
  public courseOne:Course;
  public arriveList:Array<Arrive>=[];
  public dateTime:Date;
  public userName:string="";
  public userId:string="";
  map:any;
  point:any;
  isPro:boolean=true;
  bfixPosition:any;
  fixPosition:any;
  userInfo:any;
  constructor(private routerInfo:ActivatedRoute,private courseService:CourseService,
              private router:Router,private arriveListService:ArriveListService,private storage:LocalStorageProvider,private datePipe:DatePipe,
              private dialogService:DialogService) { }

  ngOnInit() {
    this.dateTime=new Date();
    let nowDate=this.datePipe.transform(this.dateTime,'yyyy-MM-dd HH:mm:ss');
    var start=laydate.render({
      elem:'#EarlyArrive',
      type:'datetime',
      theme:'#4DC6FD',
      min: nowDate,
      max: '2099-06-16 23:59:59', //最大日期
      istime: true, //必须填入时间
      change:function(datas) {
        console.log("是时间");
        end.min = datas; //开始日选好后，重置结束日的最小日期
        end.start = datas //将结束日的初始值设定为开始日
      },
      done:(value,data,endDate)=> {
        console.log(value)
        this.formModel.patchValue({
          arriveInfo:{
            earlyArrive:value
          }
        });
      }

    });
    var end=laydate.render({
      elem:'#LateLyArrive',
      type:'datetime',
      theme:'#4DC6FD',
      min: nowDate,
      max: '2099-06-16 23:59:59', //最大日期
      istime: true, //必须填入时间
      change:function(datas){
        start.max = datas; //结束日选好后，重置开始日的最大日期
      },
      done:(value,data,endDate)=>{
        this.formModel.patchValue({
          arriveInfo:{
            latelyArrive:value
          }
        });
      }
    });

    //找到当前登陆用户
    this.userInfo=this.storage.get("UserSession",null);
    this.userName=this.userInfo.name;
    this.userId=this.userInfo.account;

    //查询可选课程
    let d1=new HttpParams();
    d1=d1.append('teacherId',this.userInfo.account);
    d1=d1.append('role',this.userInfo.role);
    this.courseService.searchCourse(d1)
      .subscribe(data=>{
        if(data['course']!==undefined)
        for(var index of data['course']){
          this.courseOne=new Course(index['cno'], index['cname'], index['tid'], index['tname'], index['day'], index['start_week'], index['end_week'], index['ctime'], index['class_location'], index['status'])
          this.courses.push(this.courseOne);
        }
      })

    this.formModel=this.fb.group({
      courseId:['',[Validators.required]],
      fixPosition:['',[Validators.required]],
      allowScale:['',[Validators.required]],
      arriveInfo:this.fb.group({
        earlyArrive:['',[Validators.required]],
        latelyArrive:['',[Validators.required]]
      },{validator:this.arriveValidator})
    });
    this.searchArriveTableList();
  }

  searchArriveTableList(){
    let searchId=new HttpParams();
    searchId=searchId.append("teacherId",this.userInfo.account);
    searchId=searchId.append("role",this.userInfo.role);
    this.arriveListService.searchArriveList(searchId)
      .subscribe(data=>{
        console.log(data);
        if(data.status=='0')
          for(var index of data['checkIn']){
            console.log(index['id']);
            console.log("状态"+index['status']);
            this.arriveList.push(new Arrive(index['id'],index['cno'],index['cname'],index['tid'],index['early_arrive'],index['lately_arrive'],index['tname'],index['arrive_people'],index['fix_position'],index['status'],index['mobile_position']));
          }
      });
  }

  ngAfterViewChecked(){

  }


  //创建课程签到表（教师端）
  create(){
    this.arriveList=[];
    if(this.formModel.valid){
      let d1=new HttpParams();
      d1=d1.append('id','');
      d1=d1.append('courseId',this.formModel.value.courseId);
      d1=d1.append('courseName',document.getElementById(this.formModel.value.courseId).innerText);
      d1=d1.append('earlyArrive',this.formModel.value.arriveInfo.earlyArrive);
      d1=d1.append('latelyArrive',this.formModel.value.arriveInfo.latelyArrive);
      d1=d1.append('teacherId',this.userId);
      d1=d1.append('teacherName',this.userName);
      d1=d1.append('arrivePeople','0');
      d1=d1.append('fixPosition',this.formModel.value.fixPosition+" "+this.formModel.value.allowScale);
      d1=d1.append('status','0');
      d1=d1.append('mobilefixPosition','');
      this.arriveListService.createCoursePositionTable(d1)
        .subscribe(data=>{
          if(data.status==0){
            this.dialogService.addDialog(MessageComponent,{title:'课程签到表',message:'创建成功'});
            this.searchArriveTableList();
          }else{
            this.dialogService.addDialog(MessageComponent,{title:'课程签到表',message:data.message})
          }
        });
      }
    }
    //创建课程签到表-定位功能
  createPosition(){
     this.isPro=false;
     this.locadMap();
  }
  arriveValidator(info:FormControl):any{
    let earlyArrive:FormControl=info.get('earlyArrive') as FormControl;
    let latelyArrive:FormControl=info.get('latelyArrive') as FormControl;
    console.log("拿到"+earlyArrive.value);
    if(earlyArrive!=null&&latelyArrive!=null){
      let valid:boolean=(earlyArrive.value<latelyArrive.value);
      console.log("是否合法"+valid);
      return valid?null:{earlyArrive:{description:'开始周必须小于结束周'}};
    }
    return null;
  }

  //TODO 修改签到表状态，通过id查询该条记录，并把status字段更改为>0的数即可 这边有错
  change(id){
    this.arriveList=[];
      console.log(id);
      let d1=new HttpParams();
      d1=d1.append('arriveListId',id);
      this.arriveListService.editCoursefixPositionStatus(d1)
        .subscribe(data=>{
          if(data.status==0){
            this.dialogService.addDialog(MessageComponent,{title:'修改签到表状态',message:'修改成功'});
            this.searchArriveTableList();
          }else{
            this.dialogService.addDialog(MessageComponent,{title:'修改签到表状态',message:'修改失败'})
          }
        },err=>{
          this.dialogService.addDialog(MessageComponent,{title:'修改签到表状态',message:"发送未知错误"});
        });
  }
  locadMap(){
    this.map=new BMap.Map('conntainerBaidu');
    this.point=new BMap.Point(119.183572,26.072331);
    this.map.centerAndZoom(this.point,15);
    this.map.enableScrollWheelZoom(true);
    // this.map.addEventListener('click',function(e){
    //   // this.formModel.patchValue({
    //   //   fixPosition:e.point.lng+','+e.point.lat
    //   // });
    //   this.fixPosition=e.point.lng+','+e.point.lat;
    //   console.log("___"+this.fixPosition);
    //   alert(e.point.lng+','+e.point.lat);
    //   this.isPro=true;
    // });
    this.map.addEventListener('click',e=>{
      this.formModel.patchValue({
        fixPosition:e.point.lng+' '+e.point.lat
      })
      this.isPro=true;
    });
}
}
