import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Settings,
  School,
  BookOpen,
  GraduationCap,
  Users,
  DollarSign,
  Receipt,
  CreditCard,
  CalendarCheck,
  Clock,
  BookMarked,
  Award,
  MessageSquare,
  Mail,
  Smartphone,
  Video,
  FileQuestion,
  FileSpreadsheet,
  CheckSquare,
  BarChart3,
  FileCheck2,
  ChevronDown,
  ChevronRight,
  Search,
  X,
  ExternalLink,
  ShieldCheck,
  Database
} from 'lucide-react';
import { useSchool, ModuleKey } from '../../context/SchoolContext';
import { checkModuleAccess } from '../../auth/rbacMiddleware';

interface SubmenuItem {
  id: string;
  label: string;
  actionTag?: string;
}

interface NavModuleDef {
  key: ModuleKey;
  number: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
  submenus: SubmenuItem[];
}

export const NAV_MODULES: NavModuleDef[] = [
  {
    key: 'dashboard',
    number: 1,
    label: 'Dashboard',
    icon: LayoutDashboard,
    submenus: [
      { id: 'overview', label: 'Executive Overview & Stats' },
      { id: 'attendance-analytics', label: 'Attendance Gauges' },
      { id: 'financial-insights', label: 'Income vs Expense' },
      { id: 'events-feed', label: 'Calendar & Upcoming Events' }
    ]
  },
  {
    key: 'general-settings',
    number: 2,
    label: 'General Settings',
    icon: Settings,
    submenus: [
      { id: 'institute-profile', label: 'Institute Profile & Campus' },
      { id: 'fee-particulars', label: 'Fee Particulars & Rules' },
      { id: 'grading-scales', label: 'Grading Scales (GPA & %)' },
      { id: 'theme-language', label: 'Theme & RTL / LTR Toggle' },
      { id: 'system-architecture', label: 'System Architecture & Schema' }
    ]
  },
  {
    key: 'classes',
    number: 3,
    label: 'Classes & Sections',
    icon: School,
    submenus: [
      { id: 'class-list', label: 'Class & Section Directory' },
      { id: 'add-class', label: 'Add New Class & Capacity' },
      { id: 'section-allocation', label: 'Section Allocation & Teachers' }
    ]
  },
  {
    key: 'subject',
    number: 4,
    label: 'Subjects',
    icon: BookOpen,
    submenus: [
      { id: 'subject-catalog', label: 'Curriculum & Subject Catalog' },
      { id: 'assign-teachers', label: 'Teacher Subject Allocation' },
      { id: 'theory-practical', label: 'Theory vs Practical Split' }
    ]
  },
  {
    key: 'students',
    number: 5,
    label: 'Students ERP',
    icon: GraduationCap,
    badge: 'Directory',
    badgeColor: 'bg-blue-100 text-blue-700',
    submenus: [
      { id: 'student-directory', label: 'Student Directory & Search' },
      { id: 'add-student', label: 'Add Student (Multi-Step Form)' },
      { id: 'id-cards', label: 'Printable Student ID Cards' },
      { id: 'admission-letter', label: 'Admission Letter Generator' },
      { id: 'family-siblings', label: 'Sibling & Family Linkage' },
      { id: 'bulk-promotion', label: 'Bulk Student Promotion' }
    ]
  },
  {
    key: 'employees',
    number: 6,
    label: 'Employees & Staff',
    icon: Users,
    submenus: [
      { id: 'staff-directory', label: 'Faculty & Staff Directory' },
      { id: 'add-employee', label: 'Add Employee Profile' },
      { id: 'staff-id-cards', label: 'Staff ID Card Generator' },
      { id: 'appointment-letters', label: 'Job Offer & Appointment Letters' },
      { id: 'rbac-permissions', label: 'Roles & Granular Permissions' }
    ]
  },
  {
    key: 'account',
    number: 7,
    label: 'Financial Accounts',
    icon: DollarSign,
    submenus: [
      { id: 'chart-of-accounts', label: 'Multi-Ledger Chart of Accounts' },
      { id: 'add-income', label: 'Record Income Entry' },
      { id: 'add-expense', label: 'Record Expense Entry' },
      { id: 'account-statement', label: 'Real-time Statement Generator' }
    ]
  },
  {
    key: 'fee',
    number: 8,
    label: 'Fee Management & POS',
    icon: Receipt,
    badge: 'POS Live',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    submenus: [
      { id: 'fee-pos', label: 'Fee Collection POS Cashier' },
      { id: 'fee-invoices', label: 'Fee Invoice Generation (Single/Bulk)' },
      { id: 'fee-defaulters', label: 'Fee Defaulters & Auto Fine' },
      { id: 'payment-receipts', label: 'Payment Receipts & Print Slips' },
      { id: 'fee-reports', label: 'Fee Collection Reports & Audit' }
    ]
  },
  {
    key: 'salary',
    number: 9,
    label: 'Salary & Payroll',
    icon: CreditCard,
    submenus: [
      { id: 'process-salary', label: 'Process & Disburse Salaries' },
      { id: 'salary-slips', label: 'Salary Slips Generator & Print' },
      { id: 'monthly-sheet', label: 'Monthly Payroll Ledger' },
      { id: 'tax-deductions', label: 'Tax & Allowance Analytics' }
    ]
  },
  {
    key: 'attendance',
    number: 10,
    label: 'Dual Attendance',
    icon: CalendarCheck,
    badge: 'Today',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    submenus: [
      { id: 'student-daily', label: 'Daily Student Attendance Marker' },
      { id: 'employee-daily', label: 'Employee Attendance & Punch' },
      { id: 'class-monthly', label: 'Class Monthly Summary Matrix' },
      { id: 'attendance-analytics', label: 'Absenteeism Trends' }
    ]
  },
  {
    key: 'timetable',
    number: 11,
    label: 'Class Time Table',
    icon: Clock,
    submenus: [
      { id: 'timetable-matrix', label: 'Weekly Schedule Matrix' },
      { id: 'room-allocator', label: 'Room & Lab Allocator' },
      { id: 'teacher-conflicts', label: 'Faculty Conflict Detector' }
    ]
  },
  {
    key: 'homework',
    number: 12,
    label: 'Digital Homework',
    icon: BookMarked,
    submenus: [
      { id: 'homework-board', label: 'Homework Assignment Board' },
      { id: 'create-homework', label: 'Create New Assignment' },
      { id: 'submission-tracker', label: 'Submission & Review Tracker' }
    ]
  },
  {
    key: 'behaviour',
    number: 13,
    label: 'Behaviour & Skills',
    icon: Award,
    submenus: [
      { id: 'conduct-logs', label: 'Conduct & Disciplinary Logs' },
      { id: 'merits-demerits', label: 'Merits & Demerits Points' },
      { id: 'skills-assessment', label: 'Skills & Aptitude Rating' }
    ]
  },
  {
    key: 'whatsapp',
    number: 14,
    label: 'WhatsApp Automation',
    icon: MessageSquare,
    badge: 'API Ready',
    badgeColor: 'bg-green-100 text-green-700',
    submenus: [
      { id: 'automated-alerts', label: 'Automated Event Hooks' },
      { id: 'absent-trigger', label: 'Auto-Absenteeism WhatsApp Dispatch' },
      { id: 'fee-reminder-wa', label: 'Overdue Fee Alerts' },
      { id: 'message-templates', label: 'Approved Meta Templates' }
    ]
  },
  {
    key: 'messaging',
    number: 15,
    label: 'Internal Messaging',
    icon: Mail,
    submenus: [
      { id: 'notice-board', label: 'Campus Notice Board' },
      { id: 'compose-notice', label: 'Publish Announcement' },
      { id: 'staff-parent-chat', label: 'Parent-Teacher Communication' }
    ]
  },
  {
    key: 'sms',
    number: 16,
    label: 'SMS Gateway Services',
    icon: Smartphone,
    submenus: [
      { id: 'sms-dispatcher', label: 'Bulk SMS Dispatcher' },
      { id: 'template-manager', label: 'Dynamic Variable Templates' },
      { id: 'gateway-settings', label: 'Twilio / SMPP Gateway Config' }
    ]
  },
  {
    key: 'live-class',
    number: 17,
    label: 'Live Class Scheduler',
    icon: Video,
    submenus: [
      { id: 'live-sessions', label: 'Scheduled Virtual Classrooms' },
      { id: 'schedule-zoom', label: 'Zoom & Google Meet Integration' },
      { id: 'attendance-logs', label: 'Virtual Attendance Tracker' }
    ]
  },
  {
    key: 'question-paper',
    number: 18,
    label: 'Question Paper Bank',
    icon: FileQuestion,
    submenus: [
      { id: 'question-bank', label: 'Categorized Question Bank' },
      { id: 'blueprint-creator', label: 'Paper Blueprint & Weightage' },
      { id: 'paper-generator', label: 'Instant Printable Paper Maker' }
    ]
  },
  {
    key: 'exams',
    number: 19,
    label: 'Examinations & Marks',
    icon: FileSpreadsheet,
    badge: 'Term 1',
    badgeColor: 'bg-purple-100 text-purple-700',
    submenus: [
      { id: 'exam-sessions', label: 'Active Exam Sessions' },
      { id: 'date-sheet', label: 'Date Sheet & Hall Tickets' },
      { id: 'gradebook-entry', label: 'Gradebook & Marks Entry' },
      { id: 'result-cards', label: 'Official Student Result Cards' },
      { id: 'consolidated-sheet', label: 'Consolidated Broad Sheet' },
      { id: 'blank-award-list', label: 'Examiner Blank Award Sheets' }
    ]
  },
  {
    key: 'class-tests',
    number: 20,
    label: 'Weekly Class Tests',
    icon: CheckSquare,
    submenus: [
      { id: 'test-records', label: 'Weekly Test Mark Sheets' },
      { id: 'quick-analyzer', label: 'Class Test Performance Analyzer' },
      { id: 'remedial-list', label: 'Remedial Action Recommendations' }
    ]
  },
  {
    key: 'reports',
    number: 21,
    label: 'Reports & Analytics',
    icon: BarChart3,
    submenus: [
      { id: 'student-reports', label: 'Comprehensive Student Cards' },
      { id: 'contact-directory', label: 'Parent & Guardian Contact Lists' },
      { id: 'monthly-attendance-report', label: 'Monthly Attendance Summaries' },
      { id: 'fee-collection-report', label: 'Revenue & Fee Breakdown' },
      { id: 'custom-query-builder', label: 'Custom SQL/Data Report Builder' }
    ]
  },
  {
    key: 'certificate',
    number: 22,
    label: 'Certificate Engine',
    icon: FileCheck2,
    badge: 'Dynamic',
    badgeColor: 'bg-amber-100 text-amber-800',
    submenus: [
      { id: 'character-cert', label: 'Character Certificate' },
      { id: 'bonafide-cert', label: 'Bonafide Certificate' },
      { id: 'transfer-cert', label: 'School Transfer Certificate (TC)' },
      { id: 'experience-cert', label: 'Employee Experience Certificate' },
      { id: 'certificate-archive', label: 'Issued Certificate Repository' }
    ]
  }
];

export const RightDrawer: React.FC = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    activeModule,
    setActiveModule,
    activeSubmenu,
    setActiveSubmenu,
    currentRole,
    setIsArchitectureModalOpen
  } = useSchool();

  const [search, setSearch] = useState('');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [activeModule]: true
  });

  const toggleExpand = (modKey: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [modKey]: !prev[modKey]
    }));
  };

  const handleModuleSelect = (modKey: ModuleKey, subId?: string) => {
    setActiveModule(modKey);
    if (subId) {
      setActiveSubmenu(subId);
    } else {
      const target = NAV_MODULES.find(m => m.key === modKey);
      setActiveSubmenu(target?.submenus[0]?.id || null);
    }
  };

  const filteredModules = useMemo(() => {
    // Only allow modules accessible to currentRole
    const allowed = NAV_MODULES.filter(m => {
      if (currentRole === 'SUPER_ADMIN' || currentRole === 'PRINCIPAL') return true;
      const chk = checkModuleAccess(currentRole, m.key);
      return chk.allowed;
    });

    if (!search.trim()) return allowed;
    const q = search.toLowerCase();
    return allowed.filter(
      m =>
        m.label.toLowerCase().includes(q) ||
        m.number.toString().includes(q) ||
        m.submenus.some(s => s.label.toLowerCase().includes(q))
    );
  }, [search, currentRole]);

  return (
    <>
      {/* Backdrop overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300 drawer-overlay"
          onClick={() => setIsDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-out drawer on the right */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-[360px] sm:max-w-[400px] bg-white border-l border-slate-200 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Right-side Navigation Drawer"
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-200 bg-linear-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center font-bold text-indigo-300">
              DPx
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-bold text-sm tracking-wide">DPxSOLUTION</h2>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-600/60 text-indigo-200 uppercase">
                  v4.8
                </span>
              </div>
              <p className="text-[11px] text-slate-300">22 Core Modules ERP Matrix</p>
            </div>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Close Drawer (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar inside Drawer */}
        <div className="p-3 border-b border-slate-100 bg-slate-50">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search all 22 modules or actions..."
              className="w-full pl-9 pr-7 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-800 placeholder-slate-400"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Module List (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-1">
          {filteredModules.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400">
              No module matched "{search}".
            </div>
          ) : (
            filteredModules.map(mod => {
              const Icon = mod.icon;
              const isActive = activeModule === mod.key;
              const isExpanded = expandedModules[mod.key] || Boolean(search);

              return (
                <div key={mod.key} className="rounded-lg transition-colors">
                  {/* Module Header Button */}
                  <div
                    className={`group flex items-center justify-between w-full px-2.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                    onClick={() => {
                      handleModuleSelect(mod.key);
                      toggleExpand(mod.key);
                    }}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <span className="w-5 text-[10px] font-mono text-slate-400 group-hover:text-slate-600">
                        {String(mod.number).padStart(2, '0')}.
                      </span>
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                        }`}
                      />
                      <span className="truncate">{mod.label}</span>
                    </div>

                    <div className="flex items-center space-x-1.5 shrink-0">
                      {mod.badge && (
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${
                            mod.badgeColor || 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {mod.badge}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          toggleExpand(mod.key);
                        }}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submenu Drawer Items */}
                  {isExpanded && mod.submenus.length > 0 && (
                    <div className="ml-7 pl-2.5 py-1 border-l-2 border-slate-200 space-y-0.5">
                      {mod.submenus.map(sub => {
                        const isSubActive = isActive && activeSubmenu === sub.id;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => {
                              handleModuleSelect(mod.key, sub.id);
                              // Close on small screens for convenience
                              if (window.innerWidth < 640) {
                                setIsDrawerOpen(false);
                              }
                            }}
                            className={`flex items-center justify-between w-full text-left px-2 py-1 rounded text-[11px] transition-colors ${
                              isSubActive
                                ? 'bg-indigo-100 text-indigo-900 font-medium'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                          >
                            <span className="truncate">{sub.label}</span>
                            {isSubActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 ml-1.5 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer with Quick Actions & Schema Inspector */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 space-y-2">
          <button
            onClick={() => {
              setIsArchitectureModalOpen(true);
              setIsDrawerOpen(false);
            }}
            className="w-full flex items-center justify-center space-x-2 py-2 px-3 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-colors"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Prisma Schema & Architecture</span>
          </button>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>RBAC: {currentRole}</span>
            </span>
            <span className="font-mono text-[10px] text-slate-400">PostgreSQL Ready</span>
          </div>
        </div>
      </aside>
    </>
  );
};
