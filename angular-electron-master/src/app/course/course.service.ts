import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
const createCourseUrl="http://140.143.1.156/zerg/public/api/v1/course/createCourse";
// const createCourseUrl="/api/v1/createCourse"
// const createCourseUrl="http://api.map.baidu.com/location/ip?ak=gh5OVEc95ztQAmc7UWdUqYpOAU9Z1UUR&coor=bd09ll";
const searchCourseUrl="http://140.143.1.156/zerg/public/api/v1/course/getCourseByTid";
const removeCourseUrl="http://140.143.1.156/zerg/public/api/v1/course/deleteCourseByCno";
const searchAllCourseUrl="http://140.143.1.156/zerg/public/api/v1/course/getAllCourse";
const searchStuAllCourseUrl="http://140.143.1.156/zerg/public/api/v1/course/getAllCourseBySno";

@Injectable()
export class CourseService {


  constructor(private https:HttpClient) { }

  public courses:Course[]=[
    // new Course("1",'软件工程训练','001' ,"",'1',"1",'18',"1","2","0"),
    // new Course("2",'信息安全','003',"",'2',"1",'18',"1","2","0"),
  ]
  //TODO 改成服务形式
  getCourses():Course[]{
    return this.courses;
  }
  //TODO 改成服务形式
  getCourse(id:string):Course{
    return this.courses.find(course=>course.courseId===id);
  }

  createCourse(course1):any{
    return this.https.post(createCourseUrl,course1,{headers:myheader});
  }

  searchCourse(course):any{
    return this.https.post(searchCourseUrl,course,{headers:myheader});
  }

  removeCourse(course):any{
    return this.https.post(removeCourseUrl,course,{headers:myheader});
  }

  searchAllCourse():any{
    return this.https.post(searchAllCourseUrl,"",{headers:myheader});
  }

  searchStuAllCourse(course):any{
    return this.https.post(searchStuAllCourseUrl,course,{headers:myheader});
  }



}
export class Course{
  constructor(
    public courseId:string,
    public courseName:string,
    public teacherId:string,
    public teacherName:string,
    public courseDay:string,
    public courseStartWeek:string,
    public courseEndWeek:string,
    public courseTime:string,
    public courseDes:string,
    public courseStatus:string,
  ){
  }
}

