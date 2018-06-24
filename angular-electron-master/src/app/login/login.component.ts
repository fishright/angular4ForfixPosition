//  Created by xyx on 2018/6/13.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {User, UserService} from '../user.service';
import {LocalStorageProvider} from '../providers/LocalStorage';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {Observable} from 'rxjs/Rx';
import {BootstrapModalModule, DialogService} from 'ngx-bootstrap-modal';
import {DetailComponent} from '../detail/detail.component';
import {MessageComponent} from '../message/message.component';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public users:Array<User>;
  public idFilter:FormControl=new FormControl();
  public pwFilter:FormControl=new FormControl();
  public inID:string;
  public inPW:string;
  public data:Observable<string>;
  public user:User;
  // public imgs:Array<string>=[
  //      "/assets/img/backgrounds/1.jpg","/assets/img/backgrounds/2.jpg"
  // ]
  imgs = ["url(/assets/img/backgrounds/1.jpg)","url(/assets/img/backgrounds/2.jpg)"];

  public imgFzu:string="/assets/img/fzu.jpg";
  public messageArray:Array<string>=[
    "福州大学欢迎您","欢迎报考数学与计算机学院","有大神池老标老师"
  ]

  // public imgs = ["url(/assets/img/backgrounds/1.jpg)","url(/assets/img/backgrounds/2.jpg)"];



  constructor(public router:Router,private userService:UserService,
              private storage:LocalStorageProvider,private loginService:LoginService,public dialogService: DialogService) { }
  ngOnInit() {
    this.users=this.userService.getUsers();
    this.idFilter.valueChanges
      .debounceTime(500)
      .subscribe(value=>this.inID=value);
    this.pwFilter.valueChanges
      .debounceTime(500)
      .subscribe(value=>this.inPW=value);

  }
  login(){
    if(this.inID==''||this.inPW==''){
      this.dialogService.addDialog(MessageComponent,{title:'用户登陆',message:"账号或密码为空"});
      return;
    }
    //查询数据库
    let d1=new HttpParams();
    d1=d1.append("user_name",this.inID);
    d1=d1.append("password",this.inPW);
    console.log(d1);
    this.loginService.loginUserPost(d1)
      .subscribe(data=>{
        console.log("登陆给我的信息"+data.status);
        // console.log(data['user'][0]);
        if(data.status==0){
          this.dialogService.addDialog(MessageComponent,{titile:'用户登陆',message:data.message});
          let userSession={
            id:data['user'][0].id,
            password:data['user'][0].password,
            name:data['user'][0].name,
            role:data['user'][0].authority,
            mobile:data['user'][0].phone_num,
            email:data['user'][0].email,
            username:data['user'][0].user_name,
            account:data['user'][0].jnum,
            college:data['user'][0].college,
          }
          this.storage.set("UserSession",userSession);
          this.router.navigate(['/base']);
        }else{
          this.dialogService.addDialog(MessageComponent,{titile:'用户登陆',message:data.message});
        }
      });

  }
  register(){
    this.router.navigate(['/register']);
  }
  title = 'app';
  showAlert() {
    this.dialogService.addDialog(DetailComponent, { title: 'Alert title!', message: 'Alert message!!!' });
  }

  ngAfterViewInit(){
    this.initView();
  }
  public initView(){

    var swiper = new Swiper('.swiper-banner', {
      pagination: '.swiper-pagination',
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      paginationClickable: true,
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: 2500,
      autoplayDisableOnInteraction: false,
      loop: true,
    });

    var swiper1 = new Swiper('.swiper-message', {
      pagination: '.swiper-pagination',
      spaceBetween: 5,
      centeredSlides: true,
      autoplay: 3500,
      autoplayDisableOnInteraction: false,
      loop: true,
      direction: 'vertical'
    });
  }

}
