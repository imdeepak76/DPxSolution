import React, { createContext, useContext, useState, useEffect } from 'react';
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
  SMSTemplate,
  UserRole
} from '../types';
import {
  AuthPortalType,
  UserSession,
  WindowModalState
} from '../types/auth';
import {
  INITIAL_INSTITUTE,
  INITIAL_CLASSES,
  INITIAL_SUBJECTS,
  INITIAL_STUDENTS,
  INITIAL_EMPLOYEES,
  INITIAL_INVOICES,
  INITIAL_RECEIPTS,
  INITIAL_TRANSACTIONS,
  INITIAL_SALARIES,
  INITIAL_TIMETABLE,
  INITIAL_HOMEWORK,
  INITIAL_BEHAVIOUR,
  INITIAL_EXAMS,
  INITIAL_RESULTS,
  INITIAL_NOTICES,
  INITIAL_CERTIFICATES,
  INITIAL_SMS_TEMPLATES
} from '../data/mockData';

export type ModuleKey =
  | 'dashboard'
  | 'general-settings'
  | 'classes'
  | 'subject'
  | 'students'
  | 'employees'
  | 'account'
  | 'fee'
  | 'salary'
  | 'attendance'
  | 'timetable'
  | 'homework'
  | 'behaviour'
  | 'whatsapp'
  | 'messaging'
  | 'sms'
  | 'live-class'
  | 'question-paper'
  | 'exams'
  | 'class-tests'
  | 'reports'
  | 'certificate'
  | 'auth-portals';

export interface PrintPayload {
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

interface SchoolContextType {
  institute: InstituteProfile;
  setInstitute: React.Dispatch<React.SetStateAction<InstituteProfile>>;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeModule: ModuleKey;
  setActiveModule: (module: ModuleKey) => void;
  activeSubmenu: string | null;
  setActiveSubmenu: (sub: string | null) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  isRTL: boolean;
  setIsRTL: (rtl: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Routing & Security
  currentRoute: string;
  setCurrentRoute: (r: string) => void;
  navigateToRoute: (r: string) => void;

  // Authentication & Sessions
  userSession: UserSession | null;
  activeAuthPortal: AuthPortalType;
  setActiveAuthPortal: (portal: AuthPortalType) => void;
  loginUser: (session: UserSession) => void;
  logoutUser: () => void;

  // Data states
  classes: SchoolClass[];
  subjects: Subject[];
  students: Student[];
  employees: Employee[];
  invoices: FeeInvoice[];
  receipts: FeeReceipt[];
  transactions: AccountTransaction[];
  salaries: SalaryRecord[];
  timetable: TimeTableSlot[];
  homework: HomeworkAssignment[];
  behaviourLogs: BehaviourLog[];
  exams: ExamSession[];
  results: StudentResult[];
  notices: NoticeItem[];
  certificates: CertificateRecord[];
  smsTemplates: SMSTemplate[];

  // Action methods
  addStudent: (student: Omit<Student, 'id' | 'admissionNo'>) => Student;
  updateStudentStatus: (id: string, status: Student['status']) => void;
  addEmployee: (emp: Omit<Employee, 'id' | 'employeeCode'>) => Employee;
  addClass: (cls: Omit<SchoolClass, 'id'>) => SchoolClass;
  addSubject: (sub: Omit<Subject, 'id'>) => Subject;
  collectFee: (invoiceId: string, amount: number, method: FeeReceipt['paymentMethod'], ref?: string) => FeeReceipt;
  createInvoice: (inv: Omit<FeeInvoice, 'id' | 'invoiceNo' | 'issueDate' | 'dueAmount' | 'paidAmount' | 'status'>) => FeeInvoice;
  addTransaction: (tx: Omit<AccountTransaction, 'id' | 'refNo'>) => AccountTransaction;
  processSalaryPayment: (salaryId: string, paymentMethod: string) => void;
  addBehaviourLog: (log: Omit<BehaviourLog, 'id'>) => void;
  issueCertificate: (cert: Omit<CertificateRecord, 'id' | 'certificateNo' | 'printedCount'>) => CertificateRecord;
  addNotice: (notice: Omit<NoticeItem, 'id' | 'publishDate'>) => void;
  addHomework: (hw: Omit<HomeworkAssignment, 'id' | 'assignedDate' | 'submissionCount'>) => void;

  // Modals & Window System
  windowModalState: WindowModalState | null;
  setWindowModalState: React.Dispatch<React.SetStateAction<WindowModalState | null>>;
  openWindowModal: (params: { type: WindowModalState['type']; title: string; data: any }) => void;
  closeWindowModal: () => void;
  printPayload: PrintPayload | null;
  openPrintModal: (payload: PrintPayload) => void;
  closePrintModal: () => void;
  isArchitectureModalOpen: boolean;
  setIsArchitectureModalOpen: (open: boolean) => void;
  resetAllData: () => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [institute, setInstitute] = useState<InstituteProfile>(() => {
    const saved = localStorage.getItem('dpx_institute');
    return saved ? JSON.parse(saved) : INITIAL_INSTITUTE;
  });

  // Default Session: null (Mandatory login interface at entry point)
  const [userSession, setUserSession] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem('dpx_user_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.token && parsed.role) {
          return parsed;
        }
      } catch (e) {
        // fallback
      }
    }
    return null;
  });

  const [currentRole, setCurrentRole] = useState<UserRole>(() => userSession?.role || 'SUPER_ADMIN');
  const [activeAuthPortal, setActiveAuthPortal] = useState<AuthPortalType>('ADMIN_PRINCIPAL');

  // Unified Route State synchronized with window.location
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash && hash !== '/') return hash;
      const path = window.location.pathname;
      if (path && path !== '/') return path;
    }
    return userSession ? userSession.portalRoute : '/login';
  });

  // Helper to change routes
  const navigateToRoute = (targetRoute: string) => {
    setCurrentRoute(targetRoute);
    if (typeof window !== 'undefined') {
      window.location.hash = targetRoute;
    }
  };

  // Synchronize hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace(/^#/, '');
      if (rawHash) {
        setCurrentRoute(rawHash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const [activeModule, setActiveModule] = useState<ModuleKey>('dashboard');
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isRTL, setIsRTL] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [classes, setClasses] = useState<SchoolClass[]>(() => {
    const saved = localStorage.getItem('dpx_classes');
    return saved ? JSON.parse(saved) : INITIAL_CLASSES;
  });

  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('dpx_subjects');
    return saved ? JSON.parse(saved) : INITIAL_SUBJECTS;
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('dpx_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('dpx_employees');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
  });

  const [invoices, setInvoices] = useState<FeeInvoice[]>(() => {
    const saved = localStorage.getItem('dpx_invoices');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [receipts, setReceipts] = useState<FeeReceipt[]>(() => {
    const saved = localStorage.getItem('dpx_receipts');
    return saved ? JSON.parse(saved) : INITIAL_RECEIPTS;
  });

  const [transactions, setTransactions] = useState<AccountTransaction[]>(() => {
    const saved = localStorage.getItem('dpx_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [salaries, setSalaries] = useState<SalaryRecord[]>(() => {
    const saved = localStorage.getItem('dpx_salaries');
    return saved ? JSON.parse(saved) : INITIAL_SALARIES;
  });

  const [timetable, setTimetable] = useState<TimeTableSlot[]>(INITIAL_TIMETABLE);
  const [homework, setHomework] = useState<HomeworkAssignment[]>(INITIAL_HOMEWORK);
  const [behaviourLogs, setBehaviourLogs] = useState<BehaviourLog[]>(INITIAL_BEHAVIOUR);
  const [exams, setExams] = useState<ExamSession[]>(INITIAL_EXAMS);
  const [results, setResults] = useState<StudentResult[]>(INITIAL_RESULTS);
  const [notices, setNotices] = useState<NoticeItem[]>(INITIAL_NOTICES);
  const [certificates, setCertificates] = useState<CertificateRecord[]>(INITIAL_CERTIFICATES);
  const [smsTemplates, setSmsTemplates] = useState<SMSTemplate[]>(INITIAL_SMS_TEMPLATES);

  // Window-Style Modal Preview State
  const [windowModalState, setWindowModalState] = useState<WindowModalState | null>(null);
  const [printPayload, setPrintPayload] = useState<PrintPayload | null>(null);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('dpx_institute', JSON.stringify(institute));
  }, [institute]);
  useEffect(() => {
    localStorage.setItem('dpx_students', JSON.stringify(students));
  }, [students]);
  useEffect(() => {
    localStorage.setItem('dpx_invoices', JSON.stringify(invoices));
  }, [invoices]);
  useEffect(() => {
    localStorage.setItem('dpx_receipts', JSON.stringify(receipts));
  }, [receipts]);
  useEffect(() => {
    localStorage.setItem('dpx_transactions', JSON.stringify(transactions));
  }, [transactions]);
  useEffect(() => {
    localStorage.setItem('dpx_salaries', JSON.stringify(salaries));
  }, [salaries]);
  useEffect(() => {
    if (userSession) {
      localStorage.setItem('dpx_user_session', JSON.stringify(userSession));
    } else {
      localStorage.removeItem('dpx_user_session');
    }
  }, [userSession]);

  // Strict Session Isolation: No automatic role mutation
  const loginUser = (session: UserSession) => {
    setUserSession(session);
    setCurrentRole(session.role);
    localStorage.setItem('dpx_user_session', JSON.stringify(session));
    const targetRoute = session.portalRoute;
    setCurrentRoute(targetRoute);
    if (typeof window !== 'undefined') {
      window.location.hash = targetRoute;
    }
    setActiveModule('dashboard');
  };

  const logoutUser = () => {
    // Explicit session invalidation & purge
    setUserSession(null);
    localStorage.removeItem('dpx_user_session');
    sessionStorage.clear();
    setCurrentRoute('/login');
    if (typeof window !== 'undefined') {
      window.location.hash = '/login';
    }
    setActiveModule('dashboard');
    setIsDrawerOpen(false);
    setWindowModalState(null);
    setPrintPayload(null);
    setIsArchitectureModalOpen(false);
  };

  const openWindowModal = ({
    type,
    title,
    data
  }: {
    type: WindowModalState['type'];
    title: string;
    data: any;
  }) => {
    setWindowModalState({
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zoomLevel: 100,
      title,
      type,
      data
    });
  };

  const closeWindowModal = () => {
    setWindowModalState(null);
  };

  const openPrintModal = (payload: PrintPayload) => {
    // Route legacy openPrintModal into the window-style modal system
    openWindowModal({
      type: payload.type as any,
      title: `${payload.type.replace('_', ' ')} Document`,
      data: payload.data
    });
    setPrintPayload(payload);
  };

  const closePrintModal = () => {
    setPrintPayload(null);
    closeWindowModal();
  };

  const addStudent = (stuData: Omit<Student, 'id' | 'admissionNo'>): Student => {
    const newId = `stu-${Date.now()}`;
    const nextSeq = String(students.length + 1).padStart(3, '0');
    const admissionNo = `DPX-2026-${nextSeq}`;
    const newStudent: Student = {
      ...stuData,
      id: newId,
      admissionNo
    };
    setStudents(prev => [newStudent, ...prev]);

    // Update class enrolled count
    setClasses(prev =>
      prev.map(c => (c.name === stuData.className ? { ...c, enrolledStudents: c.enrolledStudents + 1 } : c))
    );

    return newStudent;
  };

  const updateStudentStatus = (id: string, status: Student['status']) => {
    setStudents(prev => prev.map(s => (s.id === id ? { ...s, status } : s)));
  };

  const addEmployee = (empData: Omit<Employee, 'id' | 'employeeCode'>): Employee => {
    const newId = `emp-${Date.now()}`;
    const employeeCode = `EMP-${empData.role.slice(0, 3)}-${String(employees.length + 1).padStart(2, '0')}`;
    const newEmployee: Employee = {
      ...empData,
      id: newId,
      employeeCode
    };
    setEmployees(prev => [newEmployee, ...prev]);
    return newEmployee;
  };

  const addClass = (clsData: Omit<SchoolClass, 'id'>): SchoolClass => {
    const newCls: SchoolClass = {
      ...clsData,
      id: `c-${Date.now()}`
    };
    setClasses(prev => [...prev, newCls]);
    return newCls;
  };

  const addSubject = (subData: Omit<Subject, 'id'>): Subject => {
    const newSub: Subject = {
      ...subData,
      id: `sub-${Date.now()}`
    };
    setSubjects(prev => [...prev, newSub]);
    return newSub;
  };

  const collectFee = (
    invoiceId: string,
    amountPaid: number,
    method: FeeReceipt['paymentMethod'],
    ref?: string
  ): FeeReceipt => {
    const targetInv = invoices.find(inv => inv.id === invoiceId);
    if (!targetInv) throw new Error('Invoice not found');

    const totalPaidNow = targetInv.paidAmount + amountPaid;
    const remainingDue = Math.max(0, targetInv.amount + targetInv.fine - targetInv.discount - totalPaidNow);
    const newStatus: FeeInvoice['status'] = remainingDue === 0 ? 'PAID' : 'PARTIAL';

    // 1. Update Invoice
    setInvoices(prev =>
      prev.map(inv =>
        inv.id === invoiceId
          ? {
              ...inv,
              paidAmount: totalPaidNow,
              dueAmount: remainingDue,
              status: newStatus
            }
          : inv
      )
    );

    // 2. Generate Receipt
    const receiptNo = `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReceipt: FeeReceipt = {
      id: `rcp-${Date.now()}`,
      receiptNo,
      invoiceId,
      studentId: targetInv.studentId,
      studentName: targetInv.studentName,
      className: targetInv.className,
      amountPaid,
      paymentMethod: method,
      transactionRef: ref || `POS-${Math.floor(100000 + Math.random() * 900000)}`,
      paymentDate: new Date().toISOString().split('T')[0],
      receivedBy: 'Chief Bursar (Marcus)'
    };
    setReceipts(prev => [newReceipt, ...prev]);

    // 3. Add to Account Transactions (Income Ledger)
    const newTx: AccountTransaction = {
      id: `tx-${Date.now()}`,
      refNo: `TXN-INC-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'INCOME',
      category: 'Tuition & Academic Fees',
      ledgerName: 'Student Tuition Fee Account',
      amount: amountPaid,
      date: new Date().toISOString().split('T')[0],
      paymentMethod: method,
      description: `POS Fee collection for ${targetInv.studentName} (${targetInv.className}) - ${targetInv.month}`,
      recordedBy: 'Marcus Sterling-Price'
    };
    setTransactions(prev => [newTx, ...prev]);

    // 4. Update student's fee paid summary
    setStudents(prev =>
      prev.map(s => (s.id === targetInv.studentId ? { ...s, totalFeePaid: s.totalFeePaid + amountPaid } : s))
    );

    return newReceipt;
  };

  const createInvoice = (
    invData: Omit<FeeInvoice, 'id' | 'invoiceNo' | 'issueDate' | 'dueAmount' | 'paidAmount' | 'status'>
  ): FeeInvoice => {
    const newId = `inv-${Date.now()}`;
    const invoiceNo = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const dueAmount = invData.amount + invData.fine - invData.discount;
    const newInvoice: FeeInvoice = {
      ...invData,
      id: newId,
      invoiceNo,
      issueDate: new Date().toISOString().split('T')[0],
      paidAmount: 0,
      dueAmount,
      status: 'UNPAID'
    };
    setInvoices(prev => [newInvoice, ...prev]);
    return newInvoice;
  };

  const addTransaction = (txData: Omit<AccountTransaction, 'id' | 'refNo'>): AccountTransaction => {
    const refNo = `TXN-${txData.type === 'INCOME' ? 'INC' : 'EXP'}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTx: AccountTransaction = {
      ...txData,
      id: `tx-${Date.now()}`,
      refNo
    };
    setTransactions(prev => [newTx, ...prev]);
    return newTx;
  };

  const processSalaryPayment = (salaryId: string, paymentMethod: string) => {
    const sal = salaries.find(s => s.id === salaryId);
    if (!sal) return;

    setSalaries(prev =>
      prev.map(s =>
        s.id === salaryId
          ? {
              ...s,
              status: 'PAID',
              paymentDate: new Date().toISOString().split('T')[0],
              paymentMethod
            }
          : s
      )
    );

    // Record expense transaction
    addTransaction({
      type: 'EXPENSE',
      category: 'Staff Payroll',
      ledgerName: 'Faculty Salary Account',
      amount: sal.netSalary,
      date: new Date().toISOString().split('T')[0],
      paymentMethod,
      description: `Payroll disbursement to ${sal.employeeName} (${sal.designation}) for ${sal.month} ${sal.year}`,
      recordedBy: 'Marcus Sterling-Price'
    });
  };

  const addBehaviourLog = (logData: Omit<BehaviourLog, 'id'>) => {
    const newLog: BehaviourLog = {
      ...logData,
      id: `beh-${Date.now()}`
    };
    setBehaviourLogs(prev => [newLog, ...prev]);
  };

  const issueCertificate = (
    certData: Omit<CertificateRecord, 'id' | 'certificateNo' | 'printedCount'>
  ): CertificateRecord => {
    const certificateNo = `DPX-CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCert: CertificateRecord = {
      ...certData,
      id: `cert-${Date.now()}`,
      certificateNo,
      printedCount: 1
    };
    setCertificates(prev => [newCert, ...prev]);
    return newCert;
  };

  const addNotice = (noticeData: Omit<NoticeItem, 'id' | 'publishDate'>) => {
    const newNotice: NoticeItem = {
      ...noticeData,
      id: `not-${Date.now()}`,
      publishDate: new Date().toISOString().split('T')[0]
    };
    setNotices(prev => [newNotice, ...prev]);
  };

  const addHomework = (hwData: Omit<HomeworkAssignment, 'id' | 'assignedDate' | 'submissionCount'>) => {
    const newHw: HomeworkAssignment = {
      ...hwData,
      id: `hw-${Date.now()}`,
      assignedDate: new Date().toISOString().split('T')[0],
      submissionCount: 0
    };
    setHomework(prev => [newHw, ...prev]);
  };

  const resetAllData = () => {
    localStorage.clear();
    setInstitute(INITIAL_INSTITUTE);
    setClasses(INITIAL_CLASSES);
    setSubjects(INITIAL_SUBJECTS);
    setStudents(INITIAL_STUDENTS);
    setEmployees(INITIAL_EMPLOYEES);
    setInvoices(INITIAL_INVOICES);
    setReceipts(INITIAL_RECEIPTS);
    setTransactions(INITIAL_TRANSACTIONS);
    setSalaries(INITIAL_SALARIES);
    setTimetable(INITIAL_TIMETABLE);
    setHomework(INITIAL_HOMEWORK);
    setBehaviourLogs(INITIAL_BEHAVIOUR);
    setExams(INITIAL_EXAMS);
    setResults(INITIAL_RESULTS);
    setNotices(INITIAL_NOTICES);
    setCertificates(INITIAL_CERTIFICATES);
    setSmsTemplates(INITIAL_SMS_TEMPLATES);
  };

  return (
    <SchoolContext.Provider
      value={{
        institute,
        setInstitute,
        currentRole,
        setCurrentRole,
        activeModule,
        setActiveModule,
        activeSubmenu,
        setActiveSubmenu,
        isDrawerOpen,
        setIsDrawerOpen,
        isRTL,
        setIsRTL,
        searchQuery,
        setSearchQuery,
        currentRoute,
        setCurrentRoute,
        navigateToRoute,
        userSession,
        activeAuthPortal,
        setActiveAuthPortal,
        loginUser,
        logoutUser,
        classes,
        subjects,
        students,
        employees,
        invoices,
        receipts,
        transactions,
        salaries,
        timetable,
        homework,
        behaviourLogs,
        exams,
        results,
        notices,
        certificates,
        smsTemplates,
        addStudent,
        updateStudentStatus,
        addEmployee,
        addClass,
        addSubject,
        collectFee,
        createInvoice,
        addTransaction,
        processSalaryPayment,
        addBehaviourLog,
        issueCertificate,
        addNotice,
        addHomework,
        windowModalState,
        setWindowModalState,
        openWindowModal,
        closeWindowModal,
        printPayload,
        openPrintModal,
        closePrintModal,
        isArchitectureModalOpen,
        setIsArchitectureModalOpen,
        resetAllData
      }}
    >
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'font-sans rtl-mode' : 'font-sans'}>
        {children}
      </div>
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};
