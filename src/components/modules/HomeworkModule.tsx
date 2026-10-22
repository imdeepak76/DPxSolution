import React, { useState } from 'react';
import {
  BookMarked,
  Plus,
  Calendar,
  CheckCircle2,
  Paperclip,
  UserCheck,
  Search,
  X
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

export const HomeworkModule: React.FC = () => {
  const { homework, addHomework, classes, subjects, employees } = useSchool();
  const [showAddModal, setShowAddModal] = useState(false);

  const [newHw, setNewHw] = useState({
    title: '',
    className: 'Grade 10',
    section: 'A',
    subject: 'Pure Mathematics',
    dueDate: '2026-10-28',
    description: '',
    assignedBy: 'Emily Watson',
    totalStudents: 58
  });

  const handleCreateHw = (e: React.FormEvent) => {
    e.preventDefault();
    addHomework({
      title: newHw.title,
      className: newHw.className,
      section: newHw.section,
      subject: newHw.subject,
      dueDate: newHw.dueDate,
      description: newHw.description,
      assignedBy: newHw.assignedBy,
      totalStudents: Number(newHw.totalStudents)
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <span>Module 12</span>
            <span>•</span>
            <span>Curricular Engagements</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Digital Homework & Assignments</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Publish digital homework tasks, monitor turn-in rates, set deadlines, and attach learning resources.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Assign New Homework</span>
        </button>
      </div>

      {/* Homework Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {homework.map(hw => {
          const submissionPct = Math.round((hw.submissionCount / hw.totalStudents) * 100);
          return (
            <div
              key={hw.id}
              className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-3.5"
            >
              <div className="flex items-start justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">
                  {hw.subject}
                </span>
                <span className="text-[11px] font-mono text-slate-500 flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>Due: {hw.dueDate}</span>
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm">{hw.title}</h4>
                <p className="text-xs text-slate-600 mt-1 line-clamp-3">{hw.description}</p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Submission Progress</span>
                  <span className="font-mono font-bold text-slate-900">
                    {hw.submissionCount} / {hw.totalStudents} ({submissionPct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-1.5 rounded-full transition-all"
                    style={{ width: `${submissionPct}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>By: {hw.assignedBy}</span>
                <span className="font-semibold text-indigo-600">{hw.className}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Homework Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Assign Digital Homework</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateHw} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Homework Title</label>
                <input
                  type="text"
                  placeholder="e.g. Chapter 6 Problem Set & Concept Proofs"
                  value={newHw.title}
                  onChange={e => setNewHw({ ...newHw, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Class</label>
                  <select
                    value={newHw.className}
                    onChange={e => setNewHw({ ...newHw, className: e.target.value })}
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                  <select
                    value={newHw.subject}
                    onChange={e => setNewHw({ ...newHw, subject: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  >
                    {subjects.map(s => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newHw.dueDate}
                    onChange={e => setNewHw({ ...newHw, dueDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Teacher</label>
                  <input
                    type="text"
                    value={newHw.assignedBy}
                    onChange={e => setNewHw({ ...newHw, assignedBy: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Instructions & Guidelines
                </label>
                <textarea
                  rows={3}
                  value={newHw.description}
                  onChange={e => setNewHw({ ...newHw, description: e.target.value })}
                  placeholder="Detail the expected deliverables, reading materials, or problem ranges..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  required
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
                  Dispatch to Students
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
