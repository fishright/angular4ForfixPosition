//  Created by xyx on 2018/6/13.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'fixCourseStatus'
})
export class FixCourseStatusPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    //数据他返回为number字段，这里也需要改成number字段
    if(value===0){
      return '开启';
    }else{
      return '关闭';
    }
  }

}
