import { Component,input,output} from '@angular/core';

@Component({
  imports: [],
  selector: 'app-student-card',
  styleUrl: './student-card.css',
  templateUrl: './student-card.html',
})
export class StudentCard {
student = input.required<{ name: string; course: string }>();
studentDeleted = output<string>();
}
