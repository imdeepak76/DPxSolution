import React, { useState } from 'react';
import {
  GraduationCap,
  CalendarCheck,
  BookOpen,
  Receipt,
  FileSpreadsheet,
  AlertCircle,
  Lock,
  Unlock,
  CreditCard,
  Printer,
  CheckCircle2,
  Clock,
  Sparkles,
  BookMarked,
  ShieldCheck,
  Calendar,
  DollarSign,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { evaluateAdmitCardGate, evaluateReportCardGate } from '../../auth/rbacMiddleware';

export const StudentDashboardView: React.FC = () => {
  const {
    students,
    invoices,
    results,
    timetable,
    homework,
    notices,
    openWindowModal,
    collectFee,
    userSession
  } = useSchool();

  // Pick current active student profile (defaults to Alexander Wright or session student)
  const activeStudent =
    students.find(s => s.id === userSession?.studentId) ||
    students.find(s => s.admissionNo === 'DPX-2024-001') ||
    students[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'admit-card' | 'report-card' | 'attendance' | 'timetable' | 'homework' | 'fees'>('overview');
  const [onlinePayProcessing, setOnlinePayProcessing] = useState(false);

  // Evaluate Gating Rules
  const admitCardGate = evaluateAdmitCardGate(activeStudent, invoices);

  // Mock clearance record for the report card gate
  const [clearanceState, setClearanceState] = useState({
    libraryDuesCleared: true,
    laboratoryDuesCleared: true,
    sportsDuesCleared: true
  });

  const reportCardGate = evaluateReportCardGate(activeStudent, {
    studentId: activeStudent.id,
    currentMonthFeePaid: admitCardGate.currentMonthFeePaid,
    currentMonthDueAmount: admitCardGate.totalOutstandingDue,
    libraryDuesCleared: clearanceState.libraryDuesCleared,
    pendingLibraryBooksCount: clearanceState.libraryDuesCleared ? 0 : 2,
    laboratoryDuesCleared: clearanceState.laboratoryDuesCleared,
    sportsDuesCleared: clearanceState.sportsDuesCleared,
    generalAccountsCleared: admitCardGate.currentMonthFeePaid,
    noDuesCertificateIssued: admitCardGate.currentMonthFeePaid && clearanceState.libraryDuesCleared
  });

  // Pay dues action to dynamically unlock admit card in real-time
  const handlePayOutstandingOnline = () => {
    const studentInvoices = invoices.filter(i => i.studentId === activeStudent.id && i.dueAmount > 0);
    if (studentInvoices.length === 0) return;

    setOnlinePayProcessing(true);
    setTimeout(() => {
      studentInvoices.forEach(inv => {
        collectFee(inv.id, inv.dueAmount, 'UPI', `WEB-GATEWAY-${Date.now()}`);
      });
      setOnlinePayProcessing(false);
    }, 1200);
  };

  const studentResult = results.find(r => r.studentId === activeStudent.id) || results[0];
  const studentInvoices = invoices.filter(i => i.studentId === activeStudent.id);

  return (
    <div className="space-y-6">
      {/* 1. Student Identity Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-6 text-white shadow-xl border border-indigo-900/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img
              src={activeStudent.photoUrl}
              alt={activeStudent.firstName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-400 shadow-lg"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-indigo-400 text-xs font-mono font-bold tracking-wider uppercase">
                  Student Portal · View-Only Session
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Enrolled Regular
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-0.5">
                {activeStudent.firstName} {activeStudent.lastName}
              </h1>
              <p className="text-xs text-slate-300 font-mono">
                Adm: {activeStudent.admissionNo} · Roll: {activeStudent.rollNo} · {activeStudent.className} ({activeStudent.section})
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Quick trigger to open WindowModal for Student ID Card */}
            <button
              onClick={() =>
                openWindowModal({
                  type: 'STUDENT_ID',
                  title: `Student ID Card: ${activeStudent.firstName} ${activeStudent.lastName}`,
                  data: activeStudent
                })
              }
              className="flex items-center space-x-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md transition-all"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Digital ID Card</span>
            </button>

            {/* Quick check for Admit Card */}
            <button
              onClick={() => setActiveTab('admit-card')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                admitCardGate.isUnlocked
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-rose-600/80 hover:bg-rose-600 text-white'
              }`}
            >
              {admitCardGate.isUnlocked ? (
                <Unlock className="w-3.5 h-3.5" />
              ) : (
                <Lock className="w-3.5 h-3.5" />
              )}
              <span>Admit Card {admitCardGate.isUnlocked ? 'Ready' : 'Locked'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {[
          { key: 'overview', label: 'Dashboard Overview', icon: GraduationCap },
          { key: 'admit-card', label: 'Exam Admit Card (Gated)', icon: FileSpreadsheet },
          { key: 'report-card', label: 'Final Report Card (Gated)', icon: BookOpen },
          { key: 'attendance', label: 'Attendance Record', icon: CalendarCheck },
          { key: 'timetable', label: 'Class Time Table', icon: Clock },
          { key: 'homework', label: 'Homework Board', icon: BookMarked },
          { key: 'fees', label: 'Fee Invoices & Statements', icon: Receipt }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: DASHBOARD OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Gating Notification Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Admit Card Gate Status Banner */}
            <div
              className={`p-5 rounded-2xl border transition-all ${
                admitCardGate.isUnlocked
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white ${
                      admitCardGate.isUnlocked ? 'bg-emerald-600' : 'bg-rose-600'
                    }`}
                  >
                    {admitCardGate.isUnlocked ? (
                      <Unlock className="w-4 h-4" />
                    ) : (
                      <Lock className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm">
                      Exam Admit Card Gate: {admitCardGate.isUnlocked ? 'Unlocked & Verified' : 'Locked (Fee Pending)'}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">{admitCardGate.reason}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-xs font-mono font-bold">
                  {admitCardGate.totalOutstandingDue > 0
                    ? `Dues: $${admitCardGate.totalOutstandingDue}`
                    : 'Balance: $0.00'}
                </span>

                {admitCardGate.isUnlocked ? (
                  <button
                    onClick={() =>
                      openWindowModal({
                        type: 'ADMIT_CARD',
                        title: `Term 1 Exam Admit Card: ${activeStudent.firstName} ${activeStudent.lastName}`,
                        data: activeStudent
                      })
                    }
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>View / Print Hall Ticket</span>
                  </button>
                ) : (
                  <button
                    onClick={handlePayOutstandingOnline}
                    disabled={onlinePayProcessing}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>{onlinePayProcessing ? 'Processing Payment...' : 'Clear Dues & Unlock'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Report Card & Certificate Clearance Banner */}
            <div
              className={`p-5 rounded-2xl border transition-all ${
                reportCardGate.isUnlocked
                  ? 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
                  : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white ${
                      reportCardGate.isUnlocked ? 'bg-indigo-600' : 'bg-amber-600'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm">
                      Institutional No-Dues Clearance Gate: {reportCardGate.isUnlocked ? 'Cleared' : 'Pending Verification'}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">{reportCardGate.reason}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {reportCardGate.isUnlocked ? 'Library, Lab & Fee Cleared' : 'Action Required'}
                </span>

                {reportCardGate.isUnlocked ? (
                  <button
                    onClick={() =>
                      openWindowModal({
                        type: 'RESULT_CARD',
                        title: `Official Report Card: ${studentResult.studentName}`,
                        data: studentResult
                      })
                    }
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>View Official Report Card</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab('report-card')}
                    className="text-xs text-amber-800 font-bold hover:underline"
                  >
                    Review Clearance Checklist &rarr;
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase">Academic Attendance</span>
              <p className="text-2xl font-extrabold text-emerald-600 mt-1">96.5%</p>
              <span className="text-[11px] text-slate-400">Regular & Punctual</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase">Term 1 GPA Average</span>
              <p className="text-2xl font-extrabold text-indigo-700 mt-1">{studentResult.gpa.toFixed(2)} / 4.0</p>
              <span className="text-[11px] text-purple-600 font-semibold">{studentResult.overallGrade}</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase">Pending Homework</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">1 Assignment</p>
              <span className="text-[11px] text-slate-400">Due Oct 24</span>
            </div>
          </div>

          {/* Recent Campus Circulars */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">School Circulars & Notifications for Students</h3>
            <div className="divide-y divide-slate-100">
              {notices.map(notice => (
                <div key={notice.id} className="py-2.5 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{notice.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{notice.content}</p>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                      Published on {notice.publishDate} by {notice.author}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EXAM ADMIT CARD GATE INSPECTOR */}
      {activeTab === 'admit-card' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Examination Admit Card / Hall Ticket Portal
              </h3>
              <p className="text-xs text-slate-500">
                Rule: Hall ticket access is strictly governed by institutional fee settlement for the active billing cycle.
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 ${
                admitCardGate.isUnlocked
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {admitCardGate.isUnlocked ? <Unlock className="w-3.5 h-3.5 mr-1" /> : <Lock className="w-3.5 h-3.5 mr-1" />}
              <span>{admitCardGate.isUnlocked ? 'Unlocked & Authorized' : 'Locked: Dues Outstanding'}</span>
            </span>
          </div>

          {/* Conditional Gate Alert Box */}
          {!admitCardGate.isUnlocked ? (
            <div className="p-5 rounded-xl bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-200 space-y-3">
              <div className="flex items-center space-x-2 text-rose-800 font-bold text-sm">
                <AlertCircle className="w-5 h-5 text-rose-600" />
                <span>Admit Card Locked: Please clear this month's fee dues.</span>
              </div>
              <p className="text-xs text-rose-700 leading-relaxed">
                As per institutional examination regulations, student <strong>{activeStudent.firstName} {activeStudent.lastName}</strong> has an outstanding billing balance of <strong>${admitCardGate.totalOutstandingDue}</strong> for the current cycle. Examination hall tickets cannot be issued or viewed until tuition dues are settled.
              </p>
              <div className="pt-2 flex items-center space-x-3">
                <button
                  onClick={handlePayOutstandingOnline}
                  disabled={onlinePayProcessing}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-md transition-all flex items-center space-x-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{onlinePayProcessing ? 'Processing Instant Payment...' : `Pay $${admitCardGate.totalOutstandingDue} Online Now & Unlock`}</span>
                </button>
                <span className="text-[11px] text-slate-500">Supports UPI, Net Banking & Credit Card</span>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Admit Card Clearance Approved & Hall Ticket Ready</span>
              </div>
              <p className="text-xs text-emerald-700">
                All monthly tuition dues and exam registration assessments are settled. You may now launch the interactive WindowModal preview and print the official hall ticket.
              </p>
              <button
                onClick={() =>
                  openWindowModal({
                    type: 'ADMIT_CARD',
                    title: `Official Examination Admit Card: ${activeStudent.firstName} ${activeStudent.lastName}`,
                    data: activeStudent
                  })
                }
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-md transition-all flex items-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>Open Admit Card in WindowModal Preview</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: REPORT CARD & NO-DUES CLEARANCE GATE */}
      {activeTab === 'report-card' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Final Report Card & Official Certificate Clearance Gate
              </h3>
              <p className="text-xs text-slate-500">
                Rule: Official Report Cards and Certificates can be previewed or printed only with full multi-department clearance (Accounts, Library, Lab).
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 ${
                reportCardGate.isUnlocked
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {reportCardGate.isUnlocked ? <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> : <AlertCircle className="w-3.5 h-3.5 mr-1" />}
              <span>{reportCardGate.isUnlocked ? 'All Clearances Verified' : 'Clearance Pending'}</span>
            </span>
          </div>

          {/* Department Clearance Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-800">1. Accounts & Tuition</span>
                {admitCardGate.currentMonthFeePaid ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                )}
              </div>
              <p className="text-[11px] text-slate-500">
                {admitCardGate.currentMonthFeePaid ? 'Cleared: No pending balance' : 'Pending: Monthly dues unsettled'}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-800">2. Library Clearance</span>
                <button
                  onClick={() => setClearanceState(prev => ({ ...prev, libraryDuesCleared: !prev.libraryDuesCleared }))}
                  className="cursor-pointer"
                  title="Toggle for simulation"
                >
                  {clearanceState.libraryDuesCleared ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                {clearanceState.libraryDuesCleared ? 'Cleared: All borrowed items returned' : '2 Books pending library return'}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-800">3. Science & STEM Lab</span>
                <button
                  onClick={() => setClearanceState(prev => ({ ...prev, laboratoryDuesCleared: !prev.laboratoryDuesCleared }))}
                  className="cursor-pointer"
                  title="Toggle for simulation"
                >
                  {clearanceState.laboratoryDuesCleared ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                {clearanceState.laboratoryDuesCleared ? 'Cleared: Apparatus & breakage check passed' : 'Breakage check pending'}
              </p>
            </div>
          </div>

          {/* Action Trigger */}
          {reportCardGate.isUnlocked ? (
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() =>
                  openWindowModal({
                    type: 'RESULT_CARD',
                    title: `Official Report Card: ${studentResult.studentName}`,
                    data: studentResult
                  })
                }
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-md transition-all flex items-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>Open Report Card in WindowModal</span>
              </button>
              <button
                onClick={() =>
                  openWindowModal({
                    type: 'CERTIFICATE',
                    title: `Bonafide Student Certificate: ${activeStudent.firstName} ${activeStudent.lastName}`,
                    data: {
                      type: 'BONAFIDE',
                      certificateNo: `DPX-BONA-${activeStudent.admissionNo}`,
                      recipientName: `${activeStudent.firstName} ${activeStudent.lastName}`,
                      className: activeStudent.className,
                      issueDate: new Date().toISOString().split('T')[0],
                      reason: 'Passport and Educational Board Verification',
                      academicConduct: 'Bonafide enrolled student in good standing with complete institutional clearance.'
                    }
                  })
                }
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-md transition-all flex items-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>Generate Official Bonafide Certificate</span>
              </button>
            </div>
          ) : (
            <div className="p-4 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs font-medium">
              Report Card and Official Certificates remain locked until all three department clearances above display green checkmarks.
            </div>
          )}
        </div>
      )}

      {/* TAB 4: VIEW-ONLY ATTENDANCE */}
      {activeTab === 'attendance' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-sm">Attendance Logs (View-Only)</h3>
            <span className="text-xs font-mono font-bold text-emerald-600">96.5% Cumulative Attendance</span>
          </div>
          <p className="text-xs text-slate-600">
            Attendance records are synchronized in real-time with morning teacher roll calls and automated biometric gates.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <span className="text-[10px] text-slate-500 uppercase block font-bold">Present Days</span>
              <span className="text-lg font-bold text-emerald-700 font-mono">54 Days</span>
            </div>
            <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
              <span className="text-[10px] text-slate-500 uppercase block font-bold">Unexcused Absences</span>
              <span className="text-lg font-bold text-rose-700 font-mono">2 Days</span>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
              <span className="text-[10px] text-slate-500 uppercase block font-bold">Late Arrivals</span>
              <span className="text-lg font-bold text-amber-700 font-mono">1 Day</span>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
              <span className="text-[10px] text-slate-500 uppercase block font-bold">Approved Leaves</span>
              <span className="text-lg font-bold text-blue-700 font-mono">1 Day</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: VIEW-ONLY TIME TABLE */}
      {activeTab === 'timetable' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm">Class Schedule Matrix (View-Only)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {timetable
              .filter(t => t.className === activeStudent.className)
              .map(slot => (
                <div key={slot.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-indigo-700 font-bold">
                    <span>{slot.day} · Period {slot.period}</span>
                    <span>{slot.startTime}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs">{slot.subjectName}</h4>
                  <p className="text-[11px] text-slate-500">Teacher: {slot.teacherName} · {slot.roomNo}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 6: VIEW-ONLY HOMEWORK */}
      {activeTab === 'homework' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm">Homework Tasks & Assignments</h3>
          <div className="space-y-3">
            {homework.map(hw => (
              <div key={hw.id} className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">
                    {hw.subject}
                  </span>
                  <span className="text-xs text-rose-600 font-mono font-bold">Due: {hw.dueDate}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs">{hw.title}</h4>
                <p className="text-xs text-slate-600">{hw.description}</p>
                <div className="text-[11px] text-slate-400">Assigned by: {hw.assignedBy}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: FEE INVOICES & STATEMENTS */}
      {activeTab === 'fees' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-sm">Fee Invoices & Payment Ledger</h3>
            <span className="text-xs font-mono font-bold text-slate-600">
              Lifetime Paid: ${activeStudent.totalFeePaid} / ${activeStudent.totalFeeAssessed}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Invoice #</th>
                  <th className="p-3">Billing Month</th>
                  <th className="p-3">Total Amount</th>
                  <th className="p-3">Paid Amount</th>
                  <th className="p-3">Due Balance</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">View Slip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {studentInvoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-indigo-700">{inv.invoiceNo}</td>
                    <td className="p-3 font-semibold text-slate-800">{inv.month}</td>
                    <td className="p-3 font-mono font-bold">${inv.amount}</td>
                    <td className="p-3 font-mono font-bold text-emerald-600">${inv.paidAmount}</td>
                    <td className="p-3 font-mono font-bold text-rose-600">${inv.dueAmount}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          inv.status === 'PAID'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() =>
                          openWindowModal({
                            type: 'FEE_RECEIPT',
                            title: `Fee Slip #${inv.invoiceNo}`,
                            data: {
                              receiptNo: `REC-${inv.invoiceNo}`,
                              studentName: inv.studentName,
                              className: inv.className,
                              amountPaid: inv.paidAmount > 0 ? inv.paidAmount : inv.amount,
                              paymentMethod: 'ONLINE_TRANSFER',
                              transactionRef: `ONLINE-TXN-${inv.invoiceNo}`,
                              paymentDate: inv.issueDate,
                              receivedBy: 'Online Automated Gateway'
                            }
                          })
                        }
                        className="px-2.5 py-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded"
                      >
                        Slip
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
