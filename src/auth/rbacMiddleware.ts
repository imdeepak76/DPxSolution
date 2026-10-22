import { UserRole } from '../types';
import { ModuleKey } from '../context/SchoolContext';
import { StudentClearanceStatus, PortalRoute, AuthRoute, UserSession } from '../types/auth';
import { Student, FeeInvoice } from '../types';

export const ROLE_PORTAL_MAP: Record<UserRole, PortalRoute> = {
  SUPER_ADMIN: '/portal/admin',
  PRINCIPAL: '/portal/principal',
  ACCOUNTANT: '/portal/accounts',
  TEACHER: '/portal/teacher',
  STUDENT: '/portal/student',
  PARENT: '/portal/parent',
  CLERK: '/portal/accounts'
};

export const PORTAL_ROLE_MAP: Record<PortalRoute, UserRole[]> = {
  '/portal/admin': ['SUPER_ADMIN'],
  '/portal/principal': ['SUPER_ADMIN', 'PRINCIPAL'],
  '/portal/accounts': ['SUPER_ADMIN', 'ACCOUNTANT', 'CLERK'],
  '/portal/teacher': ['SUPER_ADMIN', 'TEACHER'],
  '/portal/student': ['STUDENT'],
  '/portal/parent': ['PARENT']
};

export interface PortalConfig {
  route: PortalRoute;
  name: string;
  allowedRoles: UserRole[];
  description: string;
  badgeColor: string;
}

export const PORTAL_CONFIGS: Record<PortalRoute, PortalConfig> = {
  '/portal/admin': {
    route: '/portal/admin',
    name: 'Master Governance Portal',
    allowedRoles: ['SUPER_ADMIN'],
    description: 'Unrestricted master control, all 22 modules, system configs, audit logs.',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  '/portal/principal': {
    route: '/portal/principal',
    name: 'Executive Leadership Portal',
    allowedRoles: ['SUPER_ADMIN', 'PRINCIPAL'],
    description: 'Operational control: academics, exams, admissions, staff governance, reports.',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200'
  },
  '/portal/accounts': {
    route: '/portal/accounts',
    name: 'Bursar & Finance Desk',
    allowedRoles: ['SUPER_ADMIN', 'ACCOUNTANT', 'CLERK'],
    description: 'Restricted: Fees, Salaries, Chart of Accounts, Income/Expenses, Fee Receipts.',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  },
  '/portal/teacher': {
    route: '/portal/teacher',
    name: 'Faculty Instruction Portal',
    allowedRoles: ['SUPER_ADMIN', 'TEACHER'],
    description: 'Restricted: Assigned Classes, Attendance marking, Homework, Question Papers, Test Marks.',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  '/portal/student': {
    route: '/portal/student',
    name: 'Student Learner Portal',
    allowedRoles: ['STUDENT'],
    description: 'Strictly Read-Only: Attendance history, fee status, homework, progress, gated Admit Card & Report Card.',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  },
  '/portal/parent': {
    route: '/portal/parent',
    name: 'Parent Guardian Portal',
    allowedRoles: ['PARENT'],
    description: 'Read-Only: Children overview, fee payment gateway, attendance & notifications.',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200'
  }
};

/**
 * Gets canonical portal route for a given role
 */
export function getCanonicalPortalRoute(role: UserRole): PortalRoute {
  return ROLE_PORTAL_MAP[role] || '/portal/student';
}

/**
 * Strict Portal Authorization Checker
 */
export function canRoleAccessPortal(role: UserRole, portalRoute: string): boolean {
  const normalizedRoute = portalRoute.split('?')[0].replace(/\/+$/, '') as PortalRoute;
  const allowedRoles = PORTAL_ROLE_MAP[normalizedRoute];
  if (!allowedRoles) {
    return false;
  }
  return allowedRoles.includes(role);
}

/**
 * Institutional Demo Credentials Definition
 */
export interface DemoAccount {
  role: UserRole;
  portalRoute: PortalRoute;
  identifier: string;
  password: string;
  displayName: string;
  description: string;
  details?: {
    className?: string;
    section?: string;
    admissionNo?: string;
    employeeCode?: string;
    department?: string;
  };
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    role: 'SUPER_ADMIN',
    portalRoute: '/portal/admin',
    identifier: 'admin@dpxsolution.edu',
    password: 'Admin@2026!',
    displayName: 'Dr. Gregory Sterling',
    description: 'Unrestricted master control over all 22 modules and institutional configs',
    details: { employeeCode: 'EMP-ADM-01', department: 'Executive Directorate' }
  },
  {
    role: 'PRINCIPAL',
    portalRoute: '/portal/principal',
    identifier: 'principal@dpxsolution.edu',
    password: 'Principal@2026!',
    displayName: 'Dr. Patricia Holt',
    description: 'Head of Institution: academic scheduling, grading, admissions and faculty',
    details: { employeeCode: 'EMP-PRN-01', department: 'Academic Governance' }
  },
  {
    role: 'ACCOUNTANT',
    portalRoute: '/portal/accounts',
    identifier: 'accountant@dpxsolution.edu',
    password: 'Finance@2026!',
    displayName: 'Marcus Sterling-Price',
    description: 'Bursar: fee cashier POS, payroll disbursement, income/expense ledgers',
    details: { employeeCode: 'EMP-ACC-01', department: 'Accounts & Bursar Office' }
  },
  {
    role: 'TEACHER',
    portalRoute: '/portal/teacher',
    identifier: 'teacher.morris@dpxsolution.edu',
    password: 'Teacher@2026!',
    displayName: 'Prof. Ronald Morris',
    description: 'Faculty: class attendance marker, homework board, mark sheets',
    details: { employeeCode: 'EMP-TEA-03', department: 'Senior Science Faculty' }
  },
  {
    role: 'STUDENT',
    portalRoute: '/portal/student',
    identifier: 'DPX-2024-001',
    password: 'Student@2026!',
    displayName: 'Alexander Wright',
    description: 'Student: read-only timetable, attendance, gated admit cards & reports',
    details: { admissionNo: 'DPX-2024-001', className: 'Grade 10', section: 'A' }
  },
  {
    role: 'PARENT',
    portalRoute: '/portal/parent',
    identifier: 'parent.wright@gmail.com',
    password: 'Parent@2026!',
    displayName: 'Robert Wright (Guardian)',
    description: 'Parent: ward progress, live attendance alerts, fee online payment',
    details: { admissionNo: 'DPX-2024-001', className: 'Grade 10', section: 'A' }
  }
];

/**
 * Auto-detect user role from identifier string
 */
export function detectRoleFromIdentifier(identifier: string): UserRole | null {
  const id = identifier.trim().toLowerCase();
  if (!id) return null;

  if (id.startsWith('dpx-') || id.startsWith('std-') || id.includes('student')) {
    return 'STUDENT';
  }
  if (id.startsWith('par-') || id.includes('parent') || id.includes('guardian')) {
    return 'PARENT';
  }
  if (id.startsWith('emp-tea') || id.includes('teacher') || id.includes('faculty')) {
    return 'TEACHER';
  }
  if (id.startsWith('emp-acc') || id.includes('account') || id.includes('finance') || id.includes('bursar')) {
    return 'ACCOUNTANT';
  }
  if (id.startsWith('emp-prn') || id.includes('principal') || id.includes('headmaster')) {
    return 'PRINCIPAL';
  }
  if (id.startsWith('emp-adm') || id.includes('admin') || id.includes('root') || id.includes('director')) {
    return 'SUPER_ADMIN';
  }

  // Exact matching against demo accounts
  const match = DEMO_ACCOUNTS.find(a => a.identifier.toLowerCase() === id);
  if (match) return match.role;

  return null;
}

/**
 * Centralized Route Guard Evaluator
 */
export function evaluateRouteGuard(
  userSession: UserSession | null,
  targetPath: string
): {
  status: 'ALLOWED' | 'REDIRECT_LOGIN' | 'FORBIDDEN_403';
  redirectPath?: string;
  reason?: string;
  attemptedRoute?: string;
  userRole?: UserRole;
  canonicalRoute?: PortalRoute;
} {
  const cleanPath = (targetPath || '/').split('?')[0].replace(/\/+$/, '') || '/';

  // 1. Unauthenticated handling
  if (!userSession) {
    if (cleanPath === '' || cleanPath === '/' || cleanPath === '/login') {
      return { status: 'ALLOWED' };
    }
    // Attempting to access protected portal routes or modules without session
    return {
      status: 'REDIRECT_LOGIN',
      redirectPath: '/login?unauthorized=true',
      reason: 'Authentication required. No active institutional session verified.'
    };
  }

  // 2. Authenticated user visiting /login or root /
  if (cleanPath === '' || cleanPath === '/' || cleanPath === '/login') {
    const canonical = getCanonicalPortalRoute(userSession.role);
    return {
      status: 'ALLOWED',
      redirectPath: canonical
    };
  }

  // 3. Portal Route Guard Interception
  if (cleanPath.startsWith('/portal/')) {
    const isAllowed = canRoleAccessPortal(userSession.role, cleanPath);
    if (!isAllowed) {
      const canonical = getCanonicalPortalRoute(userSession.role);
      return {
        status: 'FORBIDDEN_403',
        redirectPath: canonical,
        userRole: userSession.role,
        canonicalRoute: canonical,
        attemptedRoute: cleanPath,
        reason: `Role Boundary Violation: User role '${userSession.role}' is not authorized to access '${cleanPath}'. All cross-portal traversal is blocked.`
      };
    }
    return { status: 'ALLOWED' };
  }

  return { status: 'ALLOWED' };
}

export interface RoleCapability {
  role: UserRole;
  title: string;
  description: string;
  allowedModules: ModuleKey[];
  restrictedModules: ModuleKey[];
  canEdit: boolean;
  canExport: boolean;
  canManageUsers: boolean;
  canManageFinancials: boolean;
  canAlterCurriculum: boolean;
}

export const RBAC_ROLE_CAPABILITIES: Record<UserRole, RoleCapability> = {
  SUPER_ADMIN: {
    role: 'SUPER_ADMIN',
    title: 'Super Administrator',
    description: 'Unrestricted / Full System Access. Institutional governance, database backups, audit logs, tenant branches.',
    allowedModules: [
      'dashboard', 'general-settings', 'classes', 'subject', 'students', 'employees',
      'account', 'fee', 'salary', 'attendance', 'timetable', 'homework', 'behaviour',
      'whatsapp', 'messaging', 'sms', 'live-class', 'question-paper', 'exams',
      'class-tests', 'reports', 'certificate'
    ],
    restrictedModules: [],
    canEdit: true,
    canExport: true,
    canManageUsers: true,
    canManageFinancials: true,
    canAlterCurriculum: true
  },
  PRINCIPAL: {
    role: 'PRINCIPAL',
    title: 'School Principal & Head of Institution',
    description: 'Full Operational Software Control over academic schedules, faculty governance, exam grading, report approvals.',
    allowedModules: [
      'dashboard', 'general-settings', 'classes', 'subject', 'students', 'employees',
      'account', 'fee', 'salary', 'attendance', 'timetable', 'homework', 'behaviour',
      'whatsapp', 'messaging', 'sms', 'live-class', 'question-paper', 'exams',
      'class-tests', 'reports', 'certificate'
    ],
    restrictedModules: [],
    canEdit: true,
    canExport: true,
    canManageUsers: true,
    canManageFinancials: true,
    canAlterCurriculum: true
  },
  ACCOUNTANT: {
    role: 'ACCOUNTANT',
    title: 'Accountant / Finance Staff',
    description: 'Strictly restricted to Financial, Payroll & Fee-Linked Document modules. Blocked from altering curriculum or system configs.',
    allowedModules: [
      'dashboard', 'account', 'fee', 'salary', 'certificate', 'reports'
    ],
    restrictedModules: [
      'general-settings', 'classes', 'subject', 'homework', 'exams', 'question-paper', 'class-tests'
    ],
    canEdit: true,
    canExport: true,
    canManageUsers: false,
    canManageFinancials: true,
    canAlterCurriculum: false
  },
  TEACHER: {
    role: 'TEACHER',
    title: 'Classroom Faculty & Subject Teacher',
    description: 'Classroom instruction, daily attendance, gradebook mark sheets, homework board, conduct points.',
    allowedModules: [
      'dashboard', 'classes', 'subject', 'students', 'attendance', 'timetable',
      'homework', 'behaviour', 'messaging', 'live-class', 'question-paper', 'exams',
      'class-tests', 'reports'
    ],
    restrictedModules: ['account', 'salary', 'general-settings'],
    canEdit: true,
    canExport: true,
    canManageUsers: false,
    canManageFinancials: false,
    canAlterCurriculum: true
  },
  CLERK: {
    role: 'CLERK',
    title: 'Admissions & Student Registry Clerk',
    description: 'Student directory, admission intake, certificate processing, SMS notifications.',
    allowedModules: [
      'dashboard', 'students', 'attendance', 'certificate', 'messaging', 'sms', 'reports'
    ],
    restrictedModules: ['account', 'salary', 'general-settings'],
    canEdit: true,
    canExport: true,
    canManageUsers: false,
    canManageFinancials: false,
    canAlterCurriculum: false
  },
  STUDENT: {
    role: 'STUDENT',
    title: 'Enrolled Student',
    description: 'Strictly View-Only access to attendance, timetable, homework, fee statement, and exam schedules with conditional gating.',
    allowedModules: [
      'dashboard', 'attendance', 'timetable', 'homework', 'messaging', 'exams', 'reports'
    ],
    restrictedModules: [
      'general-settings', 'classes', 'subject', 'employees', 'account', 'fee',
      'salary', 'behaviour', 'whatsapp', 'sms', 'question-paper', 'class-tests'
    ],
    canEdit: false,
    canExport: false,
    canManageUsers: false,
    canManageFinancials: false,
    canAlterCurriculum: false
  },
  PARENT: {
    role: 'PARENT',
    title: 'Parent / Legal Guardian',
    description: 'Strictly View-Only parental portal for student academic progress, fee billing, and circulars with conditional gating.',
    allowedModules: [
      'dashboard', 'attendance', 'timetable', 'homework', 'messaging', 'exams', 'reports'
    ],
    restrictedModules: [
      'general-settings', 'classes', 'subject', 'employees', 'account', 'fee',
      'salary', 'behaviour', 'whatsapp', 'sms', 'question-paper', 'class-tests'
    ],
    canEdit: false,
    canExport: false,
    canManageUsers: false,
    canManageFinancials: false,
    canAlterCurriculum: false
  }
};

/**
 * Route Guard validator: verifies if active role has permission to access target module
 */
export function checkModuleAccess(
  role: UserRole,
  moduleKey: ModuleKey
): { allowed: boolean; reason?: string } {
  const capability = RBAC_ROLE_CAPABILITIES[role];
  if (!capability) {
    return { allowed: false, reason: 'Unknown user role' };
  }

  // Super Admin & Principal have uninhibited access
  if (role === 'SUPER_ADMIN' || role === 'PRINCIPAL') {
    return { allowed: true };
  }

  if (capability.restrictedModules.includes(moduleKey)) {
    return {
      allowed: false,
      reason: `Access Denied: The '${capability.title}' role is restricted from accessing the '${moduleKey}' module according to institutional compliance policies.`
    };
  }

  if (capability.allowedModules.includes(moduleKey)) {
    return { allowed: true };
  }

  return {
    allowed: false,
    reason: `Insufficient Privileges: Your current session role (${role}) does not have permissions for '${moduleKey}'.`
  };
}

/**
 * CONDITIONAL GATE 1: Exam Admit Card Gate
 * Locks admit card download/view unless current month fee is paid and outstanding balance is $0
 */
export function evaluateAdmitCardGate(
  student: Student,
  invoices: FeeInvoice[]
): {
  isUnlocked: boolean;
  currentMonthFeePaid: boolean;
  totalOutstandingDue: number;
  reason: string;
} {
  // Find invoices associated with this student
  const studentInvoices = invoices.filter(inv => inv.studentId === student.id);
  const totalOutstandingDue = studentInvoices.reduce((sum, inv) => sum + inv.dueAmount, 0);

  // Check current month invoice (e.g. October 2026)
  const currentMonthInv = studentInvoices.find(
    inv => inv.month.includes('October 2026') || inv.dueAmount > 0
  );

  const currentMonthFeePaid = !currentMonthInv || currentMonthInv.dueAmount === 0;
  const isUnlocked = currentMonthFeePaid && totalOutstandingDue === 0;

  let reason = '';
  if (!isUnlocked) {
    reason = `Admit Card locked: Please clear this month's fee dues ($${totalOutstandingDue} outstanding) to unlock examination hall ticket access.`;
  } else {
    reason = 'Admit Card verified: All current month tuition dues settled.';
  }

  return {
    isUnlocked,
    currentMonthFeePaid,
    totalOutstandingDue,
    reason
  };
}

/**
 * CONDITIONAL GATE 2: Report Card / Official Certificate Gate
 * Unlocks preview & printing only if full no-dues clearance exists across Library, Accounts, and Fees
 */
export function evaluateReportCardGate(
  student: Student,
  clearanceRecord?: StudentClearanceStatus
): {
  isUnlocked: boolean;
  noDuesCleared: boolean;
  pendingDuesList: string[];
  reason: string;
} {
  const pendingDuesList: string[] = [];

  if (clearanceRecord) {
    if (!clearanceRecord.currentMonthFeePaid || clearanceRecord.currentMonthDueAmount > 0) {
      pendingDuesList.push(`Accounts & Tuition Dues: $${clearanceRecord.currentMonthDueAmount} Pending`);
    }
    if (!clearanceRecord.libraryDuesCleared) {
      pendingDuesList.push(`Library Dues: ${clearanceRecord.pendingLibraryBooksCount} Unreturned Book(s)`);
    }
    if (!clearanceRecord.laboratoryDuesCleared) {
      pendingDuesList.push('Laboratory Equipment Clearance: Pending Verification');
    }
  } else {
    // Fallback based on student fee summary
    const feeCleared = student.totalFeePaid >= student.totalFeeAssessed;
    if (!feeCleared) {
      pendingDuesList.push(`Outstanding Institutional Dues: $${student.totalFeeAssessed - student.totalFeePaid}`);
    }
  }

  const isUnlocked = pendingDuesList.length === 0;

  return {
    isUnlocked,
    noDuesCleared: isUnlocked,
    pendingDuesList,
    reason: isUnlocked
      ? 'Official No-Dues Clearance verified across Accounts, Library, and Laboratory.'
      : `Report Card locked: Institutional clearance pending (${pendingDuesList.join('; ')}).`
  };
}
