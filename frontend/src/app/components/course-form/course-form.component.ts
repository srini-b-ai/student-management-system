import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourseService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  form: FormGroup;
  courseId?: number;

  constructor(
    private fb: FormBuilder,
    private service: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    if(this.courseId) {
      this.service.getAll().subscribe(courses => {
        const c = courses.find(x => x.id === this.courseId);
        if(c) this.form.patchValue(c);
      });
    }
  }

  submit() {
    if(this.courseId) {
      this.service.update(this.courseId, this.form.value).subscribe(() => {
        this.service.refresh$.next();
        this.router.navigate(['/courses']);
      });
    } else {
      this.service.create(this.form.value).subscribe(() => {
        this.service.refresh$.next();
        this.router.navigate(['/courses']);
      });
    }
  }
}