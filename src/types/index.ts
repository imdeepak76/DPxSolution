export type UserRole = 'SUPER_ADMIN' | 'PRINCIPAL' | 'ACCOUNTANT' | 'TEACHER' | 'CLERK' | 'STUDENT' | 'PARENT';

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'HALF_DAY' | 'EXCUSED';

export interface InstituteProfile {
  id: string;
  name: string;
  branchName: string;
  code: string;
  affiliationNumber: string;
  email: string;
  phone: string;
  address: string;
  currency: string;
  currencySymbol: string;
  academicYear: string;
  currentTerm: string;
  logoUrl?: string;
  tagline: string;
  establishedYear: number;
}

export interface Student {
  id: string;
  admissionNo: string;
  rollNo: string;
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  dob: string;
  bloodGroup: string;
  classId: string;
  className: string;
  section: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianRelation: string;
  address: string;
  status: 'ACTIVE' | 'INACTIVE' | 'TRANSFERRED' | 'SUSPENDED';
  admissionDate: string;
  photoUrl: string;
  siblings?: string[];
  totalFeeAssessed: number;
  totalFeePaid: number;
  scholarshipPercentage?: number;
}

export interface Employee {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  designation: string;
  department: string;
  email: string;
  phone: string;
  joiningDate: string;
  qualification: string;
  basicSalary: number;
  status: 'ACTIVE' | 'ON_LEAVE' | 'RESIGNED';
  photoUrl: string;
  assignedClasses?: string[];
}

export interface SchoolClass {
  id: string;
  name: string;
  numericGrade: number;
  sections: string[];
  classTeacherId?: string;
  classTeacherName?: string;
  capacity: number;
  enrolledStudents: number;
  monthlyFee: number;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  type: 'THEORY' | 'PRACTICAL' | 'BOTH';
  classIds: string[];
  teacherId?: string;
  teacherName?: string;
  credits: number;
}

export interface FeeInvoice {
  id: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  className: string;
  section: string;
  amount: number;
  discount: number;
  fine: number;
  paidAmount: number;
  dueAmount: number;
  dueDate: string;
  status: 'PAID' | 'PARTIAL' | 'UNPAID' | 'OVERDUE' | 'VOID';
  month: string;
  issueDate: string;
  items: {
    particular: string;
    amount: number;
  }[];
}

export interface FeeReceipt {
  id: string;
  receiptNo: string;
  invoiceId: string;
  studentId: string;
  studentName: string;
  className: string;
  amountPaid: number;
  paymentMethod: 'CASH' | 'ONLINE_TRANSFER' | 'CHEQUE' | 'POS_CARD' | 'UPI';
  transactionRef?: string;
  paymentDate: string;
  receivedBy: string;
}

export interface AccountTransaction {
  id: string;
  refNo: string;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  ledgerName: string;
  amount: number;
  date: string;
  paymentMethod: string;
  description: string;
  recordedBy: string;
}

export interface SalaryRecord {
  id: string;
  slipNo: string;
  employeeId: string;
  employeeName: string;
  designation: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'PAID' | 'PENDING' | 'HELD';
  paymentDate?: string;
  paymentMethod?: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  type: 'STUDENT' | 'EMPLOYEE';
  targetId: string;
  targetName: string;
  className?: string;
  section?: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'HALF_DAY' | 'EXCUSED';
  remarks?: string;
}

export interface TimeTableSlot {
  id: string;
  day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY';
  period: number;
  startTime: string;
  endTime: string;
  className: string;
  section: string;
  subjectName: string;
  teacherName: string;
  roomNo: string;
}

export interface HomeworkAssignment {
  id: string;
  title: string;
  className: string;
  section: string;
  subject: string;
  assignedDate: string;
  dueDate: string;
  description: string;
  attachmentName?: string;
  assignedBy: string;
  submissionCount: number;
  totalStudents: number;
}

export interface BehaviourLog {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  type: 'MERIT' | 'DEMERIT' | 'NEUTRAL';
  category: 'DISCIPLINE' | 'ACADEMIC_EXCELLENCE' | 'LEADERSHIP' | 'SPORTS' | 'PUNCTUALITY' | 'MISCONDUCT';
  points: number;
  date: string;
  description: string;
  recordedBy: string;
}

export interface ExamSession {
  id: string;
  title: string;
  academicYear: string;
  term: string;
  startDate: string;
  endDate: string;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'RESULTS_PUBLISHED';
  classesInvolved: string[];
}

export interface StudentResult {
  id: string;
  studentId: string;
  studentName: string;
  admissionNo: string;
  rollNo: string;
  className: string;
  section: string;
  examTitle: string;
  subjects: {
    subjectName: string;
    totalMarks: number;
    obtainedMarks: number;
    grade: string;
    remarks: string;
  }[];
  totalMaxMarks: number;
  totalObtainedMarks: number;
  percentage: number;
  gpa: number;
  overallGrade: string;
  rank: number;
  attendancePercent: number;
  status: 'PASSED' | 'FAILED' | 'PROMOTED_WITH_CONDITIONS';
}

export interface CertificateRecord {
  id: string;
  certificateNo: string;
  type: 'CHARACTER' | 'BONAFIDE' | 'TRANSFER' | 'EXPERIENCE';
  recipientId: string;
  recipientName: string;
  issueDate: string;
  className?: string;
  reason: string;
  academicConduct?: string;
  relievingDesignation?: string;
  printedCount: number;
}

export interface NoticeItem {
  id: string;
  title: string;
  category: 'ACADEMIC' | 'ADMINISTRATIVE' | 'EVENT' | 'HOLIDAY' | 'URGENT';
  content: string;
  targetAudience: 'ALL' | 'STUDENTS' | 'PARENTS' | 'STAFF';
  publishDate: string;
  expiryDate?: string;
  author: string;
  isPinned: boolean;
}

export interface SMSTemplate {
  id: string;
  title: string;
  type: 'ATTENDANCE_ABSENT' | 'FEE_DUE' | 'EXAM_ANNOUNCEMENT' | 'GENERAL_NOTICE';
  templateBody: string;
  variables: string[];
}
