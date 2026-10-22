import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  DollarSign,
  BookOpen,
  GraduationCap,
  Users,
  Receipt,
  CalendarCheck,
  Clock,
  ArrowRight,
  Sparkles,
  TrendingUp,
  AlertCircle,
  FileCheck2,
  CheckCircle2,
  Lock,
  CreditCard,
  FileSpreadsheet,
  FileQuestion,
  HelpCircle,
  BarChart3,
  Search,
  Printer,
  ChevronRight,
  Database
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { NAV_MODULES } from '../navigation/RightDrawer';
import { DashboardView } from './DashboardView';
import { StudentDashboardView } from './StudentDashboardView';

/**
 * SUPER ADMIN PORTAL VIEW (/portal/admin)
 * Master Institutional Control, 22-Module Launchpad, System Schema & Governance
 */
export const SuperAdminPortalView: React.FC = () => {
  const { setActiveModule, setIsArchitectureModalOpen, setIsDrawerOpen, institute } = useSchool();

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 p-6 text-white border border-purple-800/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-purple-300 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Root System Authority · Master Governance</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Super Administrator Control Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Unrestricted governance across all 22 operational modules, campus tenants, multi-branch databases, and RBAC permissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsArchitectureModalOpen(true)}
            className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-2 cursor-pointer"
          >
            <Database className="w-4 h-4" />
            <span>Database Schema</span>
          </button>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-2 cursor-pointer"
          >
            <span>22 Modules Drawer</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Embedded KPI Dashboard */}
      <DashboardView />
    </div>
  );
};

/**
 * PRINCIPAL PORTAL VIEW (/portal/principal)
 * Operational academic & faculty leadership, approvals, exams, attendance rates
 */
export const PrincipalPortalView: React.FC = () => {
  const { students, employees, classes, exams, results, setActiveModule } = useSchool();

  const totalStudents = students.length;
  const activeFaculty = employees.filter(e => e.role === 'TEACHER').length;
  const ongoingExams = exams.filter(e => e.status === 'ONGOING' || e.status === 'UPCOMING');
  const avgAttendance = 95.4;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 p-6 text-white border border-indigo-800/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>Executive Directorate · Operational Head</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Principal Academic & Staff Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Oversee classroom curriculum, student attendance benchmarks, faculty scheduling, and official exam results certification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveModule('exams')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-2 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Examinations Desk</span>
          </button>
        </div>
      </div>

      {/* Leadership KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Total Enrollment</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{totalStudents}</p>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">Across {classes.length} grades</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Faculty On Duty</span>
          <p className="text-2xl font-black text-indigo-600 mt-1">{activeFaculty}</p>
          <span className="text-[11px] text-slate-500 mt-1 inline-block">100% Assigned</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Campus Attendance</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">{avgAttendance}%</p>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">Today's Benchmark</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Active Exam Sessions</span>
          <p className="text-2xl font-black text-purple-600 mt-1">{ongoingExams.length}</p>
          <span className="text-[11px] text-purple-600 font-bold mt-1 inline-block">Mid-Term Evaluation</span>
        </div>
      </div>

      {/* Quick Operational Launchers */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Principal Action Dispatcher</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setActiveModule('attendance')}
            className="p-3 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-left transition-all"
          >
            <CalendarCheck className="w-5 h-5 text-indigo-600 mb-1.5" />
            <h4 className="text-xs font-bold text-slate-900">Dual Attendance Monitor</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Review faculty punch logs and class registers</p>
          </button>

          <button
            onClick={() => setActiveModule('certificate')}
            className="p-3 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-left transition-all"
          >
            <FileCheck2 className="w-5 h-5 text-emerald-600 mb-1.5" />
            <h4 className="text-xs font-bold text-slate-900">Official Certificates Engine</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Approve Character, Bonafide & Transfer certs</p>
          </button>

          <button
            onClick={() => setActiveModule('reports')}
            className="p-3 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-left transition-all"
          >
            <BarChart3 className="w-5 h-5 text-blue-600 mb-1.5" />
            <h4 className="text-xs font-bold text-slate-900">Executive Analytics</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Classroom pass distribution and trend charts</p>
          </button>
        </div>
      </div>

      {/* Principal Exam Session Oversight */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">Academic Sessions & Grade Approval Queue</h3>
          <button onClick={() => setActiveModule('exams')} className="text-xs text-indigo-600 font-bold hover:underline">
            Manage All Exams
          </button>
        </div>

        <div className="space-y-2">
          {exams.map(ex => (
            <div key={ex.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900">{ex.title}</span>
                <span className="text-slate-500 ml-2">({ex.academicYear} - {ex.term})</span>
                <p className="text-[11px] text-slate-400 mt-0.5">Classes: {ex.classesInvolved.join(', ')}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                  {ex.status}
                </span>
                <button
                  onClick={() => setActiveModule('exams')}
                  className="px-2.5 py-1 bg-white border border-slate-300 hover:bg-slate-100 rounded text-[11px] font-semibold text-slate-700"
                >
                  Review Marks
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * ACCOUNTANT PORTAL VIEW (/portal/accounts)
 * Strictly restricted to Fees, Salaries, Chart of Accounts, Income/Expenses, Fee Receipts
 */
export const AccountantPortalView: React.FC = () => {
  const { invoices, receipts, salaries, transactions, setActiveModule, collectFee } = useSchool();

  const totalFeeCollected = receipts.reduce((sum, r) => sum + r.amountPaid, 0);
  const pendingInvoices = invoices.filter(i => i.status === 'UNPAID' || i.status === 'OVERDUE');
  const totalOutstanding = pendingInvoices.reduce((sum, i) => sum + i.dueAmount, 0);
  const pendingSalaries = salaries.filter(s => s.status === 'PENDING').length;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 p-6 text-white border border-emerald-800/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
            <DollarSign className="w-4 h-4" />
            <span>Finance & Bursar Desk · Restricted Financial Zone</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Institutional Accounts & Fee POS
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Strictly isolated to fee cashier collection, employee payroll disbursement, multi-ledger income/expenses, and fee receipts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveModule('fee')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-2 cursor-pointer"
          >
            <Receipt className="w-4 h-4" />
            <span>Fee POS Cashier</span>
          </button>
          <button
            onClick={() => setActiveModule('salary')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl text-xs font-bold border border-slate-700 transition-all flex items-center space-x-2 cursor-pointer"
          >
            <CreditCard className="w-4 h-4" />
            <span>Payroll Desk</span>
          </button>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Fee Receipts Collected</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">${totalFeeCollected.toLocaleString()}</p>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">{receipts.length} successful receipts</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Outstanding Dues</span>
          <p className="text-2xl font-black text-rose-600 mt-1">${totalOutstanding.toLocaleString()}</p>
          <span className="text-[11px] text-rose-600 font-bold mt-1 inline-block">{pendingInvoices.length} invoices pending</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Salaries Pending</span>
          <p className="text-2xl font-black text-amber-600 mt-1">{pendingSalaries}</p>
          <span className="text-[11px] text-amber-700 font-semibold mt-1 inline-block">Ready for disbursement</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Ledger Transactions</span>
          <p className="text-2xl font-black text-indigo-600 mt-1">{transactions.length}</p>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">Balanced journal entries</span>
        </div>
      </div>

      {/* Financial Action Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => setActiveModule('fee')}
          className="bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md cursor-pointer transition-all space-y-2"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Receipt className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Fee POS Cashier Counter</h3>
          <p className="text-xs text-slate-500">Collect tuition, fine waivers, multi-payment methods, instant print receipts.</p>
          <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1 pt-1">
            <span>Launch Fee Terminal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div
          onClick={() => setActiveModule('salary')}
          className="bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md cursor-pointer transition-all space-y-2"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <CreditCard className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Salary & Payroll Module</h3>
          <p className="text-xs text-slate-500">Generate monthly salary slips, calculate allowances/deductions, disburse funds.</p>
          <span className="text-xs font-bold text-blue-600 flex items-center space-x-1 pt-1">
            <span>Process Payroll</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div
          onClick={() => setActiveModule('account')}
          className="bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md cursor-pointer transition-all space-y-2"
        >
          <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Chart of Accounts & Ledgers</h3>
          <p className="text-xs text-slate-500">Record journal vouchers, income streams, operational expenses, and statements.</p>
          <span className="text-xs font-bold text-purple-600 flex items-center space-x-1 pt-1">
            <span>Open Financial Ledgers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * TEACHER PORTAL VIEW (/portal/teacher)
 * Restricted to assigned classes, daily attendance marker, homework, question papers, mark entry
 */
export const TeacherPortalView: React.FC = () => {
  const { classes, homework, timetable, setActiveModule, userSession } = useSchool();

  const assignedClasses = classes.slice(0, 3);
  const myTimetable = timetable.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-6 text-white border border-blue-800/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-300 text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Classroom Faculty Desk · Academic Instruction</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Teacher Instruction & Gradebook Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Welcome, {userSession?.displayName || 'Faculty Member'}. Mark class attendance, publish homework assignments, construct question blueprints, and enter test marks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveModule('attendance')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-2 cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Mark Attendance</span>
          </button>
          <button
            onClick={() => setActiveModule('homework')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-2 cursor-pointer"
          >
            <span>Assign Homework</span>
          </button>
        </div>
      </div>

      {/* Teacher Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveModule('attendance')}
          className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-400 text-left transition-all shadow-xs"
        >
          <CalendarCheck className="w-5 h-5 text-blue-600 mb-2" />
          <h4 className="text-xs font-bold text-slate-900">Student Attendance</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">Record Present / Absent / Late for today's periods</p>
        </button>

        <button
          onClick={() => setActiveModule('homework')}
          className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-400 text-left transition-all shadow-xs"
        >
          <BookOpen className="w-5 h-5 text-indigo-600 mb-2" />
          <h4 className="text-xs font-bold text-slate-900">Homework Board</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">Post new assignments and check submissions</p>
        </button>

        <button
          onClick={() => setActiveModule('question-paper')}
          className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-400 text-left transition-all shadow-xs"
        >
          <FileQuestion className="w-5 h-5 text-purple-600 mb-2" />
          <h4 className="text-xs font-bold text-slate-900">Question Paper Bank</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">Assemble exam blueprints & print questions</p>
        </button>

        <button
          onClick={() => setActiveModule('class-tests')}
          className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-400 text-left transition-all shadow-xs"
        >
          <FileSpreadsheet className="w-5 h-5 text-emerald-600 mb-2" />
          <h4 className="text-xs font-bold text-slate-900">Weekly Test Marks</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">Enter weekly test scores and generate remedial list</p>
        </button>
      </div>

      {/* Teacher Today's Schedule */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">My Teaching Schedule Today</h3>
          <button onClick={() => setActiveModule('timetable')} className="text-xs text-blue-600 font-bold hover:underline">
            View Complete Weekly Matrix
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {myTimetable.map((slot, idx) => (
            <div key={slot.id || idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
              <div className="flex justify-between font-mono text-[10px] text-slate-400">
                <span>Period #{slot.period}</span>
                <span>{slot.startTime} - {slot.endTime}</span>
              </div>
              <p className="font-bold text-slate-900">{slot.subjectName}</p>
              <p className="text-slate-600 text-[11px]">{slot.className} - Section {slot.section}</p>
              <span className="inline-block px-1.5 py-0.5 rounded text-[10px] bg-blue-100 text-blue-800 font-mono">
                Room {slot.roomNo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * PARENT PORTAL VIEW (/portal/parent)
 * Read-only parental dashboard: Ward academic summary, fee checkout, attendance alerts
 */
export const ParentPortalView: React.FC = () => {
  const { students, invoices, collectFee, notices } = useSchool();
  const [paySuccess, setPaySuccess] = useState<string | null>(null);

  // Default ward: Alexander Wright (Grade 10-A)
  const ward = students[0];
  const wardInvoices = invoices.filter(i => i.studentId === ward.id);
  const pendingDue = wardInvoices.reduce((sum, i) => sum + i.dueAmount, 0);

  const handlePayFeeNow = () => {
    const target = wardInvoices.find(i => i.dueAmount > 0);
    if (!target) return;

    collectFee(target.id, target.dueAmount, 'UPI', `PARENT-PORTAL-${Date.now()}`);
    setPaySuccess(`Payment of $${target.dueAmount} settled successfully via Online Gateway.`);
    setTimeout(() => setPaySuccess(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 p-6 text-white border border-amber-800/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Parent & Guardian Engagement Portal</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Ward Academic & Fee Status
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Monitoring profile for enrolled student <strong>{ward.firstName} {ward.lastName}</strong> ({ward.className} · Roll #{ward.rollNo}).
          </p>
        </div>

        {pendingDue > 0 ? (
          <button
            onClick={handlePayFeeNow}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center space-x-2 cursor-pointer shrink-0"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay Due Dues (${pendingDue})</span>
          </button>
        ) : (
          <div className="px-3.5 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-bold flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>All Fees Paid in Full</span>
          </div>
        )}
      </div>

      {paySuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{paySuccess}</span>
        </div>
      )}

      {/* Ward Profile Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center space-x-3">
            <img
              src={ward.photoUrl}
              alt={ward.firstName}
              className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs"
            />
            <div>
              <h3 className="font-bold text-sm text-slate-900">{ward.firstName} {ward.lastName}</h3>
              <p className="text-xs text-slate-500">{ward.className} · Section {ward.section}</p>
              <span className="font-mono text-[10px] text-slate-400">{ward.admissionNo}</span>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 text-xs space-y-1 text-slate-600">
            <div className="flex justify-between">
              <span>Attendance Rate:</span>
              <span className="font-bold text-emerald-600">96.8% (30/31 days)</span>
            </div>
            <div className="flex justify-between">
              <span>Discipline Points:</span>
              <span className="font-bold text-indigo-600">+45 Merits</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Fee Billing Summary</h3>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Total Assessed:</span>
              <span className="font-bold text-slate-900">${ward.totalFeeAssessed}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Total Paid:</span>
              <span className="font-bold text-emerald-600">${ward.totalFeePaid}</span>
            </div>
            <div className="flex justify-between text-slate-600 pt-1 border-t border-slate-100">
              <span>Outstanding Due:</span>
              <span className={`font-bold ${pendingDue > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
                ${pendingDue}
              </span>
            </div>
          </div>
          {pendingDue > 0 && (
            <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg">
              Admit Card download is gated until current month dues are settled.
            </p>
          )}
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Campus Communications</h3>
          <div className="space-y-2 text-xs">
            {notices.slice(0, 2).map(n => (
              <div key={n.id} className="p-2 bg-slate-50 rounded-lg">
                <span className="font-bold text-indigo-700 block truncate">{n.title}</span>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{n.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
