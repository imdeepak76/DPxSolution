import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  UserCheck,
  CheckCircle2,
  X,
  Layers,
  GraduationCap
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { Subject } from '../../types';

export const SubjectsModule: React.FC = () => {
  const { subjects, addSubject, employees, classes } = useSchool();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newSub, setNewSub] = useState({
    code: '',
    name: '',
    type: 'THEORY' as Subject['type'],
    credits: 4,
    teacherName: 'Emily Watson',
    classIds: ['c-10', 'c-11']
  });

  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    addSubject({
      code: newSub.code,
      name: newSub.name,
      type: newSub.type,
      credits: Number(newSub.credits),
      teacherName: newSub.teacherName,
      classIds: newSub.classIds
    });
    setShowAddModal(false);
    setNewSub({
      code: '',
      name: '',
      type: 'THEORY',
      credits: 4,
      teacherName: 'Emily Watson',
      classIds: ['c-10', 'c-11']
    });
  };

  const filtered = subjects.filter(
    s =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.teacherName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <span>Module 04</span>
            <span>•</span>
            <span>Curriculum & Pedagogy</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Subject Catalog & Allocation</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Maintain academic courses, credit units, theory vs practical classifications, and teacher allocations.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Subject</span>
        </button>
      </div>

      {/* Search & Counter */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search subject code, title, or assigned faculty..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">
          {filtered.length} Subjects Configured
        </span>
      </div>

      {/* Table of Subjects */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3.5">Course Code</th>
                <th className="p-3.5">Subject Title</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Credits</th>
                <th className="p-3.5">Assigned Faculty</th>
                <th className="p-3.5">Assigned Classes</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(sub => (
                <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-indigo-700">{sub.code}</td>
                  <td className="p-3.5 font-semibold text-slate-900">{sub.name}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        sub.type === 'PRACTICAL'
                          ? 'bg-amber-100 text-amber-800'
                          : sub.type === 'BOTH'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {sub.type}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-slate-800">{sub.credits} Credits</td>
                  <td className="p-3.5">
                    <div className="flex items-center space-x-1.5 text-slate-700">
                      <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{sub.teacherName || 'Unassigned'}</span>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span className="text-slate-500 font-medium">
                      {sub.classIds.length} Grade Levels
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Subject Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Add New Subject</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubject} className="mt-4 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject Code</label>
                  <input
                    type="text"
                    placeholder="e.g. BIO-305"
                    value={newSub.code}
                    onChange={e => setNewSub({ ...newSub, code: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Credits</label>
                  <input
                    type="number"
                    value={newSub.credits}
                    onChange={e => setNewSub({ ...newSub, credits: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject Title</label>
                <input
                  type="text"
                  placeholder="e.g. Biotechnology & Microbiology"
                  value={newSub.name}
                  onChange={e => setNewSub({ ...newSub, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pedagogy Type</label>
                  <select
                    value={newSub.type}
                    onChange={e => setNewSub({ ...newSub, type: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  >
                    <option value="THEORY">Theory Only</option>
                    <option value="PRACTICAL">Practical Only</option>
                    <option value="BOTH">Theory + Practical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Teacher</label>
                  <select
                    value={newSub.teacherName}
                    onChange={e => setNewSub({ ...newSub, teacherName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  >
                    {employees.map(emp => (
                      <option key={emp.id} value={`${emp.firstName} ${emp.lastName}`}>
                        {emp.firstName} {emp.lastName}
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
                  Save Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
