import { Component,input,output} from '@angular/core';
import { Student } from '../../models/student.models';
@Component({
  imports: [],
  selector: 'app-student-card',
  styleUrl: './student-card.css',
  templateUrl: './student-card.html',
})
export class StudentCard {
  student = input.required<Student>();
  studentDeleted = output<number>();
}