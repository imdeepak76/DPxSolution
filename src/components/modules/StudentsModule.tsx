import React, { useState } from 'react';
import {
  GraduationCap,
  Plus,
  Search,
  Filter,
  CreditCard,
  FileText,
  UserCheck,
  UserX,
  Printer,
  ChevronRight,
  ArrowRight,
  Phone,
  Mail,
  Home,
  CheckCircle2,
  X,
  Sparkles,
  Users
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { Student } from '../../types';

export const StudentsModule: React.FC = () => {
  const {
    students,
    addStudent,
    updateStudentStatus,
    classes,
    openPrintModal
  } = useSchool();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Modal states
  const [showAddWizard, setShowAddWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [promotionFromClass, setPromotionFromClass] = useState('Grade 9');
  const [promotionToClass, setPromotionToClass] = useState('Grade 10');
  const [promotedSuccess, setPromotedSuccess] = useState(false);

  // Form State for Multi-step Student Intake
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    gender: 'MALE' as Student['gender'],
    dob: '2011-05-12',
    bloodGroup: 'B+',
    rollNo: '10-A-20',
    className: 'Grade 10',
    section: 'A',
    classId: 'c-10',
    guardianName: '',
    guardianRelation: 'Father',
    guardianPhone: '',
    guardianEmail: '',
    address: '',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    scholarshipPercentage: 0,
    totalFeeAssessed: 5500
  });

  const handleFinishAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const created = addStudent({
      firstName: newStudent.firstName,
      lastName: newStudent.lastName,
      gender: newStudent.gender,
      dob: newStudent.dob,
      bloodGroup: newStudent.bloodGroup,
      rollNo: newStudent.rollNo,
      className: newStudent.className,
      section: newStudent.section,
      classId: newStudent.classId,
      guardianName: newStudent.guardianName,
      guardianRelation: newStudent.guardianRelation,
      guardianPhone: newStudent.guardianPhone,
      guardianEmail: newStudent.guardianEmail,
      address: newStudent.address,
      status: 'ACTIVE',
      admissionDate: new Date().toISOString().split('T')[0],
      photoUrl: newStudent.photoUrl,
      totalFeeAssessed: newStudent.totalFeeAssessed,
      totalFeePaid: 0,
      scholarshipPercentage: Number(newStudent.scholarshipPercentage)
    });

    setShowAddWizard(false);
    setWizardStep(1);
    // Optionally open admission letter print modal
    openPrintModal({
      type: 'ADMISSION_LETTER',
      data: created
    });
  };

  const handleExecutePromotion = () => {
    setPromotedSuccess(true);
    setTimeout(() => {
      setPromotedSuccess(false);
      setShowPromotionModal(false);
    }, 2000);
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch =
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.guardianName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'ALL' || s.className === selectedClass;
    const matchesStatus = selectedStatus === 'ALL' || s.status === selectedStatus;
    return matchesSearch && matchesClass && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Title & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <span>Module 05</span>
            <span>•</span>
            <span>Learner Lifecycle & Admissions</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Students Directory & Lifecycle</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Multi-step admissions, printable ID cards, admission letters, family linkages, and academic promotion.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowPromotionModal(true)}
            className="flex items-center space-x-1.5 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold border border-indigo-200 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bulk Promotion</span>
          </button>
          <button
            onClick={() => setShowAddWizard(true)}
            className="flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Student</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search student by name, admission no, roll or guardian..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Class Filter */}
          <select
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
            className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 font-medium"
          >
            <option value="ALL">All Classes</option>
            {classes.map(c => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 font-medium"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="TRANSFERRED">Transferred</option>
          </select>
        </div>
      </div>

      {/* Students Directory Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3.5">Admission / Roll</th>
                <th className="p-3.5">Student Profile</th>
                <th className="p-3.5">Class & Section</th>
                <th className="p-3.5">Guardian & Contact</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Fee Clearance</th>
                <th className="p-3.5 text-right">Quick Print & Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map(student => {
                const feeCleared = student.totalFeePaid >= student.totalFeeAssessed;
                return (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    {/* Admission & Roll */}
                    <td className="p-3.5">
                      <div className="font-mono font-bold text-indigo-700 text-xs">
                        {student.admissionNo}
                      </div>
                      <div className="font-mono text-[11px] text-slate-500">
                        Roll: {student.rollNo}
                      </div>
                    </td>

                    {/* Student Info */}
                    <td className="p-3.5">
                      <div className="flex items-center space-x-3">
                        <img
                          src={student.photoUrl}
                          alt={student.firstName}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <div className="font-bold text-slate-900 text-xs">
                            {student.firstName} {student.lastName}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            DOB: {student.dob} · Blood: {student.bloodGroup}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Class & Section */}
                    <td className="p-3.5">
                      <span className="font-semibold text-slate-800">{student.className}</span>
                      <span className="ml-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold text-[10px]">
                        Sec {student.section}
                      </span>
                    </td>

                    {/* Guardian & Contact */}
                    <td className="p-3.5">
                      <div className="font-medium text-slate-800">
                        {student.guardianName} ({student.guardianRelation})
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {student.guardianPhone}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-3.5">
                      <button
                        onClick={() =>
                          updateStudentStatus(
                            student.id,
                            student.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
                          )
                        }
                        className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                          student.status === 'ACTIVE'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        title="Click to toggle Active/Inactive"
                      >
                        {student.status}
                      </button>
                    </td>

                    {/* Fee Status */}
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          feeCleared
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {feeCleared ? 'Fully Paid' : `$${student.totalFeePaid} Paid`}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="p-3.5 text-right space-x-1">
                      {/* ID Card Print */}
                      <button
                        onClick={() =>
                          openPrintModal({
                            type: 'STUDENT_ID',
                            data: student
                          })
                        }
                        className="p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded"
                        title="Print Student ID Card"
                      >
                        <CreditCard className="w-4 h-4 inline" />
                      </button>

                      {/* Admission Letter Print */}
                      <button
                        onClick={() =>
                          openPrintModal({
                            type: 'ADMISSION_LETTER',
                            data: student
                          })
                        }
                        className="p-1.5 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded"
                        title="Print Admission Letter"
                      >
                        <FileText className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Multi-step Add Student Modal */}
      {showAddWizard && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Add New Student (Step {wizardStep} of 3)
                </h3>
                <p className="text-xs text-slate-500">
                  {wizardStep === 1
                    ? 'Personal & Demographic Details'
                    : wizardStep === 2
                    ? 'Class Allocation & Academic Structure'
                    : 'Guardian Information & Address'}
                </p>
              </div>
              <button
                onClick={() => setShowAddWizard(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Stepper Progress Bar */}
            <div className="flex items-center space-x-2 my-4">
              <div
                className={`flex-1 h-1.5 rounded-full ${
                  wizardStep >= 1 ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
              />
              <div
                className={`flex-1 h-1.5 rounded-full ${
                  wizardStep >= 2 ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
              />
              <div
                className={`flex-1 h-1.5 rounded-full ${
                  wizardStep === 3 ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
              />
            </div>

            {/* Step 1: Personal Details */}
            {wizardStep === 1 && (
              <div className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">First Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Liam"
                      value={newStudent.firstName}
                      onChange={e => setNewStudent({ ...newStudent, firstName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Kensington"
                      value={newStudent.lastName}
                      onChange={e => setNewStudent({ ...newStudent, lastName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                    <select
                      value={newStudent.gender}
                      onChange={e => setNewStudent({ ...newStudent, gender: e.target.value as any })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    >
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={newStudent.dob}
                      onChange={e => setNewStudent({ ...newStudent, dob: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Blood Group</label>
                    <select
                      value={newStudent.bloodGroup}
                      onChange={e => setNewStudent({ ...newStudent, bloodGroup: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Photo Avatar URL</label>
                  <input
                    type="url"
                    value={newStudent.photoUrl}
                    onChange={e => setNewStudent({ ...newStudent, photoUrl: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono text-[11px]"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    disabled={!newStudent.firstName || !newStudent.lastName}
                    onClick={() => setWizardStep(2)}
                    className="flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold disabled:opacity-50"
                  >
                    <span>Proceed to Class Allocation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Academic Info */}
            {wizardStep === 2 && (
              <div className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Enrolling Class</label>
                    <select
                      value={newStudent.className}
                      onChange={e => {
                        const targetCls = classes.find(c => c.name === e.target.value);
                        setNewStudent({
                          ...newStudent,
                          className: e.target.value,
                          classId: targetCls?.id || 'c-1',
                          totalFeeAssessed: (targetCls?.monthlyFee || 400) * 10
                        });
                      }}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    >
                      {classes.map(c => (
                        <option key={c.id} value={c.name}>
                          {c.name} (${c.monthlyFee}/mo)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Section</label>
                    <select
                      value={newStudent.section}
                      onChange={e => setNewStudent({ ...newStudent, section: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    >
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                      <option value="C">Section C</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Roll Number</label>
                    <input
                      type="text"
                      placeholder="e.g. 10-A-25"
                      value={newStudent.rollNo}
                      onChange={e => setNewStudent({ ...newStudent, rollNo: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Scholarship Discount (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newStudent.scholarshipPercentage}
                      onChange={e =>
                        setNewStudent({ ...newStudent, scholarshipPercentage: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setWizardStep(1)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setWizardStep(3)}
                    className="flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold"
                  >
                    <span>Proceed to Guardian Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Guardian Details */}
            {wizardStep === 3 && (
              <form onSubmit={handleFinishAddStudent} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Guardian Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Robert Kensington"
                      value={newStudent.guardianName}
                      onChange={e => setNewStudent({ ...newStudent, guardianName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Relationship</label>
                    <select
                      value={newStudent.guardianRelation}
                      onChange={e => setNewStudent({ ...newStudent, guardianRelation: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    >
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Legal Guardian">Legal Guardian</option>
                      <option value="Sibling">Sibling</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Guardian Mobile Phone</label>
                    <input
                      type="text"
                      placeholder="+1 (555) 000-0000"
                      value={newStudent.guardianPhone}
                      onChange={e => setNewStudent({ ...newStudent, guardianPhone: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Guardian Email</label>
                    <input
                      type="email"
                      placeholder="guardian@example.com"
                      value={newStudent.guardianEmail}
                      onChange={e => setNewStudent({ ...newStudent, guardianEmail: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Residential Address</label>
                  <input
                    type="text"
                    placeholder="e.g. 500 Silicon Vista Blvd, San Jose, CA"
                    value={newStudent.address}
                    onChange={e => setNewStudent({ ...newStudent, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setWizardStep(2)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-md"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complete Admission & Print Letter</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Bulk Promotion Modal */}
      {showPromotionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Bulk Student Academic Promotion</h3>
              <button
                onClick={() => setShowPromotionModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <p className="text-xs text-slate-600">
                Promote all eligible students in the source grade level to the subsequent academic session based on annual result clearance.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">From Grade</label>
                  <select
                    value={promotionFromClass}
                    onChange={e => setPromotionFromClass(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Promote To Grade</label>
                  <select
                    value={promotionToClass}
                    onChange={e => setPromotionToClass(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {promotedSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-bold flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>58 Students Successfully Promoted to {promotionToClass}!</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  onClick={() => setShowPromotionModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExecutePromotion}
                  className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm"
                >
                  Execute Promotion
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
