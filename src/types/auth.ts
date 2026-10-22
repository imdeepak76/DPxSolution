import { UserRole } from './index';

export type AuthPortalType = 'ADMIN_PRINCIPAL' | 'STAFF_ACCOUNTANT' | 'STUDENT_PARENT';

export type PortalRoute =
  | '/portal/admin'
  | '/portal/principal'
  | '/portal/accounts'
  | '/portal/teacher'
  | '/portal/student'
  | '/portal/parent';

export type AuthRoute = PortalRoute | '/login';

export interface UserSession {
  userId: string;
  emailOrUsername: string;
  displayName: string;
  role: UserRole;
  portalType: AuthPortalType;
  portalRoute: PortalRoute;
  instituteId: string;
  instituteName: string;
  token: string;
  mfaVerified: boolean;
  avatarUrl?: string;
  lastLoginAt: string;
  expiresAt: string;
  // Specific to staff/teachers
  employeeCode?: string;
  department?: string;
  designation?: string;
  // Specific to students & parents
  studentId?: string;
  admissionNo?: string;
  rollNo?: string;
  className?: string;
  section?: string;
}

export interface LoginAuditLog {
  id: string;
  timestamp: string;
  username: string;
  role: UserRole;
  portal: AuthPortalType;
  ipAddress: string;
  userAgent: string;
  status: 'SUCCESS' | 'MFA_PENDING' | 'FAILED' | 'LOCKED';
  reason?: string;
}

export interface StudentClearanceStatus {
  studentId: string;
  currentMonthFeePaid: boolean;
  currentMonthDueAmount: number;
  libraryDuesCleared: boolean;
  pendingLibraryBooksCount: number;
  laboratoryDuesCleared: boolean;
  sportsDuesCleared: boolean;
  generalAccountsCleared: boolean;
  noDuesCertificateIssued: boolean;
  clearanceVerifiedBy?: string;
  clearanceDate?: string;
}

export interface WindowModalState {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zoomLevel: number; // e.g. 80, 100, 120, 140
  title: string;
  type:
    | 'STUDENT_ID'
    | 'STAFF_ID'
    | 'FEE_RECEIPT'
    | 'SALARY_SLIP'
    | 'RESULT_CARD'
    | 'ADMIT_CARD'
    | 'CERTIFICATE'
    | 'ADMISSION_LETTER';
  data: any;
}
