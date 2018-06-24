//  Created by xyx on 2018/6/1.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
    // this.route.navigate(['./base/classInfo']);
  }

}
