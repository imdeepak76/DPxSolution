import React from 'react';
import {
  Printer,
  X,
  Award,
  CreditCard,
  Receipt,
  FileSpreadsheet,
  Building2,
  CheckCircle2,
  QrCode
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

export const PrintModal: React.FC = () => {
  const { printPayload, closePrintModal, institute } = useSchool();

  if (!printPayload) return null;

  const { type, data } = printPayload;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95">
        {/* Modal Controls (Not printed) */}
        <div className="no-print p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Printer className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-sm">
              Print Preview: {type.replace('_', ' ')}
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold shadow-md transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Document (Ctrl+P)</span>
            </button>
            <button
              onClick={closePrintModal}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE CANVAS */}
        <div className="printable-area p-8 bg-white text-slate-900 min-h-[450px]">
          {/* 1. STUDENT ID CARD */}
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
                  <p className="text-indigo-200 text-[10px]">Blood Group: {data.bloodGroup || 'O+'}</p>
                  <p className="text-indigo-200 text-[10px]">Emergency: {data.guardianPhone}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-indigo-800/80 flex items-center justify-between text-[9px] text-indigo-300 font-mono">
                <span>Valid: {institute.academicYear}</span>
                <span className="font-bold text-amber-400">AUTHORIZED CARD</span>
              </div>
            </div>
          )}

          {/* 2. STAFF ID CARD */}
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
                  <p className="text-slate-400 text-[10px]">Joined: {data.joiningDate}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                <span>Role: {data.role}</span>
                <span className="text-emerald-400 font-bold">VERIFIED STAFF</span>
              </div>
            </div>
          )}

          {/* 3. FEE PAYMENT RECEIPT / SLIP */}
          {type === 'FEE_RECEIPT' && (
            <div className="border border-slate-300 p-6 rounded-xl space-y-5 bg-white text-xs">
              <div className="flex items-start justify-between border-b border-slate-300 pb-4">
                <div className="space-y-1">
                  <h4 className="font-black text-base text-slate-900 uppercase tracking-wide">
                    {institute.name}
                  </h4>
                  <p className="text-slate-600">{institute.address}</p>
                  <p className="text-slate-500">
                    Phone: {institute.phone} · Email: {institute.email}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded bg-slate-900 text-white font-bold font-mono text-xs">
                    OFFICIAL FEE SLIP
                  </span>
                  <p className="font-mono text-indigo-700 font-bold mt-1 text-xs">
                    {data.receiptNo}
                  </p>
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
                  <p className="font-mono font-semibold text-slate-800">
                    Mode: {data.paymentMethod}
                  </p>
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

          {/* 4. SALARY SLIP */}
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

          {/* 5. STUDENT RESULT CARD */}
          {type === 'RESULT_CARD' && (
            <div className="border-2 border-slate-800 p-6 rounded-xl space-y-4 bg-white text-xs">
              <div className="text-center border-b-2 border-slate-800 pb-3">
                <h4 className="font-black text-lg text-slate-900 uppercase tracking-wide">
                  {institute.name}
                </h4>
                <p className="text-slate-600 font-medium">{institute.branchName} · {institute.affiliationNumber}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-slate-900 text-white font-bold rounded text-xs uppercase tracking-wider">
                  {data.examTitle} - OFFICIAL REPORT CARD
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

          {/* 6. OFFICIAL CERTIFICATE */}
          {type === 'CERTIFICATE' && (
            <div className="border-8 border-double border-amber-800 p-8 rounded-2xl space-y-6 bg-amber-50/20 text-center text-xs relative">
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-slate-400 font-bold block">
                  REF NO: {data.certificateNo}
                </span>
                <h4 className="font-serif text-2xl font-black text-slate-900 tracking-wider">
                  {institute.name}
                </h4>
                <p className="text-slate-600 font-serif italic text-sm">
                  {institute.tagline}
                </p>
                <p className="text-slate-500 text-[11px]">{institute.address}</p>
              </div>

              <div className="py-2">
                <h3 className="font-serif text-xl font-bold uppercase tracking-widest text-amber-900 border-y-2 border-amber-800 py-1.5 inline-block px-8">
                  {data.type} CERTIFICATE
                </h3>
              </div>

              <p className="text-sm font-serif leading-relaxed text-slate-800 max-w-lg mx-auto">
                This is to officially certify that <strong>{data.recipientName}</strong>, {data.className ? `a student of ${data.className}` : data.relievingDesignation ? `serving as ${data.relievingDesignation}` : 'affiliated with this institution'}, has maintained an honorable standing.
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

          {/* 7. ADMISSION LETTER */}
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

              <p className="text-slate-800">
                Dear <strong>{data.guardianName}</strong>,
              </p>

              <p className="text-slate-700">
                We are delighted to formally offer admission to your ward, <strong>{data.firstName} {data.lastName}</strong>, into <strong>{data.className} (Section {data.section})</strong> for the academic session <strong>{institute.academicYear}</strong>.
              </p>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1 font-mono text-xs">
                <p>Admission Number: <strong>{data.admissionNo}</strong></p>
                <p>Allocated Roll Number: <strong>{data.rollNo}</strong></p>
                <p>Base Monthly Tuition: <strong>${data.totalFeeAssessed / 10}/month</strong></p>
              </div>

              <p className="text-slate-700">
                Please present this official admission authorization letter along with proof of identity and immunization records at the Admissions Desk to collect your learning resources and student ID badge.
              </p>

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
  );
};
