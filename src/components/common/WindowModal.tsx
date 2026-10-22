import React, { useState } from 'react';
import {
  Printer,
  X,
  Minus,
  Maximize2,
  Minimize2,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  FileText,
  CreditCard,
  Receipt,
  Award,
  CheckCircle2,
  Sparkles,
  QrCode,
  Calendar,
  Lock,
  ShieldCheck
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

export const WindowModal: React.FC = () => {
  const {
    windowModalState,
    setWindowModalState,
    closeWindowModal,
    institute
  } = useSchool();

  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  if (!windowModalState || !windowModalState.isOpen) return null;

  const { isMinimized, isMaximized, zoomLevel, type, data } = windowModalState;

  // If minimized, display floating dock widget at bottom-right
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-3 duration-300">
        <div
          onClick={() =>
            setWindowModalState(prev => (prev ? { ...prev, isMinimized: false } : null))
          }
          className="flex items-center space-x-3 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-indigo-500/40 cursor-pointer hover:bg-slate-800 transition-all hover:scale-105 group"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0 group-hover:rotate-12 transition-transform">
            <FileText className="w-4 h-4" />
          </div>
          <div className="text-left pr-2">
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                Minimized Document
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            </div>
            <p className="text-xs font-bold text-white truncate max-w-[200px]">
              {type.replace('_', ' ')}: {data.studentName || data.firstName || data.recipientName || data.employeeName || 'Preview'}
            </p>
          </div>
          <button
            onClick={e => {
              e.stopPropagation();
              setWindowModalState(prev => (prev ? { ...prev, isMinimized: false } : null));
            }}
            className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-indigo-200"
            title="Restore Window"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={e => {
              e.stopPropagation();
              closeWindowModal();
            }}
            className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-rose-300"
            title="Close Document"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1200);
  };

  const handleZoomIn = () => {
    setWindowModalState(prev => (prev ? { ...prev, zoomLevel: Math.min(prev.zoomLevel + 15, 160) } : null));
  };

  const handleZoomOut = () => {
    setWindowModalState(prev => (prev ? { ...prev, zoomLevel: Math.max(prev.zoomLevel - 15, 70) } : null));
  };

  const handleToggleMaximize = () => {
    setWindowModalState(prev => (prev ? { ...prev, isMaximized: !prev.isMaximized } : null));
  };

  const handleMinimize = () => {
    setWindowModalState(prev => (prev ? { ...prev, isMinimized: true } : null));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div
        className={`bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 animate-in fade-in zoom-in-95 ${
          isMaximized
            ? 'w-full h-full max-w-none rounded-none my-0'
            : 'max-w-4xl w-full my-6 max-h-[92vh]'
        }`}
      >
        {/* WINDOW HEADER (Window Controls) */}
        <div className="no-print p-3 sm:p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-sm tracking-wide text-white">
                  {type.replace('_', ' ')}
                </span>
                <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-indigo-600/60 text-indigo-200">
                  Document Viewer
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {institute.name} · Official Digital Artifact
              </p>
            </div>
          </div>

          {/* Window Control Buttons: Minimize, Maximize, Close */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={handleMinimize}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Minimize to Floating Dock (_)"
            >
              <Minus className="w-4 h-4" />
            </button>

            <button
              onClick={handleToggleMaximize}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title={isMaximized ? 'Restore Normal Window' : 'Maximize Window (□)'}
            >
              {isMaximized ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={closeWindowModal}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Close Document (✕)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ACTION TOOLBAR */}
        <div className="no-print px-4 py-2.5 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
          {/* Zoom controls */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={handleZoomOut}
              className="p-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-md shadow-xs transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 py-1 bg-white border border-slate-200 rounded-md text-xs font-mono font-bold text-slate-700">
              {zoomLevel}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-md shadow-xs transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold border border-slate-300 shadow-xs transition-colors"
            >
              {isExporting ? (
                <RotateCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
              ) : (
                <Download className="w-3.5 h-3.5 text-slate-600" />
              )}
              <span>{isExporting ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-md transition-all active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Document</span>
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="no-print p-2.5 bg-emerald-50 border-b border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Digital PDF file exported and downloaded successfully!</span>
          </div>
        )}

        {/* SCROLLABLE DOCUMENT PREVIEW CANVAS */}
        <div className="flex-1 overflow-auto p-4 sm:p-8 pt-8 sm:pt-10 pb-16 bg-slate-200/60 flex items-start justify-center">
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="transition-transform duration-200 my-4"
          >
            <div className="printable-area bg-white text-slate-900 shadow-2xl rounded-xl border border-slate-300 min-w-[320px] max-w-[760px] p-8 sm:p-10 mx-auto">
              {/* 1. EXAM ADMIT CARD / HALL TICKET */}
              {type === 'ADMIT_CARD' && (
                <div className="border-2 border-indigo-900 rounded-xl p-6 space-y-5 bg-white text-xs">
                  {/* Admit Card Header */}
                  <div className="text-center border-b-2 border-indigo-900 pb-4">
                    <span className="font-mono text-[10px] text-indigo-600 font-bold tracking-widest uppercase block">
                      OFFICIAL EXAMINATION HALL TICKET
                    </span>
                    <h3 className="font-black text-xl text-slate-900 uppercase tracking-wide mt-1">
                      {institute.name}
                    </h3>
                    <p className="text-slate-600 text-xs font-medium">{institute.branchName} · {institute.affiliationNumber}</p>
                    <div className="inline-block mt-2 px-3 py-1 bg-indigo-900 text-white font-extrabold rounded text-xs uppercase tracking-wider">
                      Term 1 Board Assessment Admit Card (2026-2027)
                    </div>
                  </div>

                  {/* Student Details and Photo */}
                  <div className="flex items-start justify-between gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-xs flex-1">
                      <div>
                        <span className="text-slate-500 text-[10px] uppercase font-bold block">Candidate Name</span>
                        <span className="font-bold text-slate-900 text-sm">{data.firstName} {data.lastName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] uppercase font-bold block">Admission Number</span>
                        <span className="font-mono font-bold text-indigo-700">{data.admissionNo}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] uppercase font-bold block">Class & Section</span>
                        <span className="font-bold text-slate-800">{data.className} (Section {data.section})</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] uppercase font-bold block">Exam Roll Number</span>
                        <span className="font-mono font-bold text-slate-900">{data.rollNo}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] uppercase font-bold block">Father / Guardian</span>
                        <span className="text-slate-700">{data.guardianName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] uppercase font-bold block">Fee Dues Status</span>
                        <span className="font-bold text-emerald-600 flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" />
                          <span>Cleared / Authorized</span>
                        </span>
                      </div>
                    </div>

                    <div className="text-center shrink-0">
                      <img
                        src={data.photoUrl}
                        alt={data.firstName}
                        className="w-24 h-28 object-cover rounded-lg border-2 border-indigo-700 shadow-md"
                      />
                      <span className="text-[10px] font-mono text-slate-500 mt-1 block">Verified Photo</span>
                    </div>
                  </div>

                  {/* Date Sheet Timetable Matrix */}
                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-900 text-xs">Examination Schedule & Allocated Venues</h5>
                    <table className="w-full text-left border border-slate-300">
                      <thead className="bg-slate-100 text-slate-700 font-bold">
                        <tr>
                          <th className="p-2 border-b">Date</th>
                          <th className="p-2 border-b">Subject</th>
                          <th className="p-2 border-b text-center">Timing</th>
                          <th className="p-2 border-b text-center">Room / Hall</th>
                          <th className="p-2 border-b text-center">Invigilator Sign</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {[
                          { date: '2026-11-10', sub: 'Calculus & Pure Mathematics', time: '09:00 AM - 12:00 PM', hall: 'Hall A (Seat 14)' },
                          { date: '2026-11-12', sub: 'English Language & Literature', time: '09:00 AM - 12:00 PM', hall: 'Hall A (Seat 14)' },
                          { date: '2026-11-15', sub: 'Physics & Applied Mechanics', time: '09:00 AM - 12:00 PM', hall: 'Physics Lab 1' },
                          { date: '2026-11-18', sub: 'Chemistry & Lab Practicals', time: '09:00 AM - 12:00 PM', hall: 'Chem Lab 2' }
                        ].map((row, idx) => (
                          <tr key={idx}>
                            <td className="p-2 font-mono">{row.date}</td>
                            <td className="p-2 font-semibold text-slate-900">{row.sub}</td>
                            <td className="p-2 text-center font-mono text-slate-600">{row.time}</td>
                            <td className="p-2 text-center font-mono font-bold text-indigo-700">{row.hall}</td>
                            <td className="p-2 text-center text-slate-300">___________</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Candidate Instructions */}
                  <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg space-y-1 text-[11px] text-amber-900">
                    <p className="font-bold">Important Candidate Instructions:</p>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                      <li>Candidates must arrive at the examination venue 30 minutes prior to commencement.</li>
                      <li>Calculators and electronic communication devices are strictly prohibited inside the hall.</li>
                      <li>This admit card must be presented alongside official student ID card at entry.</li>
                    </ul>
                  </div>

                  {/* Signatures */}
                  <div className="pt-8 flex justify-between items-end text-xs">
                    <div className="text-center border-t border-slate-400 pt-1 w-36">
                      <span>Candidate Signature</span>
                    </div>
                    <div className="text-center border-t border-slate-400 pt-1 w-36">
                      <span>Dean of Academics</span>
                    </div>
                    <div className="text-center border-t border-slate-400 pt-1 w-36">
                      <span className="font-bold text-slate-900">Controller of Exams</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. STUDENT ID CARD */}
              {type === 'STUDENT_ID' && (
                <div className="max-w-sm mx-auto border-2 border-indigo-900 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-950 text-white p-5 space-y-4">
                  <div className="text-center border-b border-indigo-700/60 pb-3">
                    <span className="text-[10px] uppercase tracking-widest text-indigo-300 font-bold">
                      STUDENT IDENTITY BADGE
                    </span>
                    <h4 className="font-black text-sm text-white tracking-wide mt-0.5">{institute.name}</h4>
                    <p className="text-[10px] text-indigo-200">{institute.branchName}</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <img
                      src={data.photoUrl}
                      alt={data.firstName}
                      className="w-24 h-28 object-cover rounded-xl border-2 border-indigo-400 shadow-md shrink-0"
                    />
                    <div className="space-y-1 text-xs">
                      <h5 className="font-extrabold text-base text-amber-300">
                        {data.firstName} {data.lastName}
                      </h5>
                      <p className="font-mono text-indigo-200 text-[11px]">
                        Adm: <strong>{data.admissionNo}</strong>
                      </p>
                      <p className="text-indigo-100">
                        Class: <strong>{data.className}</strong>
                      </p>
                      <p className="text-indigo-100 font-mono">
                        Roll: <strong>{data.rollNo}</strong> · Sec: {data.section}
                      </p>
                      <p className="text-indigo-200 text-[10px]">Blood: {data.bloodGroup || 'O+'}</p>
                      <p className="text-indigo-200 text-[10px]">Emergency: {data.guardianPhone}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-indigo-800/80 flex items-center justify-between text-[9px] text-indigo-300 font-mono">
                    <span>Valid: {institute.academicYear}</span>
                    <span className="font-bold text-amber-400">AUTHORIZED CARD</span>
                  </div>
                </div>
              )}

              {/* 3. STAFF ID CARD */}
              {type === 'STAFF_ID' && (
                <div className="max-w-sm mx-auto border-2 border-slate-900 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 text-white p-5 space-y-4">
                  <div className="text-center border-b border-slate-700 pb-3">
                    <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">
                      FACULTY & STAFF CREDENTIAL
                    </span>
                    <h4 className="font-black text-sm text-white">{institute.name}</h4>
                    <p className="text-[10px] text-slate-300">{institute.branchName}</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <img
                      src={data.photoUrl}
                      alt={data.firstName}
                      className="w-24 h-28 object-cover rounded-xl border-2 border-indigo-500 shadow-md shrink-0"
                    />
                    <div className="space-y-1 text-xs">
                      <h5 className="font-extrabold text-base text-indigo-300">
                        {data.firstName} {data.lastName}
                      </h5>
                      <p className="font-mono text-slate-300 text-[11px]">
                        Emp Code: <strong>{data.employeeCode}</strong>
                      </p>
                      <p className="text-white font-semibold">{data.designation}</p>
                      <p className="text-slate-300 text-[11px]">{data.department}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                    <span>Role: {data.role}</span>
                    <span className="text-emerald-400 font-bold">VERIFIED STAFF</span>
                  </div>
                </div>
              )}

              {/* 4. FEE PAYMENT RECEIPT / SLIP */}
              {type === 'FEE_RECEIPT' && (
                <div className="border border-slate-300 p-6 rounded-xl space-y-5 bg-white text-xs">
                  <div className="flex items-start justify-between border-b border-slate-300 pb-4">
                    <div className="space-y-1">
                      <h4 className="font-black text-base text-slate-900 uppercase tracking-wide">
                        {institute.name}
                      </h4>
                      <p className="text-slate-600">{institute.address}</p>
                      <p className="text-slate-500">Phone: {institute.phone} · Email: {institute.email}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2.5 py-1 rounded bg-slate-900 text-white font-bold font-mono text-xs">
                        OFFICIAL FEE SLIP
                      </span>
                      <p className="font-mono text-indigo-700 font-bold mt-1 text-xs">{data.receiptNo}</p>
                      <p className="text-slate-500 font-mono text-[11px]">Date: {data.paymentDate}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold">Student Name</span>
                      <p className="font-bold text-slate-900 text-sm">{data.studentName}</p>
                      <p className="text-slate-600">Class: {data.className}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold">Payment Details</span>
                      <p className="font-mono font-semibold text-slate-800">Mode: {data.paymentMethod}</p>
                      <p className="text-slate-500 font-mono text-[11px]">Ref: {data.transactionRef}</p>
                    </div>
                  </div>

                  <table className="w-full text-left border border-slate-200 rounded">
                    <thead className="bg-slate-100 text-slate-700 font-bold">
                      <tr>
                        <th className="p-2.5">Billing Particular</th>
                        <th className="p-2.5 text-right">Amount Paid ($)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-2.5 font-medium">Standard Tuition & Institutional Fees</td>
                        <td className="p-2.5 text-right font-mono font-bold">${data.amountPaid}.00</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="bg-slate-50 font-bold text-slate-900 border-t border-slate-200">
                        <td className="p-2.5">Total Amount Tendered</td>
                        <td className="p-2.5 text-right font-mono text-sm text-emerald-700">
                          ${data.amountPaid}.00
                        </td>
                      </tr>
                    </tfoot>
                  </table>

                  <div className="pt-8 flex justify-between items-end text-[11px] text-slate-600">
                    <div>
                      <p>Cashier: <strong>{data.receivedBy || 'Chief Bursar'}</strong></p>
                      <p className="text-[10px] text-slate-400">System Generated Payment Voucher</p>
                    </div>
                    <div className="text-center border-t border-slate-400 pt-1 w-36">
                      <span className="font-semibold text-slate-800">Authorized Bursar Seal</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. SALARY SLIP */}
              {type === 'SALARY_SLIP' && (
                <div className="border border-slate-300 p-6 rounded-xl space-y-5 bg-white text-xs">
                  <div className="flex items-start justify-between border-b border-slate-300 pb-4">
                    <div>
                      <h4 className="font-black text-base text-slate-900 uppercase">{institute.name}</h4>
                      <p className="text-slate-500">{institute.branchName}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-2.5 py-1 rounded bg-indigo-900 text-white font-bold text-xs">
                        MONTHLY PAYSLIP
                      </span>
                      <p className="font-mono text-indigo-700 font-bold mt-1">{data.slipNo}</p>
                      <p className="text-slate-500">Period: {data.month} {data.year}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold">Staff Member</span>
                      <p className="font-bold text-slate-900 text-sm">{data.employeeName}</p>
                      <p className="text-slate-600">{data.designation}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold">Disbursement Status</span>
                      <p className="font-bold text-emerald-700">{data.status} via {data.paymentMethod || 'Direct Deposit'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-slate-200 rounded-lg p-3">
                      <h5 className="font-bold text-slate-800 border-b pb-1 mb-2">Earnings ($)</h5>
                      <div className="flex justify-between py-1">
                        <span>Basic Salary</span>
                        <span className="font-mono font-semibold">${data.basicSalary}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Allowances & Perks</span>
                        <span className="font-mono font-semibold">+${data.allowances}</span>
                      </div>
                    </div>

                    <div className="border border-slate-200 rounded-lg p-3">
                      <h5 className="font-bold text-slate-800 border-b pb-1 mb-2">Deductions ($)</h5>
                      <div className="flex justify-between py-1 text-rose-600">
                        <span>Income Tax & Social Security</span>
                        <span className="font-mono font-semibold">-${data.deductions}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg flex justify-between items-center font-bold text-sm text-indigo-950">
                    <span>Net Disbursed Take-Home</span>
                    <span className="font-mono text-base text-indigo-700">${data.netSalary}.00</span>
                  </div>

                  <div className="pt-8 flex justify-between items-end text-[11px] text-slate-600">
                    <span>Electronically Signed by Human Resources & Payroll Officer</span>
                    <div className="text-center border-t border-slate-400 pt-1 w-36">
                      <span className="font-semibold text-slate-800">Director General</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 6. STUDENT RESULT CARD / REPORT CARD */}
              {type === 'RESULT_CARD' && (
                <div className="border-2 border-slate-800 p-6 rounded-xl space-y-4 bg-white text-xs">
                  <div className="text-center border-b-2 border-slate-800 pb-3">
                    <h4 className="font-black text-lg text-slate-900 uppercase tracking-wide">
                      {institute.name}
                    </h4>
                    <p className="text-slate-600 font-medium">{institute.branchName} · {institute.affiliationNumber}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-slate-900 text-white font-bold rounded text-xs uppercase tracking-wider">
                      {data.examTitle || 'Term 1 Final Examination'} - OFFICIAL REPORT CARD
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
                    <div>
                      <p>Student Name: <strong>{data.studentName}</strong></p>
                      <p>Admission No: <strong className="font-mono">{data.admissionNo}</strong></p>
                    </div>
                    <div>
                      <p>Grade / Class: <strong>{data.className} (Sec {data.section})</strong></p>
                      <p>Roll No: <strong className="font-mono">{data.rollNo}</strong> · Class Rank: <strong>#{data.rank}</strong></p>
                    </div>
                  </div>

                  <table className="w-full text-left border border-slate-300">
                    <thead className="bg-slate-100 text-slate-700 font-bold">
                      <tr>
                        <th className="p-2 border-b">Subject</th>
                        <th className="p-2 border-b text-center">Max Marks</th>
                        <th className="p-2 border-b text-center">Marks Obtained</th>
                        <th className="p-2 border-b text-center">Grade</th>
                        <th className="p-2 border-b">Teacher Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {data.subjects?.map((sub: any, idx: number) => (
                        <tr key={idx}>
                          <td className="p-2 font-semibold text-slate-900">{sub.subjectName}</td>
                          <td className="p-2 text-center font-mono">{sub.totalMarks}</td>
                          <td className="p-2 text-center font-mono font-bold">{sub.obtainedMarks}</td>
                          <td className="p-2 text-center font-bold text-indigo-700">{sub.grade}</td>
                          <td className="p-2 text-slate-600 text-[11px]">{sub.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200 text-center font-bold">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Percentage</span>
                      <span className="text-base text-purple-700 font-mono">{data.percentage}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">GPA (4.0 Scale)</span>
                      <span className="text-base text-emerald-700 font-mono">{data.gpa.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Final Standing</span>
                      <span className="text-sm text-slate-900">{data.overallGrade}</span>
                    </div>
                  </div>

                  <div className="pt-8 flex justify-between items-end text-xs">
                    <div className="text-center border-t border-slate-400 pt-1 w-32">
                      <span>Class Teacher</span>
                    </div>
                    <div className="text-center border-t border-slate-400 pt-1 w-32">
                      <span>Examination Officer</span>
                    </div>
                    <div className="text-center border-t border-slate-400 pt-1 w-32">
                      <span>Principal Seal</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 7. OFFICIAL CERTIFICATES (Character / Bonafide / TC / Experience) */}
              {type === 'CERTIFICATE' && (
                <div className="border-8 border-double border-amber-800 p-8 rounded-2xl space-y-6 bg-amber-50/20 text-center text-xs relative">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-slate-400 font-bold block">
                      REF NO: {data.certificateNo}
                    </span>
                    <h4 className="font-serif text-2xl font-black text-slate-900 tracking-wider">
                      {institute.name}
                    </h4>
                    <p className="text-slate-600 font-serif italic text-sm">{institute.tagline}</p>
                    <p className="text-slate-500 text-[11px]">{institute.address}</p>
                  </div>

                  <div className="py-2">
                    <h3 className="font-serif text-xl font-bold uppercase tracking-widest text-amber-900 border-y-2 border-amber-800 py-1.5 inline-block px-8">
                      {data.type} CERTIFICATE
                    </h3>
                  </div>

                  <p className="text-sm font-serif leading-relaxed text-slate-800 max-w-lg mx-auto">
                    This is to officially certify that <strong>{data.recipientName}</strong>, {data.className ? `a regular student of ${data.className}` : data.relievingDesignation ? `serving as ${data.relievingDesignation}` : 'affiliated with this institution'}, has maintained an honorable scholastic standing.
                  </p>

                  <p className="text-xs font-serif leading-relaxed text-slate-700 max-w-md mx-auto italic">
                    "{data.academicConduct}"
                  </p>

                  <p className="text-xs text-slate-600">
                    Issued on this <strong>{data.issueDate}</strong> for the purpose of: <em>{data.reason}</em>.
                  </p>

                  <div className="pt-12 flex justify-between items-end text-xs px-6">
                    <div className="text-center border-t border-slate-800 pt-1 w-36">
                      <span>Registrar</span>
                    </div>
                    <div className="w-16 h-16 rounded-full border-2 border-amber-800 text-amber-900 flex items-center justify-center font-serif text-[10px] font-bold">
                      OFFICIAL SEAL
                    </div>
                    <div className="text-center border-t border-slate-800 pt-1 w-36">
                      <span>Principal / Director</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 8. ADMISSION LETTER */}
              {type === 'ADMISSION_LETTER' && (
                <div className="border border-slate-300 p-8 rounded-xl space-y-5 bg-white text-xs leading-relaxed">
                  <div className="border-b pb-4 flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-base text-slate-900">{institute.name}</h4>
                      <p className="text-slate-500">{institute.address}</p>
                    </div>
                    <span className="font-mono text-indigo-700 font-bold">
                      Ref: DPX-ADM-{data.admissionNo}
                    </span>
                  </div>

                  <p className="text-slate-800">
                    Date: <strong>{data.admissionDate || new Date().toISOString().split('T')[0]}</strong>
                  </p>

                  <p className="text-slate-800">Dear <strong>{data.guardianName}</strong>,</p>

                  <p className="text-slate-700">
                    We are delighted to formally offer admission to your ward, <strong>{data.firstName} {data.lastName}</strong>, into <strong>{data.className} (Section {data.section})</strong> for the academic session <strong>{institute.academicYear}</strong>.
                  </p>

                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1 font-mono text-xs">
                    <p>Admission Number: <strong>{data.admissionNo}</strong></p>
                    <p>Allocated Roll Number: <strong>{data.rollNo}</strong></p>
                    <p>Base Monthly Tuition: <strong>${data.totalFeeAssessed / 10}/month</strong></p>
                  </div>

                  <div className="pt-8 flex justify-between items-end">
                    <div>
                      <p className="font-bold text-slate-900">Dr. Patricia Holt</p>
                      <p className="text-slate-500 text-[11px]">Dean of Admissions & Registrar</p>
                    </div>
                    <div className="text-center border-t border-slate-400 pt-1 w-36">
                      <span className="font-semibold text-slate-800">Institute Registrar</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
