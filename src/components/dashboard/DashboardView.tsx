import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  DollarSign,
  TrendingUp,
  CalendarCheck,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  AlertCircle,
  Receipt,
  UserPlus,
  FileCheck2,
  Sparkles,
  ChevronRight,
  Filter,
  BarChart2
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

export const DashboardView: React.FC = () => {
  const {
    students,
    employees,
    invoices,
    receipts,
    transactions,
    classes,
    notices,
    setActiveModule,
    openPrintModal,
    setIsDrawerOpen
  } = useSchool();

  const [chartPeriod, setChartPeriod] = useState<'6M' | '1Y'>('6M');
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  // 1. KPI Calculations
  const totalStudentsCount = students.length;
  const activeStudentsCount = students.filter(s => s.status === 'ACTIVE').length;
  const maleCount = students.filter(s => s.gender === 'MALE').length;
  const femaleCount = students.filter(s => s.gender === 'FEMALE').length;

  const totalEmployeesCount = employees.length;
  const teachingStaffCount = employees.filter(e => e.role === 'TEACHER').length;
  const nonTeachingStaffCount = employees.filter(e => e.role !== 'TEACHER').length;

  // Income & Expenses from Transactions
  const totalRevenue = transactions
    .filter(t => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalProfit = totalRevenue - totalExpense;

  // Real-time Insights
  const studentAttendanceRate = 94.6; // Current day aggregate
  const employeeAttendanceRate = 98.2; // Current day aggregate

  // Fee Collection Progress (Current Month Target vs Collected)
  const currentMonthInvoices = invoices.filter(i => i.month.includes('October 2026') || true);
  const targetFee = currentMonthInvoices.reduce((sum, i) => sum + (i.amount + i.fine - i.discount), 0);
  const collectedFee = currentMonthInvoices.reduce((sum, i) => sum + i.paidAmount, 0);
  const feeCollectionProgress = targetFee > 0 ? Math.round((collectedFee / targetFee) * 100) : 78;

  // 2. Chart Data: Monthly Income vs Expense
  const monthlyFinancials = [
    { month: 'May', income: 42000, expense: 31000 },
    { month: 'Jun', income: 45000, expense: 33500 },
    { month: 'Jul', income: 39000, expense: 32000 },
    { month: 'Aug', income: 58000, expense: 38000 },
    { month: 'Sep', income: 64000, expense: 41000 },
    { month: 'Oct', income: totalRevenue > 0 ? totalRevenue : 55700, expense: totalExpense > 0 ? totalExpense : 41450 }
  ];

  const maxFinancialVal = Math.max(
    ...monthlyFinancials.map(d => Math.max(d.income, d.expense)),
    70000
  );

  // Class-wise strength
  const topClasses = classes.slice(0, 8);
  const maxClassCapacity = Math.max(...classes.map(c => c.capacity), 90);

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner & Drawer Callout */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl border border-indigo-900/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen EdTech Cloud ERP Platform</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              DPxSOLUTION School Management Command Center
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Complete academic, operational, and financial control across 22 integrated modules.
              Explore student admissions, fee cashier POS, payroll, dual attendance, dynamic certificates, and real-time analytics.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5"
            >
              <span>Explore 22 Modules Drawer</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveModule('fee')}
              className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold backdrop-blur-xs transition-colors"
            >
              POS Cashier
            </button>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 1. KPI STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Students */}
        <div
          onClick={() => setActiveModule('students')}
          className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Students
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {totalStudentsCount.toLocaleString()}
            </span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              +8.4% YoY
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Active: {activeStudentsCount}</span>
            <span className="font-mono text-[11px]">
              👦 {maleCount} · 👧 {femaleCount}
            </span>
          </div>
        </div>

        {/* Card 2: Total Employees */}
        <div
          onClick={() => setActiveModule('employees')}
          className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Employees
            </span>
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {totalEmployeesCount}
            </span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              100% Retained
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Faculty: {teachingStaffCount}</span>
            <span>Admin Staff: {nonTeachingStaffCount}</span>
          </div>
        </div>

        {/* Card 3: Total Revenue */}
        <div
          onClick={() => setActiveModule('account')}
          className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Revenue (MTD)
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              ${totalRevenue.toLocaleString()}
            </span>
            <span className="flex items-center text-xs font-semibold text-emerald-600">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              +14.2%
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Tuition & POS collections</span>
            <span className="text-emerald-700 font-semibold">Healthy</span>
          </div>
        </div>

        {/* Card 4: Total Profit */}
        <div
          onClick={() => setActiveModule('account')}
          className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Net Surplus / Profit
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              ${totalProfit.toLocaleString()}
            </span>
            <span className="flex items-center text-xs font-semibold text-indigo-600">
              Operational +32%
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Expense: ${totalExpense.toLocaleString()}</span>
            <span className="font-medium text-slate-600">Q4 Target met</span>
          </div>
        </div>
      </div>

      {/* 2. REAL-TIME INSIGHTS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Student Attendance % */}
        <div
          onClick={() => setActiveModule('attendance')}
          className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700">Today's Student Attendance</span>
            <span className="text-xs font-bold text-emerald-600 px-2 py-0.5 rounded-full bg-emerald-50">
              Target 92%
            </span>
          </div>
          <div className="flex items-end justify-between my-2">
            <div>
              <div className="text-2xl font-extrabold text-slate-900">{studentAttendanceRate}%</div>
              <p className="text-[11px] text-slate-500 mt-0.5">38 Absentees notified via WhatsApp</p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-emerald-200 flex items-center justify-center font-bold text-xs text-emerald-700">
              95%
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mt-3">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${studentAttendanceRate}%` }}
            />
          </div>
        </div>

        {/* Employee Attendance % */}
        <div
          onClick={() => setActiveModule('attendance')}
          className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700">Faculty & Staff Attendance</span>
            <span className="text-xs font-bold text-indigo-600 px-2 py-0.5 rounded-full bg-indigo-50">
              Optimal
            </span>
          </div>
          <div className="flex items-end justify-between my-2">
            <div>
              <div className="text-2xl font-extrabold text-slate-900">{employeeAttendanceRate}%</div>
              <p className="text-[11px] text-slate-500 mt-0.5">1 On Approved Medical Leave</p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-indigo-200 flex items-center justify-center font-bold text-xs text-indigo-700">
              98%
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mt-3">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${employeeAttendanceRate}%` }}
            />
          </div>
        </div>

        {/* Monthly Fee Collection Progress Bar */}
        <div
          onClick={() => setActiveModule('fee')}
          className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700">Monthly Fee Progress (October)</span>
            <span className="text-xs font-bold text-blue-600 px-2 py-0.5 rounded-full bg-blue-50">
              {feeCollectionProgress}% Settled
            </span>
          </div>
          <div className="flex items-baseline justify-between my-2">
            <div>
              <div className="text-2xl font-extrabold text-slate-900">
                ${collectedFee.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Target: ${targetFee.toLocaleString()}
              </p>
            </div>
            <span className="text-xs font-semibold text-amber-600">
              ${(targetFee - collectedFee).toLocaleString()} Pending
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mt-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${feeCollectionProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. VISUAL CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Income vs Expense Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <BarChart2 className="w-4 h-4 text-indigo-600" />
                <span>Financial Performance: Income vs. Expense</span>
              </h3>
              <p className="text-xs text-slate-500">
                Real-time multi-ledger cash flow overview across the academic year
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="flex items-center space-x-1.5 text-xs text-slate-600 font-medium mr-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" />
                <span>Income</span>
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block ml-2" />
                <span>Expense</span>
              </span>
              <div className="inline-flex rounded-lg border border-slate-200 p-0.5 text-xs">
                <button
                  onClick={() => setChartPeriod('6M')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    chartPeriod === '6M' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  6M
                </button>
                <button
                  onClick={() => setChartPeriod('1Y')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    chartPeriod === '1Y' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  1Y
                </button>
              </div>
            </div>
          </div>

          {/* SVG Bar Chart with Hover Tooltips */}
          <div className="pt-6 pb-2">
            <div className="h-56 flex items-end justify-between gap-3 sm:gap-6 px-2">
              {monthlyFinancials.map(item => {
                const incomeHeightPct = Math.round((item.income / maxFinancialVal) * 100);
                const expenseHeightPct = Math.round((item.expense / maxFinancialVal) * 100);
                const isHovered = hoveredMonth === item.month;

                return (
                  <div
                    key={item.month}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                    onMouseEnter={() => setHoveredMonth(item.month)}
                    onMouseLeave={() => setHoveredMonth(null)}
                  >
                    {/* Tooltip on hover */}
                    {isHovered && (
                      <div className="mb-2 bg-slate-900 text-white text-[10px] p-2 rounded-lg shadow-lg pointer-events-none z-20 whitespace-nowrap animate-in fade-in zoom-in-95">
                        <p className="font-bold text-slate-300">{item.month} 2026</p>
                        <p className="text-emerald-400">Income: ${item.income.toLocaleString()}</p>
                        <p className="text-rose-400">Expense: ${item.expense.toLocaleString()}</p>
                        <p className="text-indigo-300 border-t border-slate-700 mt-1 pt-0.5">
                          Net: +${(item.income - item.expense).toLocaleString()}
                        </p>
                      </div>
                    )}

                    {/* Bars pair */}
                    <div className="w-full flex items-end justify-center gap-1.5 h-44">
                      {/* Income Bar */}
                      <div
                        className="w-1/2 max-w-[24px] bg-gradient-to-t from-indigo-700 to-indigo-500 rounded-t-md transition-all duration-300 group-hover:brightness-110"
                        style={{ height: `${incomeHeightPct}%` }}
                        title={`Income: $${item.income}`}
                      />
                      {/* Expense Bar */}
                      <div
                        className="w-1/2 max-w-[24px] bg-gradient-to-t from-rose-500 to-rose-400 rounded-t-md transition-all duration-300 group-hover:brightness-110"
                        style={{ height: `${expenseHeightPct}%` }}
                        title={`Expense: $${item.expense}`}
                      />
                    </div>

                    {/* Month Label */}
                    <span className="mt-2 text-xs font-semibold text-slate-600 group-hover:text-indigo-600">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Avg. Monthly Net Margin: ~28.4%</span>
              <button
                onClick={() => setActiveModule('account')}
                className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-1"
              >
                <span>View Full General Ledger</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Class-wise Student Strength Distribution Chart (1 col) */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Student Strength by Class</h3>
              <p className="text-xs text-slate-500">Enrolled vs Capacity utilization</p>
            </div>
            <button
              onClick={() => setActiveModule('classes')}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Manage
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {topClasses.map(cls => {
              const pct = Math.round((cls.enrolledStudents / cls.capacity) * 100);
              return (
                <div key={cls.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-800 font-semibold">{cls.name}</span>
                    <span className="text-slate-500 font-mono text-[11px]">
                      {cls.enrolledStudents} / {cls.capacity} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        pct > 90 ? 'bg-amber-500' : 'bg-indigo-600'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Overall Campus Capacity: 84% Filled</span>
            <span className="text-indigo-600 font-semibold">12 Available Seats</span>
          </div>
        </div>
      </div>

      {/* 4. WIDGETS: ACADEMIC CALENDAR & UPCOMING EVENTS FEED + QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar & Upcoming Events Feed (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Academic Calendar & Campus Announcements
              </h3>
            </div>
            <button
              onClick={() => setActiveModule('messaging')}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              + Post Notice
            </button>
          </div>

          <div className="mt-4 divide-y divide-slate-100">
            {notices.map(notice => (
              <div key={notice.id} className="py-3 flex items-start justify-between gap-4">
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                      notice.category === 'EVENT'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                        : notice.category === 'URGENT'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                    }`}
                  >
                    {notice.publishDate.split('-')[2]}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-xs font-bold text-slate-900">{notice.title}</h4>
                      {notice.isPinned && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-rose-100 text-rose-700">
                          Pinned
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">{notice.content}</p>
                    <div className="flex items-center space-x-3 mt-1.5 text-[11px] text-slate-400">
                      <span>Audience: {notice.targetAudience}</span>
                      <span>•</span>
                      <span>By: {notice.author}</span>
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-400 shrink-0">
                  {notice.publishDate}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Launchpad & Defaulter Alert (1 col) */}
        <div className="space-y-4">
          {/* Quick Actions Panel */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Quick Administrative Tasks</h3>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setActiveModule('fee')}
                className="p-3 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-left transition-all group"
              >
                <Receipt className="w-5 h-5 text-indigo-600 mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-slate-800">Fee POS</span>
                <span className="block text-[10px] text-slate-500">Collect & Slip</span>
              </button>

              <button
                onClick={() => setActiveModule('students')}
                className="p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-left transition-all group"
              >
                <UserPlus className="w-5 h-5 text-blue-600 mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-slate-800">New Student</span>
                <span className="block text-[10px] text-slate-500">Admission intake</span>
              </button>

              <button
                onClick={() => setActiveModule('attendance')}
                className="p-3 rounded-lg border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 text-left transition-all group"
              >
                <CalendarCheck className="w-5 h-5 text-emerald-600 mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-slate-800">Attendance</span>
                <span className="block text-[10px] text-slate-500">Dual punch marker</span>
              </button>

              <button
                onClick={() => setActiveModule('certificate')}
                className="p-3 rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-left transition-all group"
              >
                <FileCheck2 className="w-5 h-5 text-amber-600 mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-slate-800">Certificates</span>
                <span className="block text-[10px] text-slate-500">TC & Bonafide</span>
              </button>
            </div>
          </div>

          {/* Pending Fee Defaulters Spotlight */}
          <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-xl p-5 border border-rose-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center space-x-1.5 text-xs font-bold text-rose-800">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Defaulter Overdue Queue</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-200 text-rose-900">
                Action Required
              </span>
            </div>
            <p className="text-xs text-rose-700 mb-3">
              1 Student has overdue fee invoices past the grace period with automated fine applied.
            </p>
            <button
              onClick={() => setActiveModule('fee')}
              className="w-full py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors text-center"
            >
              Review Defaulter Records & Send WhatsApp Reminder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
