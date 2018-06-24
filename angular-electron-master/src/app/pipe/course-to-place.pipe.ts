//  Created by xyx on 2018/6/13.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'courseToPlace'
})
export class CourseToPlacePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value==='1')
      return "公共教学区";
    else if(value==='2')
      return "数学与计算机学院楼";
    else
      return "文科教学楼";
  }

}
