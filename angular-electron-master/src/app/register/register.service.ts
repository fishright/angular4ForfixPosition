//  Created by xyx on 2018/6/12.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions, Headers, Http } from '@angular/http';
//angular4得用httpClient,我是天才--create by 谢鑫

const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

// const url='/api/v1/userRegister'
const url="http://140.143.1.156/zerg/public/api/v1/user/userRegister";

const url1="http://api.map.baidu.com/location/ip?ak=gh5OVEc95ztQAmc7UWdUqYpOAU9Z1UUR&coor=bd09ll"

let headers=new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); //第一处区别
let options=new RequestOptions({headers:headers}); //第二处区别

//方法三


@Injectable()
export class RegisterService {
  constructor(private https:HttpClient,private http:Http){}

  registerUserPost(user):any{
    return this.https.post(url,user,{headers:myheader});
  }

  registerUserPostHttp(user):any{
    return this.http.post(url,user,options);
  }

  registerUserGetHttp(user):any{
    return this.http.get(url,{params:user});
  }
}
