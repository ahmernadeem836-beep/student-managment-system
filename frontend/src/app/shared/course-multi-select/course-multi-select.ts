import { Component, input, output } from '@angular/core';
import { Course } from '../../models/course.models';

@Component({
  selector: 'app-course-multi-select',
  standalone: true,
  templateUrl: './course-multi-select.html',
  styleUrl: './course-multi-select.css'
})
export class CourseMultiSelect {

  courses = input<Course[]>([]);
  selectedCourseIds = input<number[]>([]);

  selectedCourseIdsChange = output<number[]>();

  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  toggleCourse(courseId: number) {
    const selected = this.selectedCourseIds();

    if (selected.includes(courseId)) {
      this.selectedCourseIdsChange.emit(
        selected.filter(id => id !== courseId)
      );
    } else {
      this.selectedCourseIdsChange.emit([
        ...selected,
        courseId
      ]);
    }
  }

  isSelected(courseId: number) {
    return this.selectedCourseIds().includes(courseId);
  }
}