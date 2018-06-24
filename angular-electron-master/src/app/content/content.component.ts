//  Created by xyx on 2018/6/1.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import 'rxjs/add/operator/filter'
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  pageTitie='';
  pageDesc='';
  constructor(public router:Router) {
    router.events
      .filter(event=>event instanceof NavigationEnd)
      .subscribe((event:NavigationEnd)=>{
        if(event.url=='/home') {
          this.pageTitie = "这里是首页";
          this.pageDesc = '';
        }else if(event.url.startsWith('/stock')){
          this.pageTitie="出勤一览";
          this.pageDesc="进行基本信息增删改查";
        }
      })
  }

  ngOnInit() {
  }

}
