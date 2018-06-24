//  Created by xyx on 2018/6/1.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User, UserService} from '../user.service';
import {LocalStorageProvider} from '../providers/LocalStorage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menus:Array<Menu>;
  menusForStudent:Array<Menu>;
  menusForTeacher:Array<Menu>;
  currentMenuId:number=1;
  userName:string;
  constructor(public router:Router,private userService:UserService,private storage:LocalStorageProvider){

  }
  ngOnInit() {
    let userInfo=this.storage.get("UserSession",null);
    this.userName=userInfo.name;
    this.menusForStudent=[
      new Menu(1,'课程表','classInfo'),
      new Menu(2,"学期选课",'courseSelect'),
      new Menu(3,'课程签到','myArrive'),
    ];
    this.menusForTeacher=[
      new Menu(1,'课程信息','classInfo'),
      new Menu(2,"学生成绩",'courseScore'),
      new Menu(3,'课程签到记录','hasArrive'),
      new Menu(4,'请假/旷课记录','arriveHistory'),
    ]
    if(userInfo.role=='1'){
      this.menus=this.menusForStudent;
    }else{
      this.menus=this.menusForTeacher;
    }
  }

  nav(menu:Menu){
    // this.router.navigateByUrl(menu.link)
    console.log(menu.link)
    this.router.navigate(["base/"+menu.link])
    this.currentMenuId=menu.id;
  }

}
export class Menu{
  constructor(
    public id:number,
    public name:string,
    public link:string,
  ){

  }
}
