import { Component,input,output} from '@angular/core';
import { Student } from '../../models/student.models';
import { RouterLink } from '@angular/router';
@Component({
imports: [RouterLink],
  selector: 'app-student-card',
  styleUrl: './student-card.css',
  templateUrl: './student-card.html',
})
export class StudentCard {
  student = input.required<Student>();
  studentDeleted = output<number>();
}