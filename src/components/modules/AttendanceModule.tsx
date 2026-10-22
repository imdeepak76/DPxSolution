import React, { useState } from 'react';
import {
  CalendarCheck,
  Users,
  GraduationCap,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Save,
  Search,
  ChevronLeft,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { AttendanceStatus } from '../../types';

export const AttendanceModule: React.FC = () => {
  const { students, employees, classes } = useSchool();
  const [activeTab, setActiveTab] = useState<'students' | 'employees' | 'analytics'>('students');
  const [selectedClass, setSelectedClass] = useState<string>('Grade 10');
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Local state for today's interactive student attendance marking
  const [studentAttendance, setStudentAttendance] = useState<Record<string, AttendanceStatus>>({
    'stu-101': 'PRESENT',
    'stu-102': 'PRESENT',
    'stu-103': 'PRESENT',
    'stu-104': 'PRESENT',
    'stu-105': 'PRESENT',
    'stu-106': 'LATE',
    'stu-107': 'ABSENT'
  });

  // Local state for employee attendance
  const [employeeAttendance, setEmployeeAttendance] = useState<Record<string, AttendanceStatus>>({
    'emp-1': 'PRESENT',
    'emp-2': 'PRESENT',
    'emp-3': 'PRESENT',
    'emp-4': 'PRESENT',
    'emp-5': 'PRESENT',
    'emp-6': 'EXCUSED'
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleToggleStudent = (id: string, status: AttendanceStatus) => {
    setStudentAttendance(prev => ({ ...prev, [id]: status }));
  };

  const handleToggleEmployee = (id: string, status: AttendanceStatus) => {
    setEmployeeAttendance(prev => ({ ...prev, [id]: status }));
  };

  const handleSaveAttendance = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const classStudents = students.filter(s => s.className === selectedClass || selectedClass === 'ALL');

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <span>Module 10</span>
            <span>•</span>
            <span>Attendance & Biometrics</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Dual Attendance & Analytics</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Dual register for learners and staff members, daily punch marker, leave tracking, and class summaries.
          </p>
        </div>

        <button
          onClick={handleSaveAttendance}
          className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-md transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Register & Send Alerts</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('students')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'students'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Student Daily Attendance Marker</span>
        </button>

        <button
          onClick={() => setActiveTab('employees')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'employees'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Employee Daily Punch & Leaves</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'analytics'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Attendance Analytics & Trends</span>
        </button>
      </div>

      {isSaved && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Attendance register committed to database. Absentee SMS & WhatsApp hooks triggered.</span>
        </div>
      )}

      {/* TAB 1: STUDENT ATTENDANCE */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-bold text-slate-700">Class:</span>
              <select
                value={selectedClass}
                onChange={e => setSelectedClass(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-semibold"
              >
                <option value="ALL">All Classes</option>
                {classes.map(c => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-700">Register Date:</span>
              <input
                type="date"
                value={currentDate}
                onChange={e => setCurrentDate(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-mono"
              />
            </div>
          </div>

          {/* Student Register Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3.5">Roll No</th>
                    <th className="p-3.5">Student</th>
                    <th className="p-3.5">Class / Sec</th>
                    <th className="p-3.5">Current Status</th>
                    <th className="p-3.5 text-right">Quick Mark Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {classStudents.map(student => {
                    const status = studentAttendance[student.id] || 'PRESENT';
                    return (
                      <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-indigo-700">{student.rollNo}</td>
                        <td className="p-3.5">
                          <div className="flex items-center space-x-2.5">
                            <img
                              src={student.photoUrl}
                              alt=""
                              className="w-8 h-8 rounded-full object-cover border border-slate-200"
                            />
                            <div>
                              <span className="font-bold text-slate-900">
                                {student.firstName} {student.lastName}
                              </span>
                              <span className="block text-[11px] text-slate-400 font-mono">
                                {student.admissionNo}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5 text-slate-600 font-medium">
                          {student.className} ({student.section})
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              status === 'PRESENT'
                                ? 'bg-emerald-100 text-emerald-800'
                                : status === 'ABSENT'
                                ? 'bg-rose-100 text-rose-800'
                                : status === 'LATE'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-1">
                          {(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'] as const).map(s => (
                            <button
                              key={s}
                              onClick={() => handleToggleStudent(student.id, s)}
                              className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                                status === s
                                  ? s === 'PRESENT'
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : s === 'ABSENT'
                                    ? 'bg-rose-600 text-white shadow-xs'
                                    : s === 'LATE'
                                    ? 'bg-amber-600 text-white shadow-xs'
                                    : 'bg-blue-600 text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {s === 'PRESENT' ? 'P' : s === 'ABSENT' ? 'A' : s === 'LATE' ? 'L' : 'E'}
                            </button>
                          ))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EMPLOYEE ATTENDANCE */}
      {activeTab === 'employees' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">Employee Code</th>
                  <th className="p-3.5">Staff Name & Designation</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5">Punch Status</th>
                  <th className="p-3.5 text-right">Punch Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {employees.map(emp => {
                  const status = employeeAttendance[emp.id] || 'PRESENT';
                  return (
                    <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-indigo-700">{emp.employeeCode}</td>
                      <td className="p-3.5">
                        <span className="font-bold text-slate-900">{emp.firstName} {emp.lastName}</span>
                        <span className="block text-[11px] text-slate-500">{emp.designation}</span>
                      </td>
                      <td className="p-3.5 text-slate-600 font-medium">{emp.role}</td>
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            status === 'PRESENT'
                              ? 'bg-emerald-100 text-emerald-800'
                              : status === 'ABSENT'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-1">
                        {(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'] as const).map(s => (
                          <button
                            key={s}
                            onClick={() => handleToggleEmployee(emp.id, s)}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                              status === s
                                ? 'bg-indigo-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ATTENDANCE ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Attendance Trends & Absenteeism Intelligence</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase">Average Attendance Rate</span>
              <p className="text-2xl font-extrabold text-emerald-600 mt-1">94.6%</p>
              <p className="text-[11px] text-slate-400 mt-1">+1.8% over previous semester</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase">Chronic Absenteeism Rate</span>
              <p className="text-2xl font-extrabold text-indigo-600 mt-1">1.4%</p>
              <p className="text-[11px] text-slate-400 mt-1">Below state 3.0% threshold</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase">Faculty Punctuality Rate</span>
              <p className="text-2xl font-extrabold text-purple-600 mt-1">98.2%</p>
              <p className="text-[11px] text-slate-400 mt-1">Biometric time-clock accuracy</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
