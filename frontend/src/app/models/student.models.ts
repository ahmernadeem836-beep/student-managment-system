export interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  department_id: number;
  enrolled_date: string;

  department?: {
    id: number;
    name: string;
  };

  courseIds?: number[];
}