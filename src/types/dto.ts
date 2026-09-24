export interface StudentDto {
  id: number;
}

export class createAbsenceDto {
  absenceDate?: Date;
  studentId!: number;
  studentName!: string;
  studentSurname!: string;
  studentClass!: string;
}
