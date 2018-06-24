//  Created by xyx on 2018/6/1.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Stock, StockService} from '../stock.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.scss']
})
export class StockFormComponent implements OnInit {

  formModel:FormGroup;
  stock:Stock=new Stock(0,"",0,0,"",[]);
  categories=["计算机科学与技术","软件工程","网络安全","大数据科学","计算科学"]
  constructor(private router:Router,private routerInfo:ActivatedRoute,private stockService:StockService) { }

  ngOnInit() {
    let stockId=this.routerInfo.snapshot.params['id'];
    // this.stock=this.stockService.getStock(stockId);
    // this.stockService.getStock(stockId);
    let fb=new FormBuilder();
    this.formModel=fb.group({
      name:['',[Validators.required,Validators.minLength(2)]],
      price:['',Validators.required],
      desc:[''],
      categories:fb.array([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
      ],this.categoriesSelectValidator)

    });
    this.stockService.getStock(stockId).subscribe(
      data=>{
        this.stock=data;
        this.formModel.reset({
          name:data.name,
          price:data.price,
          desc:data.desc,
          categories:[
            data.categories.indexOf(this.categories[0])!=-1,
            data.categories.indexOf(this.categories[1])!=-1,
            data.categories.indexOf(this.categories[2])!=-1,
            data.categories.indexOf(this.categories[3])!=-1,
            data.categories.indexOf(this.categories[4])!=-1,

          ]
        })
      }
    );
  }

  categoriesSelectValidator(control:FormArray){
    var valid=false;
    control.controls.forEach(control=>{
      if(control.value){
        valid=true;
      }
    });
    if(valid){
      return null;
    }else{
      return {categoriesLength:true}
    }
  }

  cancel(){
    // this.router.navigateByUrl('/stock');
   this.router.navigate(['./'])
  }
  save(){
    var chineseCategories=[];
    var index=0;
    for(var i=0;i<5;i++){
      if(this.formModel.value.categories[i]){
        chineseCategories[index++]=this.categories[i];
      }
    }
    this.formModel.value.categories=chineseCategories;
    this.formModel.value.rating=this.stock.rating;
    console.log(this.formModel.value);
     this.router.navigate(['./base/stock'])
  }

}
