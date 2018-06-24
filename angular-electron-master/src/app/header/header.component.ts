//  Created by xyx on 2018/6/1.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Component, OnInit } from '@angular/core';
import {LocalStorageProvider} from '../providers/LocalStorage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private storage:LocalStorageProvider,private route:Router) { }
  userName:string;
  dateTime:Date=new Date();
  ngOnInit() {
    let userInfo=this.storage.get("UserSession",null);
    this.userName=userInfo.name;
  }

  signOut(){
    this.route.navigate(['../']);
  }
}
