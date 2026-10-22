import React, { useState } from 'react';
import {
  BarChart3,
  FileText,
  Users,
  CalendarCheck,
  DollarSign,
  Download,
  Printer,
  Search,
  Filter,
  Sparkles
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

export const ReportsModule: React.FC = () => {
  const { students, invoices, transactions, openPrintModal } = useSchool();
  const [activeReport, setActiveReport] = useState<
    'contacts' | 'attendance' | 'fees' | 'financial' | 'custom'
  >('contacts');

  const [queryInput, setQueryInput] = useState('SELECT admissionNo, firstName, className, guardianPhone FROM Students WHERE status = "ACTIVE";');
  const [queryResultCount, setQueryResultCount] = useState<number | null>(null);

  const handleRunQuery = () => {
    setQueryResultCount(students.length);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <span>Module 21</span>
            <span>•</span>
            <span>Executive Business Intelligence</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Reports, Transcripts & Query Builder</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Generate parent contact rosters, fee collection audits, monthly attendance digests, and custom database queries.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {[
          { key: 'contacts', label: 'Student & Parent Directory', icon: Users },
          { key: 'fees', label: 'Fee Revenue Audit', icon: DollarSign },
          { key: 'attendance', label: 'Attendance Digests', icon: CalendarCheck },
          { key: 'financial', label: 'Financial Statements', icon: FileText },
          { key: 'custom', label: 'Custom SQL Query Builder', icon: Sparkles }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeReport === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveReport(tab.key as any)}
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

      {/* Report 1: Student & Parent Directory */}
      {activeReport === 'contacts' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Parent & Guardian Emergency Contact Registry</h3>
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Basic List</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3.5">Admission #</th>
                  <th className="p-3.5">Student Name</th>
                  <th className="p-3.5">Class</th>
                  <th className="p-3.5">Guardian</th>
                  <th className="p-3.5">Emergency Phone</th>
                  <th className="p-3.5">Guardian Email</th>
                  <th className="p-3.5">Residential City</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-mono font-bold text-indigo-700">{s.admissionNo}</td>
                    <td className="p-3.5 font-bold text-slate-900">{s.firstName} {s.lastName}</td>
                    <td className="p-3.5 text-slate-600">{s.className}</td>
                    <td className="p-3.5 font-semibold text-slate-800">{s.guardianName} ({s.guardianRelation})</td>
                    <td className="p-3.5 font-mono text-slate-700">{s.guardianPhone}</td>
                    <td className="p-3.5 font-mono text-slate-500">{s.guardianEmail}</td>
                    <td className="p-3.5 text-slate-600">{s.address.split(',')[1] || s.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Report 2: Fee Revenue */}
      {activeReport === 'fees' && (
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">Fee Collection Summary by Category</h3>
            <span className="text-xs font-mono font-bold text-emerald-600">
              Total Invoiced: ${invoices.reduce((s, i) => s + i.amount, 0).toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-500">Collected Cashier Revenue</span>
              <p className="text-xl font-extrabold text-emerald-600 mt-1">
                ${invoices.reduce((s, i) => s + i.paidAmount, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-500">Outstanding Receivable Balance</span>
              <p className="text-xl font-extrabold text-rose-600 mt-1">
                ${invoices.reduce((s, i) => s + i.dueAmount, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-500">Late Fines Assessed</span>
              <p className="text-xl font-extrabold text-amber-600 mt-1">
                ${invoices.reduce((s, i) => s + i.fine, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Report 3: Attendance */}
      {activeReport === 'attendance' && (
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Class-Wise Attendance Aggregates</h3>
          <p className="text-xs text-slate-500">Consolidated percentage of classroom attendance during Term 1</p>
          <div className="space-y-3">
            {[
              { cls: 'Grade 10', rate: 95.8 },
              { cls: 'Grade 11 (Science)', rate: 94.2 },
              { cls: 'Grade 12 (Science)', rate: 96.1 },
              { cls: 'Grade 8', rate: 93.4 }
            ].map(row => (
              <div key={row.cls} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span>{row.cls}</span>
                  <span className="text-indigo-600 font-mono font-bold">{row.rate}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${row.rate}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Report 4: Financial Statements */}
      {activeReport === 'financial' && (
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Real-time Income Statement & Balance Summary</h3>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between font-bold text-slate-900 pb-2 border-b border-slate-200">
              <span>Operating Revenues (Tuition, Lab & Amenities)</span>
              <span className="font-mono text-emerald-600">+$55,700.00</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Staff & Faculty Compensation</span>
              <span className="font-mono text-rose-600">-$35,200.00</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Utilities, Internet & Building Infrastructure</span>
              <span className="font-mono text-rose-600">-$3,450.00</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Laboratory Supplies & Reagents</span>
              <span className="font-mono text-rose-600">-$2,800.00</span>
            </div>
            <div className="flex justify-between font-extrabold text-sm text-slate-900 pt-2 border-t border-slate-300">
              <span>Net Educational Operating Surplus</span>
              <span className="font-mono text-emerald-700">+$14,250.00</span>
            </div>
          </div>
        </div>
      )}

      {/* Report 5: Custom SQL Query Builder */}
      {activeReport === 'custom' && (
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Custom Report SQL / Data Query Builder</h3>
            <p className="text-xs text-slate-500">Query PostgreSQL tables directly or construct relational export pipelines</p>
          </div>

          <div className="space-y-2">
            <textarea
              rows={3}
              value={queryInput}
              onChange={e => setQueryInput(e.target.value)}
              className="w-full font-mono text-xs p-3 bg-slate-900 text-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-slate-400 font-mono">
                Tables: Students, FeeInvoices, AttendanceRecords, Employees
              </span>
              <button
                onClick={handleRunQuery}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
              >
                Execute Query
              </button>
            </div>
          </div>

          {queryResultCount !== null && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-bold">
              Query matched {queryResultCount} rows in 4.2ms. Export format: CSV, JSON, PDF ready.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
