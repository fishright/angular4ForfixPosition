import { CourseToTimePipe } from './course-to-time.pipe';

describe('CourseToTimePipe', () => {
  it('create an instance', () => {
    const pipe = new CourseToTimePipe();
    expect(pipe).toBeTruthy();
  });
});
