import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  form: FormGroup;
  studentId?: number;

  constructor(
    private fb: FormBuilder,
    private service: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    if(this.studentId) {
      this.service.getAll().subscribe(students => {
        const s = students.find(x => x.id === this.studentId);
        if(s) this.form.patchValue(s);
      });
    }
  }

  submit() {
    if(this.studentId) {
      this.service.update(this.studentId, this.form.value).subscribe(() => {
        this.service.refresh$.next();
        this.router.navigate(['/students']);
      });
    } else {
      this.service.create(this.form.value).subscribe(() => {
        this.service.refresh$.next();
        this.router.navigate(['/students']);
      });
    }
  }
}