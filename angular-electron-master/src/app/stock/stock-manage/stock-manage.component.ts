//  Created by xyx on 2018/6/2.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Component, OnInit } from '@angular/core';
import {Stock, StockService} from '../stock.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import "rxjs/Rx"
import {Observable} from 'rxjs';

@Component({
  selector: 'app-stock-manage',
  templateUrl: './stock-manage.component.html',
  styleUrls: ['./stock-manage.component.scss']
})
export class StockManageComponent implements OnInit {

  // public stocks:Array<Stock>;
  public stocks:Observable<Stock[]>;
  public nameFilter:FormControl=new FormControl();
  public keyword:string;
  constructor(public router:Router,private stockService:StockService) { }

  ngOnInit() {
    this.stocks=this.stockService.getStocks();
    this.nameFilter.valueChanges
      .debounceTime(500)
      .subscribe(value=>this.keyword=value)
  }
  create(){
    this.router.navigateByUrl('/stock/0');
  }
  update(stock:Stock){
    this.router.navigateByUrl('/stock/'+stock.id);
  }

}
