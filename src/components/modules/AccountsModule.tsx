import React, { useState } from 'react';
import {
  DollarSign,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  FileSpreadsheet,
  Calendar,
  X,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { AccountTransaction } from '../../types';

export const AccountsModule: React.FC = () => {
  const { transactions, addTransaction } = useSchool();
  const [filterType, setFilterType] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newTx, setNewTx] = useState({
    type: 'INCOME' as AccountTransaction['type'],
    category: 'Tuition Fees',
    ledgerName: 'Student General Tuition Ledger',
    amount: 1200,
    paymentMethod: 'Bank Wire',
    description: '',
    recordedBy: 'Marcus Sterling-Price'
  });

  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    addTransaction({
      type: newTx.type,
      category: newTx.category,
      ledgerName: newTx.ledgerName,
      amount: Number(newTx.amount),
      date: new Date().toISOString().split('T')[0],
      paymentMethod: newTx.paymentMethod,
      description: newTx.description || `${newTx.type} entry under ${newTx.category}`,
      recordedBy: newTx.recordedBy
    });
    setShowAddModal(false);
  };

  const filtered = transactions.filter(t => filterType === 'ALL' || t.type === filterType);

  const totalIncome = transactions
    .filter(t => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <span>Module 07</span>
            <span>•</span>
            <span>Financial Governance</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Financial Accounts & Multi-Ledger</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Multi-ledger chart of accounts, operational expenditure, bank clearing, and real-time ledger statement.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Record New Entry</span>
        </button>
      </div>

      {/* KPI Balances */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Aggregated Income</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-emerald-600 mt-2">
            ${totalIncome.toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-400">Tuition, lab, sports, donations</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Aggregated Expenses</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-rose-600 mt-2">
            ${totalExpense.toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-400">Payroll, maintenance, utilities</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Net Operating Balance</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-indigo-700 mt-2">
            ${netBalance.toLocaleString()}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">Positive Cash Flow Surplus</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
        <div className="flex gap-1">
          {(['ALL', 'INCOME', 'EXPENSE'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                filterType === f
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {f === 'ALL' ? 'All Transactions' : f === 'INCOME' ? 'Income Credits' : 'Expense Debits'}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-500 font-mono">
          {filtered.length} Recorded Entries
        </span>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3.5">Ref Number</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Ledger Head & Category</th>
                <th className="p-3.5">Description</th>
                <th className="p-3.5">Payment Channel</th>
                <th className="p-3.5 text-right">Amount ($)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-slate-700">{tx.refNo}</td>
                  <td className="p-3.5 font-mono text-slate-500">{tx.date}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        tx.type === 'INCOME'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <p className="font-semibold text-slate-900">{tx.ledgerName}</p>
                    <p className="text-[11px] text-slate-500">{tx.category}</p>
                  </td>
                  <td className="p-3.5 text-slate-600 max-w-xs truncate">{tx.description}</td>
                  <td className="p-3.5 text-slate-600">{tx.paymentMethod}</td>
                  <td
                    className={`p-3.5 text-right font-mono font-bold text-sm ${
                      tx.type === 'INCOME' ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {tx.type === 'INCOME' ? '+' : '-'}${tx.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Record Accounting Entry</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTransaction} className="mt-4 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Transaction Type</label>
                  <select
                    value={newTx.type}
                    onChange={e => setNewTx({ ...newTx, type: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-bold"
                  >
                    <option value="INCOME">Income (Credit)</option>
                    <option value="EXPENSE">Expense (Debit)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Amount ($)</label>
                  <input
                    type="number"
                    value={newTx.amount}
                    onChange={e => setNewTx({ ...newTx, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-bold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ledger Name</label>
                <input
                  type="text"
                  placeholder="e.g. Science Equipment Purchase"
                  value={newTx.ledgerName}
                  onChange={e => setNewTx({ ...newTx, ledgerName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={newTx.category}
                    onChange={e => setNewTx({ ...newTx, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Payment Channel</label>
                  <select
                    value={newTx.paymentMethod}
                    onChange={e => setNewTx({ ...newTx, paymentMethod: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  >
                    <option value="Bank Wire">Bank Wire</option>
                    <option value="Cash Counter">Cash Counter</option>
                    <option value="Corporate Credit Card">Corporate Credit Card</option>
                    <option value="Cheque Deposit">Cheque Deposit</option>
                    <option value="UPI / QR">UPI / QR</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description / Memo</label>
                <textarea
                  rows={2}
                  placeholder="Audit reference and invoice details..."
                  value={newTx.description}
                  onChange={e => setNewTx({ ...newTx, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm"
                >
                  Post Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
