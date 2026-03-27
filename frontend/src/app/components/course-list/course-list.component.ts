import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Course[] = [];

  constructor(private service: CourseService) {}

  ngOnInit(): void {
    this.load();
    this.service.refresh$.subscribe(() => this.load());
  }

  load() {
    this.service.getAll().subscribe(data => this.courses = data);
  }

  delete(id?: number) {
    if(id && confirm('Are you sure you want to delete this course?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }
}