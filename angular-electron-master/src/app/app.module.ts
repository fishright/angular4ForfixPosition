//  Created by xyx on 2018/5/23.
//  Copyright © 2018年 谢鑫. All rights reserved.
import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { StockManageComponent } from './stock/stock-manage/stock-manage.component';
import { StarsComponent } from './stars/stars.component';
import { RegisterComponent } from './register/register.component';
import { BaseComponent } from './base/base.component';
import {RouterModule} from '@angular/router';
import {StockService} from './stock/stock.service';
import { StockFormComponent } from './stock/stock-form/stock-form.component';
import { StockFilterPipe } from './stock/stock-filter.pipe';
import {UserService} from './user.service';
import {HttpModule} from '@angular/http';
import {LocalStorageProvider} from './providers/LocalStorage';
import { LoginComponent } from './login/login.component';
import { CourseManageComponent } from './course/course-manage/course-manage.component';
import { CourseFormComponent } from './course/course-form/course-form.component';
import {CourseService} from './course/course.service';
import {LoginService} from './login/login.service';
import { ArriveTableComponent } from './teacher/arrive-table/arrive-table.component';
import {ArriveListService} from './teacher/arrive-list.service';
import { CourseSelectComponent } from './student/course-select/course-select.component';
import {CourseSelectService} from './student/course-select.service';
import { CourseScoreComponent } from './teacher/course-score/course-score.component';
import { CourseScoreEditComponent } from './teacher/course-score-edit/course-score-edit.component';
import { MyArriveTableComponent } from './student/my-arrive-table/my-arrive-table.component';
import { FixStatusPipe } from './pipe/fix-status.pipe';
import {StudentArriveListService} from './student/student-arrive-list.service';
import { CourseStatusPipe } from './pipe/course-status.pipe';
import { ArriveHistoryTableComponent } from './teacher/arrive-history-table/arrive-history-table.component';
import { DetailComponent } from './detail/detail.component';
import {BootstrapModalModule, DialogService} from 'ngx-bootstrap-modal';
import {RegisterService} from './register/register.service';
import { MessageComponent } from './message/message.component';
import { CollegeNamePipe } from './pipe/college-name.pipe';
import { CourseToTimePipe } from './pipe/course-to-time.pipe';
import { CourseToPlacePipe } from './pipe/course-to-place.pipe';
import {DatePipe} from '@angular/common';
import { FixCourseStatusPipe } from './pipe/fix-course-status.pipe';
import { ComfirmComponent } from './comfirm/comfirm.component';
import {MessageStorageProvider} from './providers/MessageStorage';
import { ModalComponentComponent } from './modal-component/modal-component.component';
import { SeatNumbersComponent } from './student/seat-numbers/seat-numbers.component';
import { CheckSeatNumbersComponent } from './teacher/check-seat-numbers/check-seat-numbers.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    HeaderComponent,
    MenuComponent,
    SidebarComponent,
    FooterComponent,
    ContentComponent,
    StockManageComponent,
    StarsComponent,
    RegisterComponent,
    BaseComponent,
    StockFormComponent,
    StockFilterPipe,
    LoginComponent,
    CourseManageComponent,
    CourseFormComponent,
    ArriveTableComponent,
    CourseSelectComponent,
    CourseScoreComponent,
    CourseScoreEditComponent,
    MyArriveTableComponent,
    FixStatusPipe,
    CourseStatusPipe,
    ArriveHistoryTableComponent,
    DetailComponent,
    MessageComponent,
    CollegeNamePipe,
    CourseToTimePipe,
    CourseToPlacePipe,
    FixCourseStatusPipe,
    ComfirmComponent,
    ModalComponentComponent,
    SeatNumbersComponent,
    CheckSeatNumbersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BootstrapModalModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService,StockService,UserService,
    LocalStorageProvider,CourseService,LoginService,
    ArriveListService,CourseSelectService,StudentArriveListService,
   DialogService,RegisterService,DatePipe,MessageStorageProvider],
  entryComponents:[
    DetailComponent,
    CourseScoreEditComponent,
    MessageComponent,
    ComfirmComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
