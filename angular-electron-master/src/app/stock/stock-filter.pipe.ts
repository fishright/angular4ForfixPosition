//  Created by xyx on 2018/6/12.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'stockFilter'
})
export class StockFilterPipe implements PipeTransform {

  transform(list:any[],field:string,keyword:string): any {
    if(!field||!keyword){
      return list;
    }
    return list.filter(item=>{
      let itemFieldValue=item[field].toLowerCase();
      return itemFieldValue.indexOf(keyword)>=0;
    });
  }

}
