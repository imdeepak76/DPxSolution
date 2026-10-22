import React, { useState } from 'react';
import {
  FileCheck2,
  Plus,
  Printer,
  Search,
  Award,
  CheckCircle2,
  ShieldCheck,
  X
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { CertificateRecord } from '../../types';

export const CertificateModule: React.FC = () => {
  const { certificates, issueCertificate, students, employees, openPrintModal } = useSchool();
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [certTypeFilter, setCertTypeFilter] = useState<string>('ALL');

  const [newCert, setNewCert] = useState({
    type: 'CHARACTER' as CertificateRecord['type'],
    recipientId: students[0]?.id || '',
    recipientName: `${students[0]?.firstName} ${students[0]?.lastName}`,
    className: students[0]?.className || 'Grade 10',
    reason: 'Honor Roll & National Science Olympiad Participation',
    academicConduct: 'Exemplary moral integrity, active civic participation, and stellar scholastic devotion.',
    relievingDesignation: ''
  });

  const handleIssueCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    const cert = issueCertificate({
      type: newCert.type,
      recipientId: newCert.recipientId,
      recipientName: newCert.recipientName,
      className: newCert.className,
      reason: newCert.reason,
      academicConduct: newCert.academicConduct,
      relievingDesignation: newCert.relievingDesignation,
      issueDate: new Date().toISOString().split('T')[0]
    });
    setShowIssueModal(false);
    // Open print preview immediately
    openPrintModal({
      type: 'CERTIFICATE',
      data: cert
    });
  };

  const filtered = certificates.filter(
    c => certTypeFilter === 'ALL' || c.type === certTypeFilter
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <span>Module 22</span>
            <span>•</span>
            <span>Institutional Credentials & Accreditation</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Official Certificate Engine</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Dynamic template generator for Character, Bonafide, School Transfer (TC), and Experience Certificates with digital verification seal.
          </p>
        </div>

        <button
          onClick={() => setShowIssueModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Issue New Certificate</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {(['ALL', 'CHARACTER', 'BONAFIDE', 'TRANSFER', 'EXPERIENCE'] as const).map(type => (
          <button
            key={type}
            onClick={() => setCertTypeFilter(type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              certTypeFilter === type
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {type === 'ALL'
              ? 'All Certificates'
              : type === 'CHARACTER'
              ? 'Character Certificate'
              : type === 'BONAFIDE'
              ? 'Bonafide Certificate'
              : type === 'TRANSFER'
              ? 'Transfer Certificate (TC)'
              : 'Experience Certificate'}
          </button>
        ))}
      </div>

      {/* Certificates Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3.5">Serial Certificate #</th>
                <th className="p-3.5">Certificate Type</th>
                <th className="p-3.5">Recipient</th>
                <th className="p-3.5">Class / Role</th>
                <th className="p-3.5">Purpose / Reason</th>
                <th className="p-3.5">Issue Date</th>
                <th className="p-3.5 text-right">Official Print</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(cert => (
                <tr key={cert.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-amber-700">{cert.certificateNo}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        cert.type === 'CHARACTER'
                          ? 'bg-emerald-100 text-emerald-800'
                          : cert.type === 'BONAFIDE'
                          ? 'bg-blue-100 text-blue-800'
                          : cert.type === 'TRANSFER'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {cert.type}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-slate-900">{cert.recipientName}</td>
                  <td className="p-3.5 text-slate-600 font-medium">
                    {cert.className || cert.relievingDesignation || 'Member'}
                  </td>
                  <td className="p-3.5 text-slate-600 max-w-xs truncate">{cert.reason}</td>
                  <td className="p-3.5 font-mono text-slate-500">{cert.issueDate}</td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() =>
                        openPrintModal({
                          type: 'CERTIFICATE',
                          data: cert
                        })
                      }
                      className="px-3 py-1.5 text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-md transition-colors flex items-center space-x-1.5 ml-auto"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Certificate</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue Certificate Modal */}
      {showIssueModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Issue Institutional Certificate</h3>
              <button onClick={() => setShowIssueModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleIssueCertificate} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Certificate Template</label>
                <select
                  value={newCert.type}
                  onChange={e => {
                    const t = e.target.value as any;
                    setNewCert({
                      ...newCert,
                      type: t,
                      reason:
                        t === 'CHARACTER'
                          ? 'Scholastic excellence and civic ambassadorship'
                          : t === 'BONAFIDE'
                          ? 'Passport & Visa Documentation Verification'
                          : t === 'TRANSFER'
                          ? 'Transfer to overseas preparatory school'
                          : 'Service verification and relieving certificate'
                    });
                  }}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-bold"
                >
                  <option value="CHARACTER">Character Certificate</option>
                  <option value="BONAFIDE">Bonafide Student Certificate</option>
                  <option value="TRANSFER">School Transfer Certificate (TC)</option>
                  <option value="EXPERIENCE">Employee Experience / Relieving Certificate</option>
                </select>
              </div>

              {newCert.type === 'EXPERIENCE' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Employee</label>
                  <select
                    onChange={e => {
                      const emp = employees.find(em => em.id === e.target.value);
                      if (emp) {
                        setNewCert({
                          ...newCert,
                          recipientId: emp.id,
                          recipientName: `${emp.firstName} ${emp.lastName}`,
                          relievingDesignation: emp.designation,
                          className: ''
                        });
                      }
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  >
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.firstName} {emp.lastName} ({emp.designation})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Enrolled Student</label>
                  <select
                    onChange={e => {
                      const st = students.find(s => s.id === e.target.value);
                      if (st) {
                        setNewCert({
                          ...newCert,
                          recipientId: st.id,
                          recipientName: `${st.firstName} ${st.lastName}`,
                          className: st.className
                        });
                      }
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  >
                    {students.map(st => (
                      <option key={st.id} value={st.id}>
                        {st.firstName} {st.lastName} ({st.className}) - {st.admissionNo}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Official Purpose / Reason</label>
                <input
                  type="text"
                  value={newCert.reason}
                  onChange={e => setNewCert({ ...newCert, reason: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Conduct & Character Remarks
                </label>
                <textarea
                  rows={3}
                  value={newCert.academicConduct}
                  onChange={e => setNewCert({ ...newCert, academicConduct: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowIssueModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-sm"
                >
                  Generate & Print
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
