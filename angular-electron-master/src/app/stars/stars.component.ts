//  Created by xyx on 2018/6/1.
//  Copyright © 2018年 谢鑫. All rights reserved.
import {Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit {

  @Input()
  rating:number=0;

@Output()
  ratingChange:EventEmitter<number>=new EventEmitter<number>();

@Input()
  readonly :boolean=false;


  stars:boolean[];
  constructor() { }

  ngOnInit() {
    this.stars=[];
    for(let i=1;i<=18;i++){
      this.stars.push(i>this.rating);
    }
  }
  ngOnChanges(changes:SimpleChanges):void{
    this.stars=[];
    for(let i=1;i<=18;i++){
      this.stars.push(i>this.rating);
    }
  }
  clickStar(index:number){
    if(this.readonly){
      this.rating=index+1;
      this.stars=[];
      for(let i=1;i<=18;i++){
        this.stars.push(i>this.rating);
      }
      this.ratingChange.emit(this.rating);
    }
  }

}
