/**
 * High-Level System Architecture & Prisma Database Schema for DPxSOLUTION
 * Multi-Tenant, Role-Based Enterprise School Management System
 */

export const SYSTEM_ARCHITECTURE_OVERVIEW = `
========================================================================================
DPxSOLUTION - ENTERPRISE EDTECH ARCHITECTURAL BLUEPRINT
========================================================================================
1. ARCHITECTURAL PATTERN:
   - Client Tier: React 19 SPA, Tailwind CSS v4, Lucide Icons, Dynamic Print Rendering Engines.
   - Application Gateway / API: REST & GraphQL / tRPC ready endpoints, Rate Limiting, Audit Trails.
   - Persistence & ORM: PostgreSQL with Prisma ORM, JSONB schema flexibility, Multi-Tenant Row-Level Isolation.
   - Communication Layer: Webhooks for WhatsApp Business API, SMPP / HTTP SMS Gateways, WebRTC/Zoom SDK.
   - Document & Printing: Virtual DOM to Vector PDF / Print Engine with CSS Paged Media spec (@page, @media print).

2. MULTI-TENANCY MODEL:
   - Shared Database, Partitioned Schema with \`instituteId\` foreign key on all root entities.
   - Tenant isolation enforced via Prisma Client middleware or PostgreSQL Row-Level Security (RLS).
   - Custom branding, fee structures, mark schemes, and certificate templates per institute branch.

3. ROLE-BASED ACCESS CONTROL (RBAC) MATRIX:
   - SUPER_ADMIN: Full tenant control, global system settings, database audit logs.
   - PRINCIPAL: Academic & administrative governance, timetable approval, promotion execution.
   - ACCOUNTANT: Chart of accounts, fee invoicing, POS cashier collection, payroll disbursement, audit ledger.
   - TEACHER: Attendance marking, gradebook entry, homework dispatch, conduct logging, student test analytics.
   - CLERK: Student directory, admission intake, certificate generation, SMS dispatch, basic inquiries.
   - PARENT / STUDENT: Portal view of timetable, attendance, pending fee invoices, grade cards, notices.
========================================================================================
`;

export const PRISMA_SCHEMA_CODE = `// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ----------------------------------------------------
// ENUMS
// ----------------------------------------------------
enum UserRole {
  SUPER_ADMIN
  PRINCIPAL
  ACCOUNTANT
  TEACHER
  CLERK
  STUDENT
  PARENT
}

enum Gender {
  MALE
  FEMALE
  OTHER
}

enum StudentStatus {
  ACTIVE
  INACTIVE
  TRANSFERRED
  SUSPENDED
  ALUMNI
}

enum EmployeeStatus {
  ACTIVE
  ON_LEAVE
  RESIGNED
  TERMINATED
}

enum AttendanceStatus {
  PRESENT
  ABSENT
  LATE
  HALF_DAY
  EXCUSED
}

enum AttendanceType {
  STUDENT
  EMPLOYEE
}

enum InvoiceStatus {
  UNPAID
  PARTIAL
  PAID
  OVERDUE
  VOID
}

enum PaymentMethod {
  CASH
  ONLINE_TRANSFER
  CHEQUE
  POS_CARD
  UPI
}

enum TransactionType {
  INCOME
  EXPENSE
}

enum SubjectType {
  THEORY
  PRACTICAL
  BOTH
}

enum ExamStatus {
  UPCOMING
  ONGOING
  COMPLETED
  RESULTS_PUBLISHED
}

enum CertificateType {
  CHARACTER
  BONAFIDE
  TRANSFER
  EXPERIENCE
}

// ----------------------------------------------------
// INSTITUTION & MULTI-TENANCY
// ----------------------------------------------------
model Institute {
  id                 String              @id @default(uuid())
  name               String
  branchName         String
  code               String              @unique
  affiliationNumber  String?
  email              String
  phone              String
  address            String
  currency           String              @default("USD")
  currencySymbol     String              @default("$")
  academicYear       String              @default("2026-2027")
  currentTerm        String              @default("Term 1")
  logoUrl            String?
  tagline            String?
  establishedYear    Int                 @default(2010)
  createdAt          DateTime            @default(now())
  updatedAt          DateTime            @updatedAt

  users              User[]
  classes            Class[]
  students           Student[]
  employees          Employee[]
  feeInvoices        FeeInvoice[]
  feeReceipts        FeeReceipt[]
  accounts           AccountTransaction[]
  salaryRecords      SalaryRecord[]
  attendanceRecords  AttendanceRecord[]
  timetableSlots     TimeTableSlot[]
  homeworks          Homework[]
  behaviourLogs      BehaviourLog[]
  examSessions       ExamSession[]
  certificates       CertificateRecord[]
  notices            Notice[]

  @@index([code])
}

// ----------------------------------------------------
// AUTHENTICATION & ACCESS
// ----------------------------------------------------
model User {
  id           String     @id @default(uuid())
  instituteId  String
  institute    Institute  @relation(fields: [instituteId], references: [id], onDelete: Cascade)
  email        String     @unique
  passwordHash String
  role         UserRole   @default(STUDENT)
  isActive     Boolean    @default(true)
  lastLoginAt  DateTime?
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  employee     Employee?
  student      Student?

  @@index([instituteId, role])
}

// ----------------------------------------------------
// ACADEMIC STRUCTURE
// ----------------------------------------------------
model Class {
  id               String       @id @default(uuid())
  instituteId      String
  institute        Institute    @relation(fields: [instituteId], references: [id], onDelete: Cascade)
  name             String
  numericGrade     Int
  capacity         Int          @default(40)
  monthlyFee       Decimal      @db.Decimal(10, 2)
  sections         Section[]
  students         Student[]
  subjects         Subject[]
  homeworks        Homework[]
  timetableSlots   TimeTableSlot[]
  examResults      StudentResult[]

  @@unique([instituteId, name])
}

model Section {
  id             String       @id @default(uuid())
  classId        String
  class          Class        @relation(fields: [classId], references: [id], onDelete: Cascade)
  name           String
  classTeacherId String?
  classTeacher   Employee?    @relation("ClassTeacher", fields: [classTeacherId], references: [id])
  students       Student[]

  @@unique([classId, name])
}

model Subject {
  id          String       @id @default(uuid())
  classId     String
  class       Class        @relation(fields: [classId], references: [id], onDelete: Cascade)
  code        String
  name        String
  type        SubjectType  @default(THEORY)
  credits     Int          @default(3)
  teacherId   String?
  teacher     Employee?    @relation(fields: [teacherId], references: [id])
  homeworks   Homework[]
  examMarks   ExamMark[]

  @@unique([classId, code])
}

// ----------------------------------------------------
// STUDENTS & FAMILIES
// ----------------------------------------------------
model Student {
  id               String         @id @default(uuid())
  instituteId      String
  institute        Institute      @relation(fields: [instituteId], references: [id], onDelete: Cascade)
  userId           String?        @unique
  user             User?          @relation(fields: [userId], references: [id])
  admissionNo      String         @unique
  rollNo           String
  firstName        String
  lastName         String
  gender           Gender
  dob              DateTime
  bloodGroup       String?
  admissionDate    DateTime       @default(now())
  photoUrl         String?
  status           StudentStatus  @default(ACTIVE)

  classId          String
  class            Class          @relation(fields: [classId], references: [id])
  sectionId        String
  section          Section        @relation(fields: [sectionId], references: [id])

  guardianName     String
  guardianPhone    String
  guardianEmail    String
  guardianRelation String
  address          String
  scholarshipPct   Decimal        @default(0.0) @db.Decimal(5, 2)

  feeInvoices      FeeInvoice[]
  attendance       AttendanceRecord[]
  behaviourLogs    BehaviourLog[]
  examResults      StudentResult[]
  certificates     CertificateRecord[]

  createdAt        DateTime       @default(now())
  updatedAt        DateTime       @updatedAt

  @@index([instituteId, classId, sectionId])
  @@index([admissionNo])
}

// ----------------------------------------------------
// EMPLOYEES & STAFF
// ----------------------------------------------------
model Employee {
  id               String         @id @default(uuid())
  instituteId      String
  institute        Institute      @relation(fields: [instituteId], references: [id], onDelete: Cascade)
  userId           String?        @unique
  user             User?          @relation(fields: [userId], references: [id])
  employeeCode     String         @unique
  firstName        String
  lastName         String
  role             UserRole       @default(TEACHER)
  designation      String
  department       String
  email            String
  phone            String
  joiningDate      DateTime
  qualification    String
  basicSalary      Decimal        @db.Decimal(10, 2)
  status           EmployeeStatus @default(ACTIVE)
  photoUrl         String?

  sectionsHeading  Section[]      @relation("ClassTeacher")
  assignedSubjects Subject[]
  attendance       AttendanceRecord[]
  salaryRecords    SalaryRecord[]

  createdAt        DateTime       @default(now())
  updatedAt        DateTime       @updatedAt

  @@index([instituteId, role])
}

// ----------------------------------------------------
// FINANCIAL & FEE POS
// ----------------------------------------------------
model FeeInvoice {
  id             String         @id @default(uuid())
  instituteId    String
  institute      Institute      @relation(fields: [instituteId], references: [id], onDelete: Cascade)
  invoiceNo      String         @unique
  studentId      String
  student        Student        @relation(fields: [studentId], references: [id], onDelete: Cascade)
  month          String
  amount         Decimal        @db.Decimal(10, 2)
  discount       Decimal        @default(0) @db.Decimal(10, 2)
  fine           Decimal        @default(0) @db.Decimal(10, 2)
  paidAmount     Decimal        @default(0) @db.Decimal(10, 2)
  dueAmount      Decimal        @db.Decimal(10, 2)
  issueDate      DateTime       @default(now())
  dueDate        DateTime
  status         InvoiceStatus  @default(UNPAID)

  items          FeeInvoiceItem[]
  receipts       FeeReceipt[]

  createdAt      DateTime       @default(now())
  updatedAt      DateTime       @updatedAt

  @@index([instituteId, status])
  @@index([studentId])
}

model FeeInvoiceItem {
  id          String     @id @default(uuid())
  invoiceId   String
  invoice     FeeInvoice @relation(fields: [invoiceId], references: [id], onDelete: Cascade)
  particular  String
  amount      Decimal    @db.Decimal(10, 2)
}

model FeeReceipt {
  id             String         @id @default(uuid())
  instituteId    String
  institute      Institute      @relation(fields: [instituteId], references: [id], onDelete: Cascade)
  receiptNo      String         @unique
  invoiceId      String
  invoice        FeeInvoice     @relation(fields: [invoiceId], references: [id])
  amountPaid     Decimal        @db.Decimal(10, 2)
  paymentMethod  PaymentMethod  @default(CASH)
  transactionRef String?
  paymentDate    DateTime       @default(now())
  receivedBy     String

  createdAt      DateTime       @default(now())

  @@index([instituteId, receiptNo])
}

model AccountTransaction {
  id            String          @id @default(uuid())
  instituteId   String
  institute     Institute       @relation(fields: [instituteId], references: [id], onDelete: Cascade)
  refNo         String          @unique
  type          TransactionType
  category      String
  ledgerName    String
  amount        Decimal         @db.Decimal(10, 2)
  date          DateTime        @default(now())
  paymentMethod String
  description   String
  recordedBy    String

  createdAt     DateTime        @default(now())

  @@index([instituteId, type, date])
}

model SalaryRecord {
  id            String         @id @default(uuid())
  instituteId   String
  institute     Institute      @relation(fields: [instituteId], references: [id], onDelete: Cascade)
  slipNo        String         @unique
  employeeId    String
  employee      Employee       @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  month         String
  year          Int
  basicSalary   Decimal        @db.Decimal(10, 2)
  allowances    Decimal        @default(0) @db.Decimal(10, 2)
  deductions    Decimal        @default(0) @db.Decimal(10, 2)
  netSalary     Decimal        @db.Decimal(10, 2)
  status        String         @default("PAID")
  paymentDate   DateTime?
  paymentMethod String?

  createdAt     DateTime       @default(now())

  @@index([instituteId, employeeId, month, year])
}

// ----------------------------------------------------
// ATTENDANCE & TIMETABLE
// ----------------------------------------------------
model AttendanceRecord {
  id          String           @id @default(uuid())
  instituteId String
  institute   Institute        @relation(fields: [instituteId], references: [id], onDelete: Cascade)
  date        DateTime         @db.Date
  type        AttendanceType
  status      AttendanceStatus @default(PRESENT)
  remarks     String?

  studentId   String?
  student     Student?         @relation(fields: [studentId], references: [id], onDelete: Cascade)
  employeeId  String?
  employee    Employee?        @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  createdAt   DateTime         @default(now())

  @@unique([date, studentId])
  @@unique([date, employeeId])
  @@index([instituteId, date, type])
}

model TimeTableSlot {
  id          String     @id @default(uuid())
  instituteId String
  institute   Institute  @relation(fields: [instituteId], references: [id], onDelete: Cascade)
  day         String     // MONDAY, TUESDAY...
  period      Int
  startTime   String
  endTime     String
  classId     String
  class       Class      @relation(fields: [classId], references: [id], onDelete: Cascade)
  sectionName String
  subjectName String
  teacherName String
  roomNo      String

  @@index([classId, day, period])
}

model Homework {
  id              String     @id @default(uuid())
  instituteId     String
  institute       Institute  @relation(fields: [instituteId], references: [id], onDelete: Cascade)
  classId         String
  class           Class      @relation(fields: [classId], references: [id], onDelete: Cascade)
  section         String
  subjectId       String
  subject         Subject    @relation(fields: [subjectId], references: [id])
  title           String
  description     String
  assignedDate    DateTime   @default(now())
  dueDate         DateTime
  attachmentUrl   String?
  assignedBy      String

  createdAt       DateTime   @default(now())
}

// ----------------------------------------------------
// BEHAVIOUR, CONDUCT & SKILLS
// ----------------------------------------------------
model BehaviourLog {
  id          String     @id @default(uuid())
  instituteId String
  institute   Institute  @relation(fields: [instituteId], references: [id], onDelete: Cascade)
  studentId   String
  student     Student    @relation(fields: [studentId], references: [id], onDelete: Cascade)
  type        String     // MERIT, DEMERIT, NEUTRAL
  category    String     // DISCIPLINE, ACADEMIC_EXCELLENCE, etc.
  points      Int        @default(1)
  date        DateTime   @default(now())
  description String
  recordedBy  String
}

// ----------------------------------------------------
// EXAMINATIONS & RESULTS
// ----------------------------------------------------
model ExamSession {
  id           String          @id @default(uuid())
  instituteId  String
  institute    Institute       @relation(fields: [instituteId], references: [id], onDelete: Cascade)
  title        String
  academicYear String
  term         String
  startDate    DateTime
  endDate      DateTime
  status       ExamStatus      @default(UPCOMING)
  results      StudentResult[]

  createdAt    DateTime        @default(now())
}

model StudentResult {
  id             String         @id @default(uuid())
  examSessionId  String
  examSession    ExamSession    @relation(fields: [examSessionId], references: [id], onDelete: Cascade)
  classId        String
  class          Class          @relation(fields: [classId], references: [id])
  studentId      String
  student        Student        @relation(fields: [studentId], references: [id], onDelete: Cascade)
  totalMaxMarks  Decimal        @db.Decimal(6, 2)
  totalObtained  Decimal        @db.Decimal(6, 2)
  percentage     Decimal        @db.Decimal(5, 2)
  gpa            Decimal        @db.Decimal(3, 2)
  overallGrade   String
  rank           Int?
  status         String         @default("PASSED")

  marks          ExamMark[]

  createdAt      DateTime       @default(now())

  @@unique([examSessionId, studentId])
}

model ExamMark {
  id              String        @id @default(uuid())
  studentResultId String
  studentResult   StudentResult @relation(fields: [studentResultId], references: [id], onDelete: Cascade)
  subjectId       String
  subject         Subject       @relation(fields: [subjectId], references: [id])
  totalMarks      Decimal       @db.Decimal(5, 2)
  obtainedMarks   Decimal       @db.Decimal(5, 2)
  grade           String
  remarks         String?
}

// ----------------------------------------------------
// CERTIFICATES & COMMUNICATIONS
// ----------------------------------------------------
model CertificateRecord {
  id             String          @id @default(uuid())
  instituteId    String
  institute      Institute       @relation(fields: [instituteId], references: [id], onDelete: Cascade)
  certificateNo  String          @unique
  type           CertificateType
  recipientId    String
  student        Student?        @relation(fields: [recipientId], references: [id])
  recipientName  String
  issueDate      DateTime        @default(now())
  reason         String
  academicConduct String?
  printedCount   Int             @default(1)

  createdAt      DateTime        @default(now())
}

model Notice {
  id             String          @id @default(uuid())
  instituteId    String
  institute      Institute       @relation(fields: [instituteId], references: [id], onDelete: Cascade)
  title          String
  category       String
  content        String
  targetAudience String          @default("ALL")
  publishDate    DateTime        @default(now())
  isPinned       Boolean         @default(false)
  author         String
}
`;
