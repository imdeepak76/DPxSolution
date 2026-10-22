import React, { useState } from 'react';
import {
  Award,
  Plus,
  ThumbsUp,
  ThumbsDown,
  Search,
  CheckCircle2,
  X,
  AlertTriangle
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { BehaviourLog } from '../../types';

export const BehaviourModule: React.FC = () => {
  const { behaviourLogs, addBehaviourLog, students } = useSchool();
  const [showAddModal, setShowAddModal] = useState(false);

  const [newLog, setNewLog] = useState({
    studentId: students[0]?.id || '',
    type: 'MERIT' as BehaviourLog['type'],
    category: 'ACADEMIC_EXCELLENCE' as BehaviourLog['category'],
    points: 10,
    description: '',
    recordedBy: 'Sarah Jenkins'
  });

  const handleCreateLog = (e: React.FormEvent) => {
    e.preventDefault();
    const targetStudent = students.find(s => s.id === newLog.studentId);
    if (!targetStudent) return;

    addBehaviourLog({
      studentId: targetStudent.id,
      studentName: `${targetStudent.firstName} ${targetStudent.lastName}`,
      className: targetStudent.className,
      type: newLog.type,
      category: newLog.category,
      points: Number(newLog.points),
      date: new Date().toISOString().split('T')[0],
      description: newLog.description,
      recordedBy: newLog.recordedBy
    });
    setShowAddModal(false);
  };

  const totalMerits = behaviourLogs.filter(b => b.type === 'MERIT').reduce((s, b) => s + b.points, 0);
  const totalDemerits = behaviourLogs.filter(b => b.type === 'DEMERIT').reduce((s, b) => s + Math.abs(b.points), 0);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <span>Module 13</span>
            <span>•</span>
            <span>Student Character & Skills</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Behaviour, Merits & Demerits</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Log student conduct, track house points, honor roll commendations, and remedial behavioral interventions.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Record Conduct Entry</span>
        </button>
      </div>

      {/* KPI stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase">Commendation Merits Awarded</span>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">+{totalMerits} Points</p>
            <span className="text-[11px] text-slate-400">Olympiad, leadership, sports honor</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ThumbsUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase">Disciplinary Demerits Logged</span>
            <p className="text-2xl font-extrabold text-rose-600 mt-1">-{totalDemerits} Points</p>
            <span className="text-[11px] text-slate-400">Tardiness, conduct warnings</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <ThumbsDown className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Behaviour Records Feed */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs divide-y divide-slate-100">
        {behaviourLogs.map(log => (
          <div key={log.id} className="p-4 flex items-start justify-between gap-4">
            <div className="flex items-start space-x-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  log.type === 'MERIT'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
              >
                {log.type === 'MERIT' ? <ThumbsUp className="w-4 h-4" /> : <ThumbsDown className="w-4 h-4" />}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900 text-xs">{log.studentName}</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                    {log.className}
                  </span>
                  <span
                    className={`font-mono text-[10px] font-bold ${
                      log.type === 'MERIT' ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {log.points > 0 ? `+${log.points}` : log.points} Points
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">{log.description}</p>
                <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-1">
                  <span>Category: {log.category.replace('_', ' ')}</span>
                  <span>•</span>
                  <span>Reported By: {log.recordedBy}</span>
                </div>
              </div>
            </div>
            <span className="font-mono text-[11px] text-slate-400 shrink-0">{log.date}</span>
          </div>
        ))}
      </div>

      {/* Add Conduct Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Record Student Conduct Log</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateLog} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Student</label>
                <select
                  value={newLog.studentId}
                  onChange={e => setNewLog({ ...newLog, studentId: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.firstName} {s.lastName} ({s.className})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Log Type</label>
                  <select
                    value={newLog.type}
                    onChange={e => {
                      const t = e.target.value as any;
                      setNewLog({
                        ...newLog,
                        type: t,
                        points: t === 'MERIT' ? 10 : -5
                      });
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-bold"
                  >
                    <option value="MERIT">Merit Commendation (+)</option>
                    <option value="DEMERIT">Demerit Violation (-)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Points Impact</label>
                  <input
                    type="number"
                    value={newLog.points}
                    onChange={e => setNewLog({ ...newLog, points: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-bold font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={newLog.category}
                  onChange={e => setNewLog({ ...newLog, category: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                >
                  <option value="ACADEMIC_EXCELLENCE">Academic Excellence</option>
                  <option value="LEADERSHIP">Civic & Community Leadership</option>
                  <option value="SPORTS">Sportsmanship & Athletics</option>
                  <option value="DISCIPLINE">General Classroom Discipline</option>
                  <option value="PUNCTUALITY">Tardiness / Punctuality</option>
                  <option value="MISCONDUCT">Conduct Infraction</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Observation Details</label>
                <textarea
                  rows={3}
                  value={newLog.description}
                  onChange={e => setNewLog({ ...newLog, description: e.target.value })}
                  placeholder="Specific event description and faculty feedback..."
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
                  Record Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
