import React, { useState } from 'react';
import {
  Receipt,
  CreditCard,
  Search,
  Plus,
  AlertTriangle,
  Printer,
  CheckCircle2,
  DollarSign,
  Send,
  MessageSquare,
  X,
  FileText
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { FeeInvoice, FeeReceipt } from '../../types';

export const FeeModule: React.FC = () => {
  const {
    invoices,
    receipts,
    collectFee,
    createInvoice,
    students,
    classes,
    openPrintModal
  } = useSchool();

  const [activeTab, setActiveTab] = useState<'pos' | 'invoices' | 'receipts' | 'defaulters'>('pos');
  const [searchPos, setSearchPos] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<FeeInvoice | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<FeeReceipt['paymentMethod']>('CASH');
  const [transRef, setTransRef] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState<FeeReceipt | null>(null);

  // New Invoice Modal
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [newInvStudentId, setNewInvStudentId] = useState(students[0]?.id || '');
  const [newInvMonth, setNewInvMonth] = useState('November 2026');
  const [newInvTuition, setNewInvTuition] = useState(450);
  const [newInvLab, setNewInvLab] = useState(50);

  // Handle POS Selection
  const handleSelectPosInvoice = (inv: FeeInvoice) => {
    setSelectedInvoice(inv);
    setPaymentAmount(inv.dueAmount);
    setTransRef(`POS-${Date.now().toString().slice(-6)}`);
  };

  // Execute POS Collection
  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;

    try {
      const receipt = collectFee(selectedInvoice.id, Number(paymentAmount), paymentMethod, transRef);
      setPaymentSuccess(receipt);
      setSelectedInvoice(null);
      // Auto-launch official printable slip
      openPrintModal({
        type: 'FEE_RECEIPT',
        data: receipt
      });
    } catch (err: any) {
      alert(err.message || 'Payment processing error');
    }
  };

  // Create single invoice
  const handleGenerateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const targetStudent = students.find(s => s.id === newInvStudentId);
    if (!targetStudent) return;

    const baseAmount = Number(newInvTuition) + Number(newInvLab);
    createInvoice({
      studentId: targetStudent.id,
      studentName: `${targetStudent.firstName} ${targetStudent.lastName}`,
      className: targetStudent.className,
      section: targetStudent.section,
      amount: baseAmount,
      discount: targetStudent.scholarshipPercentage ? (baseAmount * targetStudent.scholarshipPercentage) / 100 : 0,
      fine: 0,
      dueDate: '2026-11-10',
      month: newInvMonth,
      items: [
        { particular: 'Tuition Fee (Monthly)', amount: Number(newInvTuition) },
        { particular: 'Laboratory & Campus Amenities', amount: Number(newInvLab) }
      ]
    });
    setShowInvoiceModal(false);
  };

  const defaulters = invoices.filter(inv => inv.status === 'OVERDUE' || (inv.status === 'UNPAID' && inv.dueAmount > 0));

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <span>Module 08</span>
            <span>•</span>
            <span>Cashier Counter & Billing</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Fee Management & POS Cashier</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Rapid POS collection counter, invoice generation, receipts printing, and automatic fine defaulter tracking.
          </p>
        </div>

        <button
          onClick={() => setShowInvoiceModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Generate New Invoice</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('pos')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'pos'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Fee POS Cashier Terminal</span>
        </button>

        <button
          onClick={() => setActiveTab('invoices')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'invoices'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Fee Invoices Directory</span>
        </button>

        <button
          onClick={() => setActiveTab('receipts')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'receipts'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Issued Receipts & Slips</span>
        </button>

        <button
          onClick={() => setActiveTab('defaulters')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'defaulters'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Defaulters List ({defaulters.length})</span>
        </button>
      </div>

      {/* TAB 1: POS CASHIER TERMINAL */}
      {activeTab === 'pos' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Pending Invoices Search & Selector (2 cols) */}
          <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Select Student Fee Invoice for Collection</h3>
              <span className="text-xs text-slate-500 font-mono">Live Unsettled Queue</span>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchPos}
                onChange={e => setSearchPos(e.target.value)}
                placeholder="Type student name or invoice number..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {invoices
                .filter(inv => inv.dueAmount > 0)
                .filter(
                  inv =>
                    inv.studentName.toLowerCase().includes(searchPos.toLowerCase()) ||
                    inv.invoiceNo.toLowerCase().includes(searchPos.toLowerCase())
                )
                .map(inv => {
                  const isSelected = selectedInvoice?.id === inv.id;
                  return (
                    <div
                      key={inv.id}
                      onClick={() => handleSelectPosInvoice(inv)}
                      className={`p-3.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50 border border-emerald-300'
                          : 'hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-xs text-slate-900">{inv.studentName}</span>
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                            {inv.className} ({inv.section})
                          </span>
                          <span className="font-mono text-[10px] text-indigo-600">{inv.invoiceNo}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Month: {inv.month} · Due: {inv.dueDate} {inv.fine > 0 && `· (Fine: $${inv.fine})`}
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="font-mono font-extrabold text-sm text-rose-600">
                          Due: ${inv.dueAmount}
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">
                          Total: ${inv.amount}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Right: Cashier Action Box (1 col) */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            {selectedInvoice ? (
              <form onSubmit={handleExecutePayment} className="space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">
                    Ready for Collection
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                    {selectedInvoice.studentName}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono">{selectedInvoice.invoiceNo}</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Amount Received ($)
                  </label>
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={e => setPaymentAmount(Number(e.target.value))}
                    max={selectedInvoice.dueAmount}
                    min="1"
                    className="w-full px-3 py-2 text-sm font-extrabold text-emerald-700 border border-slate-300 rounded-lg"
                    required
                  />
                  <span className="text-[10px] text-slate-400">
                    Max payable: ${selectedInvoice.dueAmount}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={e => setPaymentMethod(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-semibold"
                  >
                    <option value="CASH">Cash at Counter</option>
                    <option value="POS_CARD">POS Debit / Credit Card</option>
                    <option value="ONLINE_TRANSFER">Bank Direct Wire</option>
                    <option value="UPI">UPI / Digital QR</option>
                    <option value="CHEQUE">Bank Cheque</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Transaction / Auth Ref
                  </label>
                  <input
                    type="text"
                    value={transRef}
                    onChange={e => setTransRef(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Collect & Generate Slip</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                <Receipt className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                <p className="font-semibold">No Invoice Selected</p>
                <p className="text-[11px] mt-1">
                  Click on an unsettled invoice from the queue to process instant collection.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: INVOICES DIRECTORY */}
      {activeTab === 'invoices' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3.5">Invoice #</th>
                  <th className="p-3.5">Student</th>
                  <th className="p-3.5">Class</th>
                  <th className="p-3.5">Month</th>
                  <th className="p-3.5">Net Amount</th>
                  <th className="p-3.5">Paid</th>
                  <th className="p-3.5">Due Balance</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-mono font-bold text-indigo-600">{inv.invoiceNo}</td>
                    <td className="p-3.5 font-semibold text-slate-900">{inv.studentName}</td>
                    <td className="p-3.5 text-slate-600">{inv.className} ({inv.section})</td>
                    <td className="p-3.5 text-slate-600">{inv.month}</td>
                    <td className="p-3.5 font-mono font-bold">${inv.amount}</td>
                    <td className="p-3.5 font-mono text-emerald-600 font-bold">${inv.paidAmount}</td>
                    <td className="p-3.5 font-mono text-rose-600 font-bold">${inv.dueAmount}</td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          inv.status === 'PAID'
                            ? 'bg-emerald-100 text-emerald-800'
                            : inv.status === 'PARTIAL'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: RECEIPTS & PRINT SLIPS */}
      {activeTab === 'receipts' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3.5">Receipt No</th>
                  <th className="p-3.5">Student Name</th>
                  <th className="p-3.5">Amount Paid</th>
                  <th className="p-3.5">Method</th>
                  <th className="p-3.5">Transaction Ref</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Cashier</th>
                  <th className="p-3.5 text-right">Print Slip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {receipts.map(rcp => (
                  <tr key={rcp.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-mono font-bold text-indigo-700">{rcp.receiptNo}</td>
                    <td className="p-3.5 font-semibold text-slate-900">{rcp.studentName}</td>
                    <td className="p-3.5 font-mono font-bold text-emerald-600">${rcp.amountPaid}</td>
                    <td className="p-3.5 font-medium text-slate-700">{rcp.paymentMethod}</td>
                    <td className="p-3.5 font-mono text-slate-500">{rcp.transactionRef}</td>
                    <td className="p-3.5 text-slate-500">{rcp.paymentDate}</td>
                    <td className="p-3.5 text-slate-600">{rcp.receivedBy}</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() =>
                          openPrintModal({
                            type: 'FEE_RECEIPT',
                            data: rcp
                          })
                        }
                        className="px-2.5 py-1 text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-md transition-colors"
                      >
                        Print Slip
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: DEFAULTERS LIST */}
      {activeTab === 'defaulters' && (
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Fee Defaulters & Automated Late Fine Notice</h3>
              <p className="text-xs text-slate-500">Unsettled fees past due date with automatic late fine computation</p>
            </div>
            <button
              onClick={() => alert('Automated WhatsApp payment reminder dispatched to all defaulters!')}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Broadcast WhatsApp Reminders</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3.5">Student</th>
                  <th className="p-3.5">Class</th>
                  <th className="p-3.5">Original Due</th>
                  <th className="p-3.5">Late Fine</th>
                  <th className="p-3.5">Total Overdue</th>
                  <th className="p-3.5">Due Date</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {defaulters.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">{inv.studentName}</td>
                    <td className="p-3.5 text-slate-600">{inv.className}</td>
                    <td className="p-3.5 font-mono text-slate-700">${inv.amount}</td>
                    <td className="p-3.5 font-mono text-rose-600 font-bold">+${inv.fine || 25}</td>
                    <td className="p-3.5 font-mono text-rose-700 font-extrabold text-sm">
                      ${inv.dueAmount}
                    </td>
                    <td className="p-3.5 font-mono text-slate-500">{inv.dueDate}</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => {
                          setSelectedInvoice(inv);
                          setActiveTab('pos');
                        }}
                        className="px-3 py-1 text-xs font-bold bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                      >
                        Collect Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Generate Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Generate Student Fee Invoice</h3>
              <button onClick={() => setShowInvoiceModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleGenerateInvoice} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Student</label>
                <select
                  value={newInvStudentId}
                  onChange={e => setNewInvStudentId(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-medium"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.firstName} {s.lastName} ({s.className}) - {s.admissionNo}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Billing Month</label>
                <input
                  type="text"
                  value={newInvMonth}
                  onChange={e => setNewInvMonth(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tuition Base ($)</label>
                  <input
                    type="number"
                    value={newInvTuition}
                    onChange={e => setNewInvTuition(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Laboratory / Amenities ($)</label>
                  <input
                    type="number"
                    value={newInvLab}
                    onChange={e => setNewInvLab(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-bold"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowInvoiceModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm"
                >
                  Dispatch Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
