//  Created by xyx on 2018/6/13.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaderResponse, HttpHeaders} from '@angular/common/http';
import {retry} from 'rxjs/operators';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
const url="http://140.143.1.156/zerg/public/api/v1/user/userLogin"

@Injectable()
export class LoginService {


  constructor(private https:HttpClient){}

  loginUserPost(user):any{
    return this.https.post(url,user,{headers:myheader});
  }

}
