//  Created by xyx on 2018/6/13.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'collegeToName'
})
export class CollegeNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value==='1'){
      return "海洋学院";//那是我以前的学院～～～by福大海洋
    }
    else if(value==='2'){
      return "数学与计算机科学学院";
    }
    else if(value==='3'){
      return "物理与信息工程学院";
    }
    else if(value==='4'){
      return "经济与管理学院";
    }
    else if(value==='5'){
      return "人文与社会科学学院";
    }
    else if(value==='6'){
      return "石油与化工学院";
    }
    else if(value==='7'){
      return "厦门工艺美院";
    }
    else if(value==='8'){
      return "机械及其自动化学院";
    }
    else if(value==="9"){
      return "电器工程及其自动化学院";
    }
    return "其他";
  }

}
