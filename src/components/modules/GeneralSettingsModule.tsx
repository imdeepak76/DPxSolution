import React, { useState } from 'react';
import {
  Building2,
  DollarSign,
  Award,
  Globe,
  Save,
  CheckCircle2,
  Database,
  Layers,
  FileText,
  Sliders
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

export const GeneralSettingsModule: React.FC = () => {
  const {
    institute,
    setInstitute,
    isRTL,
    setIsRTL,
    setIsArchitectureModalOpen
  } = useSchool();

  const [activeTab, setActiveTab] = useState<
    'profile' | 'fees' | 'grading' | 'theme' | 'rules'
  >('profile');

  const [formData, setFormData] = useState({ ...institute });
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setInstitute(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const feeParticulars = [
    { code: 'FP-01', name: 'Monthly Tuition Fee', category: 'Academic', refundable: false, defaultAmount: 450 },
    { code: 'FP-02', name: 'Computer & AI Laboratory Fund', category: 'Technology', refundable: false, defaultAmount: 50 },
    { code: 'FP-03', name: 'Sports & Gymnasium Assessment', category: 'Activities', refundable: false, defaultAmount: 40 },
    { code: 'FP-04', name: 'Annual Examination Fee', category: 'Assessment', refundable: false, defaultAmount: 120 },
    { code: 'FP-05', name: 'Bus Transportation (Zone 1-4)', category: 'Transport', refundable: false, defaultAmount: 90 },
    { code: 'FP-06', name: 'Refundable Security Deposit', category: 'Admission', refundable: true, defaultAmount: 500 }
  ];

  const gradingScales = [
    { grade: 'A+', minScore: 90, maxScore: 100, gpa: 4.0, description: 'Outstanding / First Class Distinction' },
    { grade: 'A', minScore: 80, maxScore: 89, gpa: 3.7, description: 'Excellent Performance' },
    { grade: 'B+', minScore: 70, maxScore: 79, gpa: 3.3, description: 'Very Good' },
    { grade: 'B', minScore: 60, maxScore: 69, gpa: 3.0, description: 'Good / Above Average' },
    { grade: 'C', minScore: 50, maxScore: 59, gpa: 2.0, description: 'Average / Satisfactory' },
    { grade: 'D', minScore: 40, maxScore: 49, gpa: 1.0, description: 'Pass' },
    { grade: 'F', minScore: 0, maxScore: 39, gpa: 0.0, description: 'Fail / Remedial Required' }
  ];

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <span>Module 02</span>
            <span>•</span>
            <span>Configuration ERP</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">General Settings & Institute Profile</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Configure institute profile, fee particulars, grading scales, multi-lingual direction, and system schemas.
          </p>
        </div>

        <button
          onClick={() => setIsArchitectureModalOpen(true)}
          className="flex items-center space-x-2 px-3.5 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-xs font-bold border border-indigo-200 transition-colors"
        >
          <Database className="w-4 h-4" />
          <span>Inspect Prisma Schema</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {[
          { key: 'profile', label: 'Institute Profile', icon: Building2 },
          { key: 'fees', label: 'Fee Particulars & Rules', icon: DollarSign },
          { key: 'grading', label: 'Grading Scales (GPA & %)', icon: Award },
          { key: 'theme', label: 'Theme & RTL / LTR', icon: Globe },
          { key: 'rules', label: 'Academic Rules & Policies', icon: FileText }
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

      {/* Tab 1: Institute Profile */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Institute Profile & Campus Accreditation</h3>
            {isSaved && (
              <span className="flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                <CheckCircle2 className="w-4 h-4" />
                <span>Profile Saved Successfully</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Institution Legal Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Campus / Branch Name</label>
              <input
                type="text"
                value={formData.branchName}
                onChange={e => setFormData({ ...formData, branchName: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Institute Code</label>
              <input
                type="text"
                value={formData.code}
                onChange={e => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Affiliation / Accreditation No.</label>
              <input
                type="text"
                value={formData.affiliationNumber}
                onChange={e => setFormData({ ...formData, affiliationNumber: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Administrative Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Official Telephone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Physical Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Active Academic Session</label>
              <input
                type="text"
                value={formData.academicYear}
                onChange={e => setFormData({ ...formData, academicYear: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Current Academic Term</label>
              <input
                type="text"
                value={formData.currentTerm}
                onChange={e => setFormData({ ...formData, currentTerm: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Currency Code & Symbol</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.currency}
                  onChange={e => setFormData({ ...formData, currency: e.target.value })}
                  className="w-1/2 px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  placeholder="USD"
                />
                <input
                  type="text"
                  value={formData.currencySymbol}
                  onChange={e => setFormData({ ...formData, currencySymbol: e.target.value })}
                  className="w-1/2 px-3 py-2 text-xs border border-slate-300 rounded-lg font-bold"
                  placeholder="$"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Institutional Motto / Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-md transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Update Institute Profile</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Fee Particulars */}
      {activeTab === 'fees' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Standard Fee Particulars & Ledger Heads</h3>
              <p className="text-xs text-slate-500">Components billed across automated monthly student fee invoices</p>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded">
              6 Active Particulars
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Particular Code</th>
                  <th className="p-3">Particular Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Default Base</th>
                  <th className="p-3">Type</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {feeParticulars.map(p => (
                  <tr key={p.code} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-semibold text-indigo-600">{p.code}</td>
                    <td className="p-3 font-semibold text-slate-900">{p.name}</td>
                    <td className="p-3 text-slate-600">{p.category}</td>
                    <td className="p-3 font-mono font-bold text-slate-900">${p.defaultAmount}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.refundable ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {p.refundable ? 'Refundable Deposit' : 'Non-Refundable'}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Grading Scales */}
      {activeTab === 'grading' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Marks Grading Scale & GPA Conversion Schema</h3>
              <p className="text-xs text-slate-500">Configured 4.0 GPA benchmark scale for examination result cards</p>
            </div>
            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded">
              Standard 7-Tier Scale
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Grade</th>
                  <th className="p-3">Score Range (%)</th>
                  <th className="p-3">GPA Equivalent</th>
                  <th className="p-3">Academic Classification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {gradingScales.map(g => (
                  <tr key={g.grade} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-indigo-700 text-sm">{g.grade}</td>
                    <td className="p-3 font-mono font-semibold">{g.minScore}% - {g.maxScore}%</td>
                    <td className="p-3 font-mono font-bold text-slate-900">{g.gpa.toFixed(1)} / 4.0</td>
                    <td className="p-3 text-slate-600">{g.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Theme & RTL/LTR */}
      {activeTab === 'theme' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Layout Direction & Multilingual Settings</h3>
            <p className="text-xs text-slate-500">Support for Right-to-Left (Arabic, Urdu, Hebrew) and Left-to-Right interfaces</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setIsRTL(false)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                !isRTL ? 'border-indigo-600 bg-indigo-50/40 shadow-xs' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-slate-900">Left-to-Right (LTR)</span>
                {!isRTL && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Default direction for English, Spanish, French, Hindi, and Western typography scripts.
              </p>
            </div>

            <div
              onClick={() => setIsRTL(true)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                isRTL ? 'border-indigo-600 bg-indigo-50/40 shadow-xs' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-slate-900">Right-to-Left (RTL)</span>
                {isRTL && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Flips layout horizontally for Arabic, Urdu, Persian, and Hebrew script support.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Academic Rules & Policies */}
      {activeTab === 'rules' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Academic & Financial Automation Rules</h3>
          <div className="space-y-3 text-xs text-slate-600">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start space-x-3">
              <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
                1
              </div>
              <div>
                <p className="font-bold text-slate-800">Automated Late Fee Surcharge</p>
                <p className="text-slate-500 mt-0.5">
                  Applied automatically to fee invoices unpaid by the 10th of each calendar month at a fixed rate of $25 per invoice.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start space-x-3">
              <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
                2
              </div>
              <div>
                <p className="font-bold text-slate-800">Minimum Exam Eligibility Attendance Threshold</p>
                <p className="text-slate-500 mt-0.5">
                  Students must maintain at least 75.0% cumulative attendance to receive examination hall tickets and result clearance.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start space-x-3">
              <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
                3
              </div>
              <div>
                <p className="font-bold text-slate-800">Sibling Fee Concession Protocol</p>
                <p className="text-slate-500 mt-0.5">
                  Second enrolled sibling receives an automatic 10% discount on monthly tuition; third sibling receives 15%.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
