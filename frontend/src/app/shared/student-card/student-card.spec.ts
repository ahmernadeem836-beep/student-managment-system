import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { StudentCard } from './student-card';

describe('StudentCard', () => {
  let component: StudentCard;
  let fixture: ComponentFixture<StudentCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentCard);
    fixture.componentRef.setInput('student', {
      id: 1,
      name: 'Test Student',
      email: 'student@example.com',
      age: 20,
      department_id: 1,
      enrolled_date: '2026-01-01',
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
