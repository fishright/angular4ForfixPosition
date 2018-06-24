//  Created by xyx on 2018/6/12.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';

@Injectable()
export class StockService {

  constructor(public http:Http) { }
  //   public  stocks:Stock[]= [
  //   new Stock (1, "唐嫣" , 1 , 1 , "测试一下签到系统" , [ "计算机科学与技术"]),
  //   new Stock (2, "AKB48" , 2 , 2 , "测试一下签到系统" , [ "软件工程" ]),
  //   new Stock (3, "罗晋" , 3 , 3 , "测试一下签到系统" , [ "网络安全" ]),
  //   new Stock (4, "杨紫" , 4 , 10 , "测试一下签到系统" , [ "大数据科学" ]),
  //   new Stock (5, "张一山" , 5 , 9 , "测试一下签到系统" , ["计算科学" ]),
  //   new Stock (6, "小糯米" , 6 , 6 , "测试一下签到系统" , [ "计算科学" ]),
  //   new Stock (7, "习大大" , 7 , 7 , "测试一下签到系统" , [ "计算科学"]),
  //   new Stock (8, "杨幂" , 8, 8 , "测试一下签到系统" , [ "计算机科学与技术" ]),
  // ];
  // getStocks():Stock[]{
  //   return this.stocks;
  // }
  getStocks():Observable<Stock[]>{
    return this.http.get('/api/stock').map(res=>res.json());
  }
  getStock(id:number):Observable<Stock>{
    return this.http.get("/api/stock/"+id).map(res=>res.json());
  }
  // getStock(id:number):Stock{
  //   var stock=this.stocks.find(stock=>stock.id==id);
  //   if(!stock){
  //     stock=  new Stock (0, "" , 0, 0 , "" , [ "IT" , "Enging" ]);
  //   }
  //   return stock;
  // }
}
export  class Stock {
  constructor(   public id: number,
                 public name: string,
                 public price: number,
                 public rating: number,
                 public desc: string,
                 public categories: Array<String>) {
  }
}
