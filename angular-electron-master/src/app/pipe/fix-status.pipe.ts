//  Created by xyx on 2018/6/13.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'fixStatus'
})
export class FixStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value==='0'||value===null||value==='null'){
      return "未签到";
    }else if(value==="1"){
      return "请假"
    }else{
      return "已签到"
    }
  }

}
