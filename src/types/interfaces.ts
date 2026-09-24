export interface AbsenceAttributes {
  id?: number;
  absenceDate: Date;
  studentId: number;
  studentName: string;
  studentSurname: string;
  studentClass: string;
  absenceReturnId?: number;
  return?: AbsenceReturnAttributes;
  alerts?: AlertSentAttributes[];
}

export interface AbsenceReturnAttributes {
  id?: number;
  returnDate: Date;
  reason: string;
  absence?: AbsenceAttributes;
}

export interface AlertSentTypeAttributes {
  id?: number;
  name: string;
  alerts?: AlertSentAttributes[];
}

export interface AlertSentAttributes {
  id?: number;
  absenceId: number;
  alertSentTypeId: number;
  alertSentAt: Date;
  contactDetails: string;
  absence?: AbsenceAttributes;
  alertSentType?: AlertSentTypeAttributes;
}
