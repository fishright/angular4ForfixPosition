//  Created by xyx on 2018/6/13.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'courseToTime'
})
export class CourseToTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value==='1'){
      return "上午1-2节";
    }else if(value==='2'){
      return "上午3-4节";
    }else if(value==='3'){
      return "下午5-6节";
    }else if(value==='4'){
      return "下午7-8节";
    }else{
      return "晚上9-10节";
    }
  }


}
