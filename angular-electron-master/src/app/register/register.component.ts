//  Created by xyx on 2018/6/15.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User, UserService} from '../user.service';
import {Observable} from 'rxjs';
import {RegisterService} from './register.service';
import {DialogService} from 'ngx-bootstrap-modal';
import {MessageComponent} from '../message/message.component';
import {HttpParams} from '@angular/common/http';
import {URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {LocalStorageProvider} from '../providers/LocalStorage';

const url='/api/v1/userRegister'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formModel:FormGroup;
  public fb:FormBuilder=new FormBuilder();
  public userList:User;
  title:string="用户注册";
  message:string="";
  constructor(public router:Router,private registerService:RegisterService,private dialogService:DialogService,
              private storage:LocalStorageProvider){}
  ngOnInit(){
       this.formModel=this.fb.group({
         email:['',[Validators.email]],
         mobile:['',this.mobileValidator,this.moblieAsyncValidator],
         username:['',[Validators.required]],
         account:['',[Validators.required]],
         name:['',[Validators.required]],
         passwordInfo:this.fb.group({
           password:['',Validators.required],
           passwordConfirm:['']
         },{validator:this.passwordValidator}),
         role:['',Validators.required],
         college:['',Validators.required]
       })
  }

  //TODO 注册
  createUser() {
    //以下用的是HttpClient请求方式，注意mac的chrome跨域转发安全策略必须关闭
    //合法提交表单，发送http存储数据, 其实也不需要HttpParams()
    if (this.formModel.valid) {
     // 方法一：httpClient
      let d1=new HttpParams();
      d1=d1.append('id','');
      d1= d1.append('password',this.formModel.value.passwordInfo.password);
      d1=d1.append("user_name",this.formModel.value.username);
      d1=d1.append('name',this.formModel.value.name);
      d1=d1.append('role',this.formModel.value.role);
      d1= d1.append('mobile',this.formModel.value.mobile);
      d1= d1.append('email',this.formModel.value.email);
      d1=d1.append('account',this.formModel.value.account);
      d1=d1.append('college',this.formModel.value.college)
      console.log("输入数据为何"+d1);
      this.registerService.registerUserPost(d1).
        subscribe(data=>{
        if(data.status==0) {
          this.dialogService.addDialog(MessageComponent, {title: this.title, message: data.message})
          this.router.navigate(['./login'])
        }
      });
    }
  }

  cancel(){
    this.router.navigate(['./login']);
  }

  //合法性验证
  mobileValidator(mobile:AbstractControl):any{
    let value=(mobile.value||'')+'';
    var myreq= /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    let valid=myreq.test(value);
    console.log('mobile是否校验通过:'+valid);
    return valid?null:{mobile:true};//即返回不通过是返回mobile:true;
  }
  moblieAsyncValidator(mobile:AbstractControl):any {
    let value = (mobile.value || '') + '';
    var myreq = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    let valid = myreq.test(value);
    console.log('mobile是否校验通过:' + valid);
    return Observable.of(valid ? null : {mobile: true}).delay(5000);
  }

  passwordValidator(info:FormControl):any{
    let password:FormControl=info.get('password') as FormControl;//即还是通过FormContol去找password；
    let pConfirm:FormControl=info.get('passwordConfirm') as FormControl;
    if(password!=null&&pConfirm!=null){
      let valid:boolean=password.value===pConfirm.value;
      console.log('password是否校验通过'+valid);
      return valid?null:{password:{description:'密码和确认密码不匹配'}};
    }
    return null;
  }
}

//方法二:http
// let d1=new URLSearchParams();
// d1.append('id','');
// d1.append('password',this.formModel.value.passwordInfo.password);
// d1.append('name',this.formModel.value.name);
// d1.append('role',this.formModel.value.role);
// d1.append('mobile',this.formModel.value.mobile);
// d1.append('email',this.formModel.value.email);
// d1.append('account',this.formModel.value.email);
// d1.append('college',this.formModel.value.college)
// this.registerService.registerUserPostHttp(d1).subscribe(data=>{
//    console.log(data);
// });

//方法三：get
// this.registerService.registerUserGetHttp(d1).subscribe(data=>{
//   console.log(data)
// })
