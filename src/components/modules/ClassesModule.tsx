import React, { useState } from 'react';
import {
  School,
  Plus,
  Users,
  UserCheck,
  DollarSign,
  Search,
  CheckCircle2,
  X
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

export const ClassesModule: React.FC = () => {
  const { classes, addClass, employees } = useSchool();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [newClass, setNewClass] = useState({
    name: '',
    numericGrade: 1,
    sections: 'A, B',
    capacity: 60,
    monthlyFee: 350,
    classTeacherName: 'Sarah Jenkins'
  });

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    addClass({
      name: newClass.name,
      numericGrade: Number(newClass.numericGrade),
      sections: newClass.sections.split(',').map(s => s.trim()),
      capacity: Number(newClass.capacity),
      enrolledStudents: 0,
      monthlyFee: Number(newClass.monthlyFee),
      classTeacherName: newClass.classTeacherName
    });
    setShowAddModal(false);
    setNewClass({
      name: '',
      numericGrade: 1,
      sections: 'A, B',
      capacity: 60,
      monthlyFee: 350,
      classTeacherName: 'Sarah Jenkins'
    });
  };

  const filtered = classes.filter(
    c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.sections.join(' ').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCapacity = classes.reduce((sum, c) => sum + c.capacity, 0);
  const totalEnrolled = classes.reduce((sum, c) => sum + c.enrolledStudents, 0);

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <span>Module 03</span>
            <span>•</span>
            <span>Academic Infrastructure</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Classes & Section Allocation</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Define grade levels, section distributions, classroom capacity, and assigned faculty mentors.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Class</span>
        </button>
      </div>

      {/* Summary KPI Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Total Classes</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{classes.length}</p>
          <span className="text-[11px] text-slate-400">Pre-K to Grade 12 Advanced</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Total Capacity vs Enrolled</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">
            {totalEnrolled} / {totalCapacity}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">
            {Math.round((totalEnrolled / totalCapacity) * 100)}% Capacity Occupancy
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Avg. Class Base Fee</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">
            ${Math.round(classes.reduce((sum, c) => sum + c.monthlyFee, 0) / classes.length)}
          </p>
          <span className="text-[11px] text-slate-400">Monthly Standard Tuition</span>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search class name or section..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">
          Showing {filtered.length} of {classes.length} Classes
        </span>
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(cls => {
          const occupancyPct = Math.round((cls.enrolledStudents / cls.capacity) * 100);
          return (
            <div
              key={cls.id}
              className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{cls.name}</h3>
                  <span className="text-xs text-slate-500 font-mono">Numeric Grade: {cls.numericGrade}</span>
                </div>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
                  ${cls.monthlyFee}/mo
                </span>
              </div>

              {/* Sections Pill List */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-500 font-medium">Sections:</span>
                <div className="flex gap-1.5">
                  {cls.sections.map(sec => (
                    <span
                      key={sec}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold text-xs"
                    >
                      Sec {sec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mentor / Class Teacher */}
              <div className="flex items-center space-x-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg">
                <UserCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                <span className="truncate">
                  Mentor: <strong>{cls.classTeacherName || 'Sarah Jenkins'}</strong>
                </span>
              </div>

              {/* Capacity Progress Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-600">Enrollment Strength</span>
                  <span className="font-mono text-slate-900 font-bold">
                    {cls.enrolledStudents} / {cls.capacity} ({occupancyPct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      occupancyPct >= 90 ? 'bg-amber-500' : 'bg-indigo-600'
                    }`}
                    style={{ width: `${occupancyPct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Add New Class & Sections</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Class Display Name</label>
                <input
                  type="text"
                  placeholder="e.g. Grade 11 (Commerce)"
                  value={newClass.name}
                  onChange={e => setNewClass({ ...newClass, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Numeric Grade</label>
                  <input
                    type="number"
                    value={newClass.numericGrade}
                    onChange={e => setNewClass({ ...newClass, numericGrade: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Max Capacity</label>
                  <input
                    type="number"
                    value={newClass.capacity}
                    onChange={e => setNewClass({ ...newClass, capacity: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Sections (Comma-Separated)
                </label>
                <input
                  type="text"
                  placeholder="A, B, C"
                  value={newClass.sections}
                  onChange={e => setNewClass({ ...newClass, sections: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Tuition ($)</label>
                  <input
                    type="number"
                    value={newClass.monthlyFee}
                    onChange={e => setNewClass({ ...newClass, monthlyFee: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Class Teacher</label>
                  <select
                    value={newClass.classTeacherName}
                    onChange={e => setNewClass({ ...newClass, classTeacherName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  >
                    {employees.map(emp => (
                      <option key={emp.id} value={`${emp.firstName} ${emp.lastName}`}>
                        {emp.firstName} {emp.lastName} ({emp.role})
                      </option>
                    ))}
                  </select>
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
                  Save Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
