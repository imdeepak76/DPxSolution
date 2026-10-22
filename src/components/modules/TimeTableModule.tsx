import React, { useState } from 'react';
import {
  Clock,
  Plus,
  Calendar,
  School,
  UserCheck,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

export const TimeTableModule: React.FC = () => {
  const { timetable, classes } = useSchool();
  const [selectedClass, setSelectedClass] = useState('Grade 10');
  const [selectedDay, setSelectedDay] = useState('ALL');

  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

  const filteredSlots = timetable.filter(
    t => t.className === selectedClass && (selectedDay === 'ALL' || t.day === selectedDay)
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <span>Module 11</span>
            <span>•</span>
            <span>Academic Scheduling</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Class Timetable Matrix</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Dynamic period schedule matrix by class, section, assigned faculty, and room allocation.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
            className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-bold text-indigo-700"
          >
            {classes.map(c => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Day Selector */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedDay('ALL')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
            selectedDay === 'ALL'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Days (Weekly Matrix)
        </button>
        {days.map(d => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              selectedDay === d
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Timetable Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSlots.map(slot => (
          <div
            key={slot.id}
            className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 font-mono">
                Period {slot.period} · {slot.day}
              </span>
              <span className="text-[11px] font-mono font-bold text-slate-500">
                {slot.startTime} - {slot.endTime}
              </span>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm">{slot.subjectName}</h4>
              <p className="text-xs text-slate-500">{slot.className} ({slot.section})</p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center space-x-1">
                <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span className="truncate">{slot.teacherName}</span>
              </span>
              <span className="flex items-center space-x-1 font-mono text-slate-500">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{slot.roomNo}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
