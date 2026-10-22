import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Filter,
  CreditCard,
  FileText,
  ShieldCheck,
  Mail,
  Phone,
  Briefcase,
  X,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { Employee, UserRole } from '../../types';

export const EmployeesModule: React.FC = () => {
  const { employees, addEmployee, openPrintModal } = useSchool();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRbacModal, setShowRbacModal] = useState(false);

  const [newEmp, setNewEmp] = useState({
    firstName: '',
    lastName: '',
    role: 'TEACHER' as UserRole,
    designation: 'Faculty in Sciences',
    department: 'Science & Robotics',
    email: '',
    phone: '',
    joiningDate: '2026-10-01',
    qualification: 'M.Sc. Physics, Columbia University',
    basicSalary: 4500,
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80'
  });

  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    addEmployee({
      firstName: newEmp.firstName,
      lastName: newEmp.lastName,
      role: newEmp.role,
      designation: newEmp.designation,
      department: newEmp.department,
      email: newEmp.email,
      phone: newEmp.phone,
      joiningDate: newEmp.joiningDate,
      qualification: newEmp.qualification,
      basicSalary: Number(newEmp.basicSalary),
      status: 'ACTIVE',
      photoUrl: newEmp.photoUrl
    });
    setShowAddModal(false);
  };

  const filteredEmployees = employees.filter(e => {
    const matchesSearch =
      `${e.firstName} ${e.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.employeeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || e.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <span>Module 06</span>
            <span>•</span>
            <span>Human Capital & Staff ERP</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Faculty & Staff Directory</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage teaching faculty, administrative personnel, staff ID badges, appointment letters, and RBAC matrix.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRbacModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-xs font-bold border border-purple-200 transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>RBAC Matrix</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Employee</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search employee by name, code, designation, or department..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 font-medium"
          >
            <option value="ALL">All Roles</option>
            <option value="SUPER_ADMIN">Super Admin</option>
            <option value="PRINCIPAL">Principal</option>
            <option value="ACCOUNTANT">Accountant</option>
            <option value="TEACHER">Teacher / Faculty</option>
            <option value="CLERK">Clerk / Registrar</option>
          </select>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3.5">Employee ID</th>
                <th className="p-3.5">Staff Profile</th>
                <th className="p-3.5">Designation & Department</th>
                <th className="p-3.5">Assigned Role</th>
                <th className="p-3.5">Basic Salary</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Quick Badges & Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map(emp => (
                <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-indigo-700">{emp.employeeCode}</td>
                  <td className="p-3.5">
                    <div className="flex items-center space-x-3">
                      <img
                        src={emp.photoUrl}
                        alt={emp.firstName}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <p className="font-bold text-slate-900 text-xs">
                          {emp.firstName} {emp.lastName}
                        </p>
                        <p className="text-[11px] text-slate-500 font-mono">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <p className="font-semibold text-slate-800">{emp.designation}</p>
                    <p className="text-[11px] text-slate-500">{emp.department}</p>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                      {emp.role}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-slate-900">${emp.basicSalary}/mo</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right space-x-1">
                    <button
                      onClick={() =>
                        openPrintModal({
                          type: 'STAFF_ID',
                          data: emp
                        })
                      }
                      className="p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded"
                      title="Generate Official Staff ID Card"
                    >
                      <CreditCard className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() =>
                        openPrintModal({
                          type: 'CERTIFICATE',
                          data: {
                            type: 'EXPERIENCE',
                            recipientName: `${emp.firstName} ${emp.lastName}`,
                            certificateNo: `DPX-OFFER-${emp.employeeCode}`,
                            issueDate: emp.joiningDate,
                            reason: 'Official Appointment & Terms of Engagement',
                            academicConduct: `Appointed as ${emp.designation} in ${emp.department} with active RBAC privilege of ${emp.role}.`
                          }
                        })
                      }
                      className="p-1.5 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded"
                      title="Appointment Letter"
                    >
                      <FileText className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Add New Staff / Faculty Profile</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateEmployee} className="mt-4 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={newEmp.firstName}
                    onChange={e => setNewEmp({ ...newEmp, firstName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={newEmp.lastName}
                    onChange={e => setNewEmp({ ...newEmp, lastName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">System Role</label>
                  <select
                    value={newEmp.role}
                    onChange={e => setNewEmp({ ...newEmp, role: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  >
                    <option value="TEACHER">Teacher</option>
                    <option value="ACCOUNTANT">Accountant</option>
                    <option value="CLERK">Clerk</option>
                    <option value="PRINCIPAL">Principal</option>
                    <option value="SUPER_ADMIN">Super Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    value={newEmp.designation}
                    onChange={e => setNewEmp({ ...newEmp, designation: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={newEmp.department}
                    onChange={e => setNewEmp({ ...newEmp, department: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Basic ($)</label>
                  <input
                    type="number"
                    value={newEmp.basicSalary}
                    onChange={e => setNewEmp({ ...newEmp, basicSalary: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Staff Email</label>
                  <input
                    type="email"
                    value={newEmp.email}
                    onChange={e => setNewEmp({ ...newEmp, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone</label>
                  <input
                    type="text"
                    value={newEmp.phone}
                    onChange={e => setNewEmp({ ...newEmp, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>
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
                  Save Employee Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RBAC Permissions Modal */}
      {showRbacModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Role-Based Access Control (RBAC) Entitlements Matrix
                </h3>
              </div>
              <button onClick={() => setShowRbacModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 overflow-x-auto text-xs">
              <table className="w-full text-left border border-slate-200 rounded-lg">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 text-[11px]">
                  <tr>
                    <th className="p-3">Module / Capability</th>
                    <th className="p-3 text-center">Super Admin</th>
                    <th className="p-3 text-center">Principal</th>
                    <th className="p-3 text-center">Accountant</th>
                    <th className="p-3 text-center">Teacher</th>
                    <th className="p-3 text-center">Clerk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { mod: 'Fee Collection POS & Receipts', admin: 'Full', prin: 'Read', acc: 'Full', teach: 'None', clerk: 'Read' },
                    { mod: 'Salary & Payroll Disbursement', admin: 'Full', prin: 'Read', acc: 'Full', teach: 'None', clerk: 'None' },
                    { mod: 'Student Attendance Marking', admin: 'Full', prin: 'Full', acc: 'Read', teach: 'Full', clerk: 'Full' },
                    { mod: 'Exam Marks Entry & Results', admin: 'Full', prin: 'Full', acc: 'None', teach: 'Full', clerk: 'Read' },
                    { mod: 'Certificate Dynamic Generator', admin: 'Full', prin: 'Full', acc: 'Read', teach: 'None', clerk: 'Full' },
                    { mod: 'System Architecture & Schema', admin: 'Full', prin: 'Read', acc: 'None', teach: 'None', clerk: 'None' }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-800">{row.mod}</td>
                      <td className="p-3 text-center font-bold text-emerald-600">{row.admin}</td>
                      <td className="p-3 text-center font-semibold text-indigo-600">{row.prin}</td>
                      <td className="p-3 text-center font-bold text-blue-600">{row.acc}</td>
                      <td className="p-3 text-center font-medium text-slate-600">{row.teach}</td>
                      <td className="p-3 text-center font-medium text-slate-600">{row.clerk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowRbacModal(false)}
                className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm"
              >
                Close Matrix
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
