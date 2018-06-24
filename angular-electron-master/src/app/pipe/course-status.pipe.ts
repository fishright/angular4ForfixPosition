//  Created by xyx on 2018/6/13.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'courseStatus'
})
export class CourseStatusPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    if(value===0){
      return "开始签到";
    }else{
      return "已结束";
    }
  }

}
