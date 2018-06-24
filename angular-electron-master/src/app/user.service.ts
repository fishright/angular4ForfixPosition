//  Created by xyx on 2018/6/12.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  constructor() { }
  public users:User[]=[
    new User("170327106","fishright","123456","谢鑫","1",17689699227,"42776931@qq.com","170327106","2")
  ];
  //TODO 改成发服务
  getUsers():User[]{
    return this.users;
  }
  //TODO 改成发服务
  getUser(id:string):User{
    return this.users.find(user=>user.id===id);
  }
}
export  class User{
  constructor(
    public id:string,
    public username:string,
    public password:string,
    public name:string,
    public role:string,
    public mobile:number,
    public email:string,
    public account:string,
    public college:string)
  {
  }
}
