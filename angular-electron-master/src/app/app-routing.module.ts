//  Created by xyx on 2018/5/23.
//  Copyright © 2018年 谢鑫. All rights reserved.
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StockManageComponent} from './stock/stock-manage/stock-manage.component';
import {BaseComponent} from './base/base.component';
import {RegisterComponent} from './register/register.component';
import {StockFormComponent} from './stock/stock-form/stock-form.component';
import {LoginComponent} from './login/login.component';
import {CourseManageComponent} from './course/course-manage/course-manage.component';
import {CourseFormComponent} from './course/course-form/course-form.component';
import {ArriveTableComponent} from './teacher/arrive-table/arrive-table.component';
import {CourseSelectComponent} from './student/course-select/course-select.component';
import {CourseScoreComponent} from './teacher/course-score/course-score.component';
import {MyArriveTableComponent} from './student/my-arrive-table/my-arrive-table.component';
import {ArriveHistoryTableComponent} from './teacher/arrive-history-table/arrive-history-table.component';
import {SeatNumbersComponent} from './student/seat-numbers/seat-numbers.component';
import {CheckSeatNumbersComponent} from './teacher/check-seat-numbers/check-seat-numbers.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'base',component:BaseComponent,
    children:[
      {path:'classInfo',component:CourseManageComponent},
      {path:'classInfo/:id',component:CourseFormComponent},
      {path:'hasArrive',component:ArriveTableComponent},
      {path:'courseSelect',component:CourseSelectComponent},
      {path:'courseScore',component:CourseScoreComponent},
      {path:'myArrive',component:MyArriveTableComponent},
      {path:'arriveHistory',component:ArriveHistoryTableComponent},
      {path:'seatNumber',component:SeatNumbersComponent,data:[{isPro:true}]},
      {path:'checkSeatNumber/:id',component:CheckSeatNumbersComponent,data:[{isPro:true}]}
    ]
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
