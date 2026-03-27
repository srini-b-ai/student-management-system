import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseFormComponent } from './components/course-form/course-form.component';

const routes: Routes = [
  { path: 'students', component: StudentListComponent },
  { path: 'student-form', component: StudentFormComponent },
  { path: 'student-form/:id', component: StudentFormComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'course-form', component: CourseFormComponent },
  { path: 'course-form/:id', component: CourseFormComponent },
  { path: '', redirectTo: 'students', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }