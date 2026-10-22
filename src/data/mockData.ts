import {
  InstituteProfile,
  Student,
  Employee,
  SchoolClass,
  Subject,
  FeeInvoice,
  FeeReceipt,
  AccountTransaction,
  SalaryRecord,
  AttendanceRecord,
  TimeTableSlot,
  HomeworkAssignment,
  BehaviourLog,
  ExamSession,
  StudentResult,
  CertificateRecord,
  NoticeItem,
  SMSTemplate
} from '../types';

export const INITIAL_INSTITUTE: InstituteProfile = {
  id: 'inst-001',
  name: 'DPx Model International Academy',
  branchName: 'Main Campus - Central Boulevard',
  code: 'DPX-IND-01',
  affiliationNumber: 'CBSE/AFF/98234-A',
  email: 'admin@dpxsolution.edu',
  phone: '+1 (555) 019-2834',
  address: '742 Innovation Way, Silicon Valley, CA 94025',
  currency: 'USD',
  currencySymbol: '$',
  academicYear: '2026-2027',
  currentTerm: 'Fall Semester - Term 1',
  tagline: 'Empowering Next-Gen Learners with Academic Excellence',
  establishedYear: 2012
};

export const INITIAL_CLASSES: SchoolClass[] = [
  { id: 'c-1', name: 'Grade 1', numericGrade: 1, sections: ['A', 'B'], classTeacherId: 'emp-3', classTeacherName: 'Sarah Jenkins', capacity: 60, enrolledStudents: 52, monthlyFee: 320 },
  { id: 'c-2', name: 'Grade 2', numericGrade: 2, sections: ['A', 'B'], classTeacherId: 'emp-4', classTeacherName: 'David Chen', capacity: 60, enrolledStudents: 56, monthlyFee: 330 },
  { id: 'c-3', name: 'Grade 3', numericGrade: 3, sections: ['A', 'B'], classTeacherId: 'emp-5', classTeacherName: 'Emily Watson', capacity: 60, enrolledStudents: 58, monthlyFee: 340 },
  { id: 'c-4', name: 'Grade 4', numericGrade: 4, sections: ['A', 'B', 'C'], classTeacherId: 'emp-6', classTeacherName: 'Michael Rossi', capacity: 90, enrolledStudents: 84, monthlyFee: 360 },
  { id: 'c-5', name: 'Grade 5', numericGrade: 5, sections: ['A', 'B'], classTeacherId: 'emp-7', classTeacherName: 'Ananya Sharma', capacity: 60, enrolledStudents: 55, monthlyFee: 380 },
  { id: 'c-6', name: 'Grade 6', numericGrade: 6, sections: ['A', 'B'], classTeacherId: 'emp-8', classTeacherName: 'Robert Vance', capacity: 60, enrolledStudents: 54, monthlyFee: 420 },
  { id: 'c-7', name: 'Grade 7', numericGrade: 7, sections: ['A', 'B'], classTeacherId: 'emp-9', classTeacherName: 'Elena Rostova', capacity: 60, enrolledStudents: 51, monthlyFee: 440 },
  { id: 'c-8', name: 'Grade 8', numericGrade: 8, sections: ['A', 'B', 'C'], classTeacherId: 'emp-10', classTeacherName: 'James Wilson', capacity: 90, enrolledStudents: 87, monthlyFee: 460 },
  { id: 'c-9', name: 'Grade 9', numericGrade: 9, sections: ['A', 'B'], classTeacherId: 'emp-11', classTeacherName: 'Aisha Al-Mansoor', capacity: 60, enrolledStudents: 59, monthlyFee: 500 },
  { id: 'c-10', name: 'Grade 10', numericGrade: 10, sections: ['A', 'B'], classTeacherId: 'emp-12', classTeacherName: 'Marcus Bradley', capacity: 60, enrolledStudents: 58, monthlyFee: 550 },
  { id: 'c-11', name: 'Grade 11 (Science)', numericGrade: 11, sections: ['A', 'B'], classTeacherId: 'emp-13', classTeacherName: 'Dr. Evelyn Reed', capacity: 60, enrolledStudents: 50, monthlyFee: 620 },
  { id: 'c-12', name: 'Grade 12 (Science)', numericGrade: 12, sections: ['A', 'B'], classTeacherId: 'emp-14', classTeacherName: 'Prof. Jonathan Hayes', capacity: 60, enrolledStudents: 48, monthlyFee: 650 },
];

export const INITIAL_SUBJECTS: Subject[] = [
  { id: 'sub-1', code: 'ENG-101', name: 'Advanced English Language & Lit', type: 'THEORY', classIds: ['c-9', 'c-10', 'c-11', 'c-12'], teacherId: 'emp-3', teacherName: 'Sarah Jenkins', credits: 4 },
  { id: 'sub-2', code: 'MTH-201', name: 'Calculus & Pure Mathematics', type: 'THEORY', classIds: ['c-10', 'c-11', 'c-12'], teacherId: 'emp-5', teacherName: 'Emily Watson', credits: 4 },
  { id: 'sub-3', code: 'PHY-301', name: 'Physics & Applied Mechanics', type: 'BOTH', classIds: ['c-11', 'c-12'], teacherId: 'emp-13', teacherName: 'Dr. Evelyn Reed', credits: 4 },
  { id: 'sub-4', code: 'CHM-302', name: 'Organic & Inorganic Chemistry', type: 'BOTH', classIds: ['c-11', 'c-12'], teacherId: 'emp-14', teacherName: 'Prof. Jonathan Hayes', credits: 4 },
  { id: 'sub-5', code: 'BIO-303', name: 'Cell Biology & Genetics', type: 'BOTH', classIds: ['c-11', 'c-12'], teacherId: 'emp-7', teacherName: 'Ananya Sharma', credits: 4 },
  { id: 'sub-6', code: 'CS-401', name: 'Computer Science & AI Basics', type: 'PRACTICAL', classIds: ['c-8', 'c-9', 'c-10', 'c-11', 'c-12'], teacherId: 'emp-4', teacherName: 'David Chen', credits: 3 },
  { id: 'sub-7', code: 'HST-102', name: 'World History & Civics', type: 'THEORY', classIds: ['c-6', 'c-7', 'c-8', 'c-9'], teacherId: 'emp-8', teacherName: 'Robert Vance', credits: 3 },
  { id: 'sub-8', code: 'ART-105', name: 'Fine Arts & Digital Media', type: 'PRACTICAL', classIds: ['c-1', 'c-2', 'c-3', 'c-4', 'c-5'], teacherId: 'emp-9', teacherName: 'Elena Rostova', credits: 2 }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'stu-101',
    admissionNo: 'DPX-2024-001',
    rollNo: '10-A-01',
    firstName: 'Alexander',
    lastName: 'Wright',
    gender: 'MALE',
    dob: '2010-04-14',
    bloodGroup: 'O+',
    classId: 'c-10',
    className: 'Grade 10',
    section: 'A',
    guardianName: 'Arthur Wright',
    guardianPhone: '+1 (555) 234-8901',
    guardianEmail: 'arthur.w@example.com',
    guardianRelation: 'Father',
    address: '14 Elm Creek Lane, Sunnyvale, CA',
    status: 'ACTIVE',
    admissionDate: '2020-08-15',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
    siblings: ['DPX-2024-002'],
    totalFeeAssessed: 5500,
    totalFeePaid: 5500,
    scholarshipPercentage: 0
  },
  {
    id: 'stu-102',
    admissionNo: 'DPX-2024-002',
    rollNo: '08-B-14',
    firstName: 'Sophia',
    lastName: 'Wright',
    gender: 'FEMALE',
    dob: '2012-09-22',
    bloodGroup: 'O+',
    classId: 'c-8',
    className: 'Grade 8',
    section: 'B',
    guardianName: 'Arthur Wright',
    guardianPhone: '+1 (555) 234-8901',
    guardianEmail: 'arthur.w@example.com',
    guardianRelation: 'Father',
    address: '14 Elm Creek Lane, Sunnyvale, CA',
    status: 'ACTIVE',
    admissionDate: '2021-08-10',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    siblings: ['DPX-2024-001'],
    totalFeeAssessed: 4600,
    totalFeePaid: 4600,
    scholarshipPercentage: 10
  },
  {
    id: 'stu-103',
    admissionNo: 'DPX-2024-003',
    rollNo: '12-A-05',
    firstName: 'Liam',
    lastName: 'Vanderbilt',
    gender: 'MALE',
    dob: '2008-01-19',
    bloodGroup: 'B+',
    classId: 'c-12',
    className: 'Grade 12 (Science)',
    section: 'A',
    guardianName: 'Claire Vanderbilt',
    guardianPhone: '+1 (555) 345-9012',
    guardianEmail: 'claire.v@example.com',
    guardianRelation: 'Mother',
    address: '88 Oakridge Terrace, Palo Alto, CA',
    status: 'ACTIVE',
    admissionDate: '2018-09-01',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    totalFeeAssessed: 6500,
    totalFeePaid: 5850,
    scholarshipPercentage: 0
  },
  {
    id: 'stu-104',
    admissionNo: 'DPX-2024-004',
    rollNo: '10-A-09',
    firstName: 'Maya',
    lastName: 'Patel',
    gender: 'FEMALE',
    dob: '2010-11-03',
    bloodGroup: 'A+',
    classId: 'c-10',
    className: 'Grade 10',
    section: 'A',
    guardianName: 'Dr. Vikram Patel',
    guardianPhone: '+1 (555) 456-0123',
    guardianEmail: 'vikram.patel@example.com',
    guardianRelation: 'Father',
    address: '302 Eucalyptus Grove, Mountain View, CA',
    status: 'ACTIVE',
    admissionDate: '2022-01-10',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    totalFeeAssessed: 5500,
    totalFeePaid: 3500,
    scholarshipPercentage: 15
  },
  {
    id: 'stu-105',
    admissionNo: 'DPX-2024-005',
    rollNo: '11-B-02',
    firstName: 'Ethan',
    lastName: 'Kowalski',
    gender: 'MALE',
    dob: '2009-06-15',
    bloodGroup: 'AB+',
    classId: 'c-11',
    className: 'Grade 11 (Science)',
    section: 'B',
    guardianName: 'Marek Kowalski',
    guardianPhone: '+1 (555) 567-1234',
    guardianEmail: 'marek.k@example.com',
    guardianRelation: 'Father',
    address: '77 Redwood Canyon, Los Altos, CA',
    status: 'ACTIVE',
    admissionDate: '2019-08-20',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    totalFeeAssessed: 6200,
    totalFeePaid: 6200,
    scholarshipPercentage: 0
  },
  {
    id: 'stu-106',
    admissionNo: 'DPX-2024-006',
    rollNo: '09-A-11',
    firstName: 'Zoe',
    lastName: 'Kim',
    gender: 'FEMALE',
    dob: '2011-03-29',
    bloodGroup: 'A-',
    classId: 'c-9',
    className: 'Grade 9',
    section: 'A',
    guardianName: 'Grace Kim',
    guardianPhone: '+1 (555) 678-2345',
    guardianEmail: 'grace.kim@example.com',
    guardianRelation: 'Mother',
    address: '512 Marina View, San Mateo, CA',
    status: 'ACTIVE',
    admissionDate: '2023-08-14',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    totalFeeAssessed: 5000,
    totalFeePaid: 2500,
    scholarshipPercentage: 0
  },
  {
    id: 'stu-107',
    admissionNo: 'DPX-2024-007',
    rollNo: '10-B-04',
    firstName: 'Lucas',
    lastName: 'Silva',
    gender: 'MALE',
    dob: '2010-08-11',
    bloodGroup: 'O-',
    classId: 'c-10',
    className: 'Grade 10',
    section: 'B',
    guardianName: 'Carlos Silva',
    guardianPhone: '+1 (555) 789-3456',
    guardianEmail: 'csilva@example.com',
    guardianRelation: 'Father',
    address: '92 Blossom Hill Rd, San Jose, CA',
    status: 'ACTIVE',
    admissionDate: '2022-09-01',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80',
    totalFeeAssessed: 5500,
    totalFeePaid: 1500,
    scholarshipPercentage: 0
  }
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    employeeCode: 'EMP-ADM-01',
    firstName: 'Dr. Gregory',
    lastName: 'Sterling',
    role: 'SUPER_ADMIN',
    designation: 'Director General & Trustee',
    department: 'Executive Administration',
    email: 'director@dpxsolution.edu',
    phone: '+1 (555) 111-2233',
    joiningDate: '2012-06-01',
    qualification: 'Ph.D. Educational Leadership, Harvard',
    basicSalary: 9500,
    status: 'ACTIVE',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80'
  },
  {
    id: 'emp-2',
    employeeCode: 'EMP-PRN-01',
    firstName: 'Dr. Patricia',
    lastName: 'Holt',
    role: 'PRINCIPAL',
    designation: 'High School Principal',
    department: 'Academic Oversight',
    email: 'principal.holt@dpxsolution.edu',
    phone: '+1 (555) 222-3344',
    joiningDate: '2015-08-15',
    qualification: 'Ed.D. Curriculum & Instruction, Stanford',
    basicSalary: 7800,
    status: 'ACTIVE',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80'
  },
  {
    id: 'emp-3',
    employeeCode: 'EMP-ACC-01',
    firstName: 'Marcus',
    lastName: 'Sterling-Price',
    role: 'ACCOUNTANT',
    designation: 'Chief Bursar & Head of Finance',
    department: 'Finance & Accounts',
    email: 'finance@dpxsolution.edu',
    phone: '+1 (555) 333-4455',
    joiningDate: '2016-01-10',
    qualification: 'CPA, M.Sc. Corporate Accounting',
    basicSalary: 5600,
    status: 'ACTIVE',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80'
  },
  {
    id: 'emp-4',
    employeeCode: 'EMP-TCH-01',
    firstName: 'Sarah',
    lastName: 'Jenkins',
    role: 'TEACHER',
    designation: 'Senior Faculty - Literature & Language',
    department: 'Humanities',
    email: 'sjenkins@dpxsolution.edu',
    phone: '+1 (555) 444-5566',
    joiningDate: '2018-09-01',
    qualification: 'M.A. English Literature, Oxford',
    basicSalary: 4200,
    status: 'ACTIVE',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80'
  },
  {
    id: 'emp-5',
    employeeCode: 'EMP-TCH-02',
    firstName: 'Emily',
    lastName: 'Watson',
    role: 'TEACHER',
    designation: 'Head of Mathematics',
    department: 'Mathematics',
    email: 'ewatson@dpxsolution.edu',
    phone: '+1 (555) 555-6677',
    joiningDate: '2019-08-15',
    qualification: 'M.Sc. Applied Mathematics, MIT',
    basicSalary: 4600,
    status: 'ACTIVE',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80'
  },
  {
    id: 'emp-6',
    employeeCode: 'EMP-CLR-01',
    firstName: 'Brandon',
    lastName: 'Diaz',
    role: 'CLERK',
    designation: 'Senior Admissions Registrar',
    department: 'Student Affairs & Registry',
    email: 'registry@dpxsolution.edu',
    phone: '+1 (555) 666-7788',
    joiningDate: '2020-03-01',
    qualification: 'B.A. Public Administration',
    basicSalary: 3200,
    status: 'ACTIVE',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80'
  }
];

export const INITIAL_INVOICES: FeeInvoice[] = [
  {
    id: 'inv-1001',
    invoiceNo: 'INV-2026-1001',
    studentId: 'stu-101',
    studentName: 'Alexander Wright',
    className: 'Grade 10',
    section: 'A',
    amount: 550,
    discount: 0,
    fine: 0,
    paidAmount: 550,
    dueAmount: 0,
    dueDate: '2026-10-10',
    status: 'PAID',
    month: 'October 2026',
    issueDate: '2026-10-01',
    items: [
      { particular: 'Tuition Fee (Monthly)', amount: 450 },
      { particular: 'Computer Lab & Tech Fee', amount: 50 },
      { particular: 'Sports & Gymnasium Fund', amount: 50 }
    ]
  },
  {
    id: 'inv-1002',
    invoiceNo: 'INV-2026-1002',
    studentId: 'stu-104',
    studentName: 'Maya Patel',
    className: 'Grade 10',
    section: 'A',
    amount: 550,
    discount: 82.5,
    fine: 0,
    paidAmount: 467.5,
    dueAmount: 0,
    dueDate: '2026-10-10',
    status: 'PAID',
    month: 'October 2026',
    issueDate: '2026-10-01',
    items: [
      { particular: 'Tuition Fee (Monthly)', amount: 450 },
      { particular: 'STEM Laboratory Access', amount: 100 }
    ]
  },
  {
    id: 'inv-1003',
    invoiceNo: 'INV-2026-1003',
    studentId: 'stu-106',
    studentName: 'Zoe Kim',
    className: 'Grade 9',
    section: 'A',
    amount: 500,
    discount: 0,
    fine: 25,
    paidAmount: 250,
    dueAmount: 275,
    dueDate: '2026-10-10',
    status: 'PARTIAL',
    month: 'October 2026',
    issueDate: '2026-10-01',
    items: [
      { particular: 'Tuition Fee', amount: 420 },
      { particular: 'Library Digital Access', amount: 80 }
    ]
  },
  {
    id: 'inv-1004',
    invoiceNo: 'INV-2026-1004',
    studentId: 'stu-107',
    studentName: 'Lucas Silva',
    className: 'Grade 10',
    section: 'B',
    amount: 550,
    discount: 0,
    fine: 50,
    paidAmount: 0,
    dueAmount: 600,
    dueDate: '2026-10-10',
    status: 'OVERDUE',
    month: 'October 2026',
    issueDate: '2026-10-01',
    items: [
      { particular: 'Tuition Fee', amount: 450 },
      { particular: 'Transportation Bus Route 4', amount: 100 }
    ]
  }
];

export const INITIAL_RECEIPTS: FeeReceipt[] = [
  {
    id: 'rcp-01',
    receiptNo: 'REC-2026-8812',
    invoiceId: 'inv-1001',
    studentId: 'stu-101',
    studentName: 'Alexander Wright',
    className: 'Grade 10',
    amountPaid: 550,
    paymentMethod: 'ONLINE_TRANSFER',
    transactionRef: 'WIRE-8923481239',
    paymentDate: '2026-10-04',
    receivedBy: 'Marcus Sterling-Price'
  },
  {
    id: 'rcp-02',
    receiptNo: 'REC-2026-8813',
    invoiceId: 'inv-1002',
    studentId: 'stu-104',
    studentName: 'Maya Patel',
    className: 'Grade 10',
    amountPaid: 467.5,
    paymentMethod: 'POS_CARD',
    transactionRef: 'POS-TXN-4421',
    paymentDate: '2026-10-06',
    receivedBy: 'Marcus Sterling-Price'
  }
];

export const INITIAL_TRANSACTIONS: AccountTransaction[] = [
  { id: 'tx-1', refNo: 'TXN-INC-901', type: 'INCOME', category: 'Tuition & Academic Fees', ledgerName: 'Student Tuition Ledger', amount: 48500, date: '2026-10-15', paymentMethod: 'Direct Bank Deposit', description: 'October Tuition aggregated collections batch #1', recordedBy: 'Marcus Sterling-Price' },
  { id: 'tx-2', refNo: 'TXN-EXP-401', type: 'EXPENSE', category: 'Staff Payroll', ledgerName: 'Faculty Salary Account', amount: 35200, date: '2026-10-01', paymentMethod: 'ACH Batch Wire', description: 'September Staff & Faculty Payroll clearing', recordedBy: 'Marcus Sterling-Price' },
  { id: 'tx-3', refNo: 'TXN-EXP-402', type: 'EXPENSE', category: 'Utilities & Facilities', ledgerName: 'Campus Maintenance', amount: 3450, date: '2026-10-05', paymentMethod: 'Corporate Card', description: 'Campus High-Speed Fiber Internet & Electricity', recordedBy: 'Brandon Diaz' },
  { id: 'tx-4', refNo: 'TXN-INC-902', type: 'INCOME', category: 'Laboratory & Tech Fees', ledgerName: 'STEM & Robotics Lab', amount: 7200, date: '2026-10-08', paymentMethod: 'POS Terminals', description: 'Advanced AI and Robotics lab subscription intake', recordedBy: 'Marcus Sterling-Price' },
  { id: 'tx-5', refNo: 'TXN-EXP-403', type: 'EXPENSE', category: 'Laboratory Supplies', ledgerName: 'Physics & Chem Equipment', amount: 2800, date: '2026-10-12', paymentMethod: 'Vendor Wire', description: 'Spectrophotometers & consumable reagents replenishment', recordedBy: 'Dr. Gregory Sterling' }
];

export const INITIAL_SALARIES: SalaryRecord[] = [
  { id: 'sal-1', slipNo: 'PAY-2026-09-01', employeeId: 'emp-1', employeeName: 'Dr. Gregory Sterling', designation: 'Director General', month: 'September', year: 2026, basicSalary: 9500, allowances: 800, deductions: 1200, netSalary: 9100, status: 'PAID', paymentDate: '2026-10-01', paymentMethod: 'Direct Deposit' },
  { id: 'sal-2', slipNo: 'PAY-2026-09-02', employeeId: 'emp-2', employeeName: 'Dr. Patricia Holt', designation: 'High School Principal', month: 'September', year: 2026, basicSalary: 7800, allowances: 600, deductions: 950, netSalary: 7450, status: 'PAID', paymentDate: '2026-10-01', paymentMethod: 'Direct Deposit' },
  { id: 'sal-3', slipNo: 'PAY-2026-09-03', employeeId: 'emp-3', employeeName: 'Marcus Sterling-Price', designation: 'Chief Bursar', month: 'September', year: 2026, basicSalary: 5600, allowances: 400, deductions: 680, netSalary: 5320, status: 'PAID', paymentDate: '2026-10-01', paymentMethod: 'Direct Deposit' },
  { id: 'sal-4', slipNo: 'PAY-2026-09-04', employeeId: 'emp-4', employeeName: 'Sarah Jenkins', designation: 'Senior Faculty', month: 'September', year: 2026, basicSalary: 4200, allowances: 300, deductions: 480, netSalary: 4020, status: 'PAID', paymentDate: '2026-10-01', paymentMethod: 'Direct Deposit' },
  { id: 'sal-5', slipNo: 'PAY-2026-09-05', employeeId: 'emp-5', employeeName: 'Emily Watson', designation: 'Head of Mathematics', month: 'September', year: 2026, basicSalary: 4600, allowances: 350, deductions: 520, netSalary: 4430, status: 'PAID', paymentDate: '2026-10-01', paymentMethod: 'Direct Deposit' }
];

export const INITIAL_TIMETABLE: TimeTableSlot[] = [
  { id: 'tt-1', day: 'MONDAY', period: 1, startTime: '08:30 AM', endTime: '09:20 AM', className: 'Grade 10', section: 'A', subjectName: 'Pure Mathematics', teacherName: 'Emily Watson', roomNo: 'Room 304' },
  { id: 'tt-2', day: 'MONDAY', period: 2, startTime: '09:25 AM', endTime: '10:15 AM', className: 'Grade 10', section: 'A', subjectName: 'English Literature', teacherName: 'Sarah Jenkins', roomNo: 'Room 304' },
  { id: 'tt-3', day: 'MONDAY', period: 3, startTime: '10:30 AM', endTime: '11:20 AM', className: 'Grade 10', section: 'A', subjectName: 'Physics & Applied Mechanics', teacherName: 'Dr. Evelyn Reed', roomNo: 'Lab 2' },
  { id: 'tt-4', day: 'MONDAY', period: 4, startTime: '11:25 AM', endTime: '12:15 PM', className: 'Grade 10', section: 'A', subjectName: 'Computer Science & AI', teacherName: 'David Chen', roomNo: 'Computer Lab' },
  { id: 'tt-5', day: 'MONDAY', period: 5, startTime: '01:00 PM', endTime: '01:50 PM', className: 'Grade 10', section: 'A', subjectName: 'World History & Civics', teacherName: 'Robert Vance', roomNo: 'Room 304' },
  { id: 'tt-6', day: 'TUESDAY', period: 1, startTime: '08:30 AM', endTime: '09:20 AM', className: 'Grade 10', section: 'A', subjectName: 'Organic Chemistry', teacherName: 'Prof. Jonathan Hayes', roomNo: 'Chem Lab' },
  { id: 'tt-7', day: 'TUESDAY', period: 2, startTime: '09:25 AM', endTime: '10:15 AM', className: 'Grade 10', section: 'A', subjectName: 'Pure Mathematics', teacherName: 'Emily Watson', roomNo: 'Room 304' },
  { id: 'tt-8', day: 'WEDNESDAY', period: 1, startTime: '08:30 AM', endTime: '09:20 AM', className: 'Grade 10', section: 'A', subjectName: 'Computer Science & AI', teacherName: 'David Chen', roomNo: 'Computer Lab' },
  { id: 'tt-9', day: 'THURSDAY', period: 1, startTime: '08:30 AM', endTime: '09:20 AM', className: 'Grade 10', section: 'A', subjectName: 'Cell Biology & Genetics', teacherName: 'Ananya Sharma', roomNo: 'Bio Lab' },
  { id: 'tt-10', day: 'FRIDAY', period: 1, startTime: '08:30 AM', endTime: '09:20 AM', className: 'Grade 10', section: 'A', subjectName: 'Fine Arts & Digital Media', teacherName: 'Elena Rostova', roomNo: 'Studio A' }
];

export const INITIAL_HOMEWORK: HomeworkAssignment[] = [
  { id: 'hw-1', title: 'Quadratic Equations & Parabolic Modeling', className: 'Grade 10', section: 'A', subject: 'Pure Mathematics', assignedDate: '2026-10-20', dueDate: '2026-10-24', description: 'Complete Exercises 4.1 to 4.4 from Chapter 4. Graph the projectile trajectory problems in standard grid.', assignedBy: 'Emily Watson', submissionCount: 48, totalStudents: 58 },
  { id: 'hw-2', title: 'Thematic Essay: Symbolism in The Great Gatsby', className: 'Grade 10', section: 'A', subject: 'Advanced English Language', assignedDate: '2026-10-18', dueDate: '2026-10-25', description: 'Write an 800-word critical analysis analyzing the green light and the eyes of Dr. T.J. Eckleburg.', assignedBy: 'Sarah Jenkins', submissionCount: 52, totalStudents: 58 },
  { id: 'hw-3', title: 'Lab Report: Kinematics of Incline Motion', className: 'Grade 11 (Science)', section: 'A', subject: 'Physics & Applied Mechanics', assignedDate: '2026-10-19', dueDate: '2026-10-26', description: 'Submit comprehensive error analysis and uncertainty calculation for experiment 3.', assignedBy: 'Dr. Evelyn Reed', submissionCount: 22, totalStudents: 30 }
];

export const INITIAL_BEHAVIOUR: BehaviourLog[] = [
  { id: 'beh-1', studentId: 'stu-101', studentName: 'Alexander Wright', className: 'Grade 10', type: 'MERIT', category: 'ACADEMIC_EXCELLENCE', points: 15, date: '2026-10-18', description: 'Secured 1st Place in Regional High School Mathematics Olympiad preliminaries.', recordedBy: 'Emily Watson' },
  { id: 'beh-2', studentId: 'stu-104', studentName: 'Maya Patel', className: 'Grade 10', type: 'MERIT', category: 'LEADERSHIP', points: 10, date: '2026-10-15', description: 'Spearheaded campus electronic waste recycling drive with over 300 lbs collected.', recordedBy: 'Sarah Jenkins' },
  { id: 'beh-3', studentId: 'stu-107', studentName: 'Lucas Silva', className: 'Grade 10', type: 'DEMERIT', category: 'PUNCTUALITY', points: -5, date: '2026-10-19', description: 'Unexcused tardiness to first period assembly on three consecutive instances.', recordedBy: 'Brandon Diaz' }
];

export const INITIAL_EXAMS: ExamSession[] = [
  { id: 'exam-1', title: 'Mid-Term Examinations 2026', academicYear: '2026-2027', term: 'Term 1', startDate: '2026-11-10', endDate: '2026-11-20', status: 'RESULTS_PUBLISHED', classesInvolved: ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'] },
  { id: 'exam-2', title: 'Annual Board Assessment & Finals', academicYear: '2026-2027', term: 'Term 2', startDate: '2027-03-01', endDate: '2027-03-18', status: 'UPCOMING', classesInvolved: ['All Classes'] }
];

export const INITIAL_RESULTS: StudentResult[] = [
  {
    id: 'res-101',
    studentId: 'stu-101',
    studentName: 'Alexander Wright',
    admissionNo: 'DPX-2024-001',
    rollNo: '10-A-01',
    className: 'Grade 10',
    section: 'A',
    examTitle: 'Mid-Term Examinations 2026',
    subjects: [
      { subjectName: 'Advanced English', totalMarks: 100, obtainedMarks: 94, grade: 'A+', remarks: 'Exceptional analytical depth' },
      { subjectName: 'Pure Mathematics', totalMarks: 100, obtainedMarks: 98, grade: 'A+', remarks: 'Flawless problem solving' },
      { subjectName: 'Physics', totalMarks: 100, obtainedMarks: 91, grade: 'A+', remarks: 'Strong conceptual grasp' },
      { subjectName: 'Chemistry', totalMarks: 100, obtainedMarks: 89, grade: 'A', remarks: 'Good practical accuracy' },
      { subjectName: 'Computer Science', totalMarks: 100, obtainedMarks: 96, grade: 'A+', remarks: 'Creative code structures' }
    ],
    totalMaxMarks: 500,
    totalObtainedMarks: 468,
    percentage: 93.6,
    gpa: 3.94,
    overallGrade: 'A+ (Distinction)',
    rank: 1,
    attendancePercent: 96.5,
    status: 'PASSED'
  },
  {
    id: 'res-104',
    studentId: 'stu-104',
    studentName: 'Maya Patel',
    admissionNo: 'DPX-2024-004',
    rollNo: '10-A-09',
    className: 'Grade 10',
    section: 'A',
    examTitle: 'Mid-Term Examinations 2026',
    subjects: [
      { subjectName: 'Advanced English', totalMarks: 100, obtainedMarks: 92, grade: 'A+', remarks: 'Very expressive prose' },
      { subjectName: 'Pure Mathematics', totalMarks: 100, obtainedMarks: 88, grade: 'A', remarks: 'Good accuracy in calculus' },
      { subjectName: 'Physics', totalMarks: 100, obtainedMarks: 86, grade: 'A', remarks: 'Clear derivations' },
      { subjectName: 'Chemistry', totalMarks: 100, obtainedMarks: 94, grade: 'A+', remarks: 'Exemplary lab work' },
      { subjectName: 'Computer Science', totalMarks: 100, obtainedMarks: 90, grade: 'A', remarks: 'Sound logic flow' }
    ],
    totalMaxMarks: 500,
    totalObtainedMarks: 450,
    percentage: 90.0,
    gpa: 3.82,
    overallGrade: 'A (High Honor)',
    rank: 2,
    attendancePercent: 95.0,
    status: 'PASSED'
  }
];

export const INITIAL_NOTICES: NoticeItem[] = [
  { id: 'not-1', title: 'Annual Science & Innovation Exhibition 2026', category: 'EVENT', content: 'All students from Grade 6 to 12 are invited to submit their STEM project abstracts by November 5th. Judging will be conducted by visiting Silicon Valley university faculty.', targetAudience: 'ALL', publishDate: '2026-10-21', author: 'Dr. Patricia Holt', isPinned: true },
  { id: 'not-2', title: 'Term 1 Fee Invoices Dispatched & Due Reminder', category: 'ADMINISTRATIVE', content: 'Kindly settle outstanding invoice balances by October 25th via the parent portal or school cashier terminal to avoid automated late fee surcharges.', targetAudience: 'PARENTS', publishDate: '2026-10-18', author: 'Marcus Sterling-Price', isPinned: false },
  { id: 'not-3', title: 'Teacher Professional Development Workshop (Friday Half-Day)', category: 'ACADEMIC', content: 'Classes will conclude at 12:30 PM this coming Friday to facilitate the quarterly AI in K-12 Pedagogy symposium for faculty members.', targetAudience: 'ALL', publishDate: '2026-10-15', author: 'Dr. Gregory Sterling', isPinned: true }
];

export const INITIAL_CERTIFICATES: CertificateRecord[] = [
  { id: 'cert-1', certificateNo: 'DPX-CERT-2026-0041', type: 'CHARACTER', recipientId: 'stu-101', recipientName: 'Alexander Wright', issueDate: '2026-10-15', className: 'Grade 10', reason: 'High School Honor Roll & Student Council Ambassadorship', academicConduct: 'Exemplary moral integrity, active civic participation, and stellar scholastic devotion.', printedCount: 2 },
  { id: 'cert-2', certificateNo: 'DPX-CERT-2026-0042', type: 'BONAFIDE', recipientId: 'stu-104', recipientName: 'Maya Patel', issueDate: '2026-10-12', className: 'Grade 10', reason: 'Passport & International Youth Exchange Delegation application', academicConduct: 'Bonafide enrolled regular student in good standing.', printedCount: 1 },
  { id: 'cert-3', certificateNo: 'DPX-CERT-2026-0043', type: 'TRANSFER', recipientId: 'stu-107', recipientName: 'Lucas Silva', issueDate: '2026-10-02', className: 'Grade 10', reason: 'Parental job relocation to New York Metropolitan Area', academicConduct: 'Clear of all school dues. Conduct and moral character have been satisfactory.', printedCount: 1 },
  { id: 'cert-4', certificateNo: 'DPX-CERT-2026-0044', type: 'EXPERIENCE', recipientId: 'emp-4', recipientName: 'Sarah Jenkins', issueDate: '2026-09-28', relievingDesignation: 'Senior Faculty - Literature & Language', reason: 'Official Verification of Service Tenure', academicConduct: 'Served with unmatched pedagogical excellence and inspiring classroom leadership for 8 consecutive academic sessions.', printedCount: 1 }
];

export const INITIAL_SMS_TEMPLATES: SMSTemplate[] = [
  { id: 'sms-1', title: 'Daily Student Absenteeism Alert', type: 'ATTENDANCE_ABSENT', templateBody: 'Dear {GuardianName}, your ward {StudentName} was marked absent today ({Date}) without prior notice. Kindly verify or contact attendance desk at {SchoolPhone}.', variables: ['GuardianName', 'StudentName', 'Date', 'SchoolPhone'] },
  { id: 'sms-2', title: 'Monthly Fee Due & Defaulter Notice', type: 'FEE_DUE', templateBody: 'Alert: Fee invoice #{InvoiceNo} of {Amount} for {StudentName} is overdue. Please remit by {DueDate} to prevent administrative late fines. - {SchoolName}', variables: ['InvoiceNo', 'Amount', 'StudentName', 'DueDate', 'SchoolName'] },
  { id: 'sms-3', title: 'Exam Date Sheet Announcement', type: 'EXAM_ANNOUNCEMENT', templateBody: 'Dear Parents, {ExamTitle} commences on {StartDate}. The detailed timetable and hall tickets are now accessible on the DPxSOLUTION portal.', variables: ['ExamTitle', 'StartDate'] }
];
