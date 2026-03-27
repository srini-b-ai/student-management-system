import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: Student[] = [];

  constructor(private service: StudentService) {}

  ngOnInit(): void {
    this.load();
    this.service.refresh$.subscribe(() => this.load());
  }

  load() {
    this.service.getAll().subscribe(data => this.students = data);
  }

  delete(id?: number) {
    if(id && confirm('Are you sure you want to delete this student?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }
}