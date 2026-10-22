import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle2,
  Printer,
  DollarSign,
  TrendingDown,
  Calendar,
  Search,
  FileSpreadsheet
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { SalaryRecord } from '../../types';

export const SalaryModule: React.FC = () => {
  const { salaries, processSalaryPayment, openPrintModal } = useSchool();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('September');

  const filtered = salaries.filter(
    s =>
      s.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.slipNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPayroll = salaries.reduce((sum, s) => sum + s.netSalary, 0);
  const totalDeductions = salaries.reduce((sum, s) => sum + s.deductions, 0);
  const totalAllowances = salaries.reduce((sum, s) => sum + s.allowances, 0);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <span>Module 09</span>
            <span>•</span>
            <span>Human Resource Compensation</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Salary & Payroll Processing</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Disburse faculty payroll, generate compliance pay slips, withhold tax/provident deductions, and audit wage sheets.
          </p>
        </div>

        <button
          onClick={() => {
            salaries.forEach(s => {
              if (s.status !== 'PAID') {
                processSalaryPayment(s.id, 'ACH Batch Wire');
              }
            });
            alert('All pending staff payroll disbursed via corporate ACH batch clearing!');
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-md transition-colors"
        >
          <CreditCard className="w-4 h-4" />
          <span>Batch Disburse All Salaries</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Total Net Payroll Disbursed</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">
            ${totalPayroll.toLocaleString()}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">100% On-Time Faculty Settlement</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Gross Allowances & Incentives</span>
          <p className="text-2xl font-extrabold text-indigo-600 mt-2">
            +${totalAllowances.toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-400">Housing, medical, research allowances</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Withheld Tax & Social Security</span>
          <p className="text-2xl font-extrabold text-rose-600 mt-2">
            -${totalDeductions.toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-400">Remitted to State Tax Authority</span>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search employee by name, designation, or slip #..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <span className="text-xs text-slate-500 font-mono">
          Payroll Ledger for {selectedMonth} 2026
        </span>
      </div>

      {/* Salaries Sheet Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3.5">Slip #</th>
                <th className="p-3.5">Employee & Role</th>
                <th className="p-3.5">Month</th>
                <th className="p-3.5">Basic Salary</th>
                <th className="p-3.5">Allowances</th>
                <th className="p-3.5">Deductions</th>
                <th className="p-3.5">Net Disbursed</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(sal => (
                <tr key={sal.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-indigo-700">{sal.slipNo}</td>
                  <td className="p-3.5">
                    <p className="font-bold text-slate-900">{sal.employeeName}</p>
                    <p className="text-[11px] text-slate-500">{sal.designation}</p>
                  </td>
                  <td className="p-3.5 text-slate-600">{sal.month} {sal.year}</td>
                  <td className="p-3.5 font-mono text-slate-800">${sal.basicSalary}</td>
                  <td className="p-3.5 font-mono text-emerald-600 font-semibold">+${sal.allowances}</td>
                  <td className="p-3.5 font-mono text-rose-600 font-semibold">-${sal.deductions}</td>
                  <td className="p-3.5 font-mono font-extrabold text-sm text-slate-900">
                    ${sal.netSalary}
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        sal.status === 'PAID'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {sal.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right space-x-1">
                    {sal.status !== 'PAID' ? (
                      <button
                        onClick={() => processSalaryPayment(sal.id, 'ACH Batch Wire')}
                        className="px-2.5 py-1 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                      >
                        Pay Now
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          openPrintModal({
                            type: 'SALARY_SLIP',
                            data: sal
                          })
                        }
                        className="px-2.5 py-1 text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-md transition-colors"
                      >
                        Print Slip
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
