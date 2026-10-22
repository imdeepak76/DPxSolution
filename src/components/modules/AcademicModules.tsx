import React, { useState } from 'react';
import {
  Video,
  FileQuestion,
  FileSpreadsheet,
  CheckSquare,
  Plus,
  Printer,
  Calendar,
  ExternalLink,
  Award,
  BookOpen,
  Search,
  CheckCircle2,
  X
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { StudentResult } from '../../types';

interface AcademicModulesProps {
  initialTab?: 'live' | 'question-paper' | 'exams' | 'class-tests';
}

export const AcademicModules: React.FC<AcademicModulesProps> = ({ initialTab = 'exams' }) => {
  const { exams, results, classes, subjects, openPrintModal } = useSchool();
  const [activeTab, setActiveTab] = useState<'live' | 'question-paper' | 'exams' | 'class-tests'>(initialTab);

  // Live Class State
  const [liveSessions, setLiveSessions] = useState([
    { id: 'live-1', title: 'Calculus: Derivatives of Trigonometric Functions', className: 'Grade 10', subject: 'Mathematics', teacher: 'Emily Watson', startTime: '10:00 AM', platform: 'Zoom Meeting', meetingUrl: 'https://zoom.us/j/982348123', status: 'LIVE_NOW' },
    { id: 'live-2', title: 'AP Physics: Electromagnetic Induction', className: 'Grade 12', subject: 'Physics', teacher: 'Dr. Evelyn Reed', startTime: '02:00 PM', platform: 'Google Meet', meetingUrl: 'https://meet.google.com/abc-defg-hij', status: 'SCHEDULED' }
  ]);

  // Question Paper Bank State
  const [questions, setQuestions] = useState([
    { id: 'q-1', subject: 'Mathematics', grade: 'Grade 10', type: 'Long Answer', marks: 5, question: 'State and prove the Fundamental Theorem of Calculus. Evaluate the definite integral of sin(2x) from 0 to pi/2.' },
    { id: 'q-2', subject: 'Physics', grade: 'Grade 11', type: 'Derivation', marks: 4, question: 'Derive the kinematic expression for centripetal acceleration in uniform circular motion.' },
    { id: 'q-3', subject: 'Chemistry', grade: 'Grade 11', type: 'Short Answer', marks: 3, question: 'Explain Markovnikov rule with a suitable organic reaction mechanism.' }
  ]);

  // Class Tests State
  const [classTests, setClassTests] = useState([
    { id: 'test-1', title: 'Weekly Math Quiz #4', className: 'Grade 10', subject: 'Mathematics', date: '2026-10-18', avgScore: 84.5, totalStudents: 58, highestScore: 100 },
    { id: 'test-2', title: 'Physics Vectors & Dynamics Test', className: 'Grade 11', subject: 'Physics', date: '2026-10-15', avgScore: 78.2, totalStudents: 50, highestScore: 98 }
  ]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <span>Modules 17, 18, 19 & 20</span>
            <span>•</span>
            <span>Academic Excellence & Examination Suite</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Live Classes, Question Bank & Examinations
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Virtual classroom scheduler, question blueprint engine, gradebook marks entry, and official result cards.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('exams')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'exams'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>19. Examinations & Result Cards</span>
        </button>

        <button
          onClick={() => setActiveTab('class-tests')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'class-tests'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>20. Weekly Class Tests</span>
        </button>

        <button
          onClick={() => setActiveTab('question-paper')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'question-paper'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileQuestion className="w-4 h-4" />
          <span>18. Question Paper Bank</span>
        </button>

        <button
          onClick={() => setActiveTab('live')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'live'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>17. Live Class Scheduler</span>
        </button>
      </div>

      {/* 19. EXAMINATIONS & RESULT CARDS */}
      {activeTab === 'exams' && (
        <div className="space-y-6">
          {/* Active Exam Sessions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exams.map(ex => (
              <div key={ex.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{ex.title}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                    {ex.status}
                  </span>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p>Term: <strong>{ex.term}</strong> ({ex.academicYear})</p>
                  <p>Schedule: <strong>{ex.startDate}</strong> to <strong>{ex.endDate}</strong></p>
                  <p>Classes Covered: {ex.classesInvolved.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Student Results Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Official Student Result Sheets & Grade Cards</h3>
                <p className="text-xs text-slate-500">Term 1 Final assessment results and consolidated GPA ranks</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-purple-50 text-purple-700 text-xs font-bold">
                {results.length} Published Result Cards
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Rank</th>
                    <th className="p-3.5">Student</th>
                    <th className="p-3.5">Class / Roll</th>
                    <th className="p-3.5">Max Marks</th>
                    <th className="p-3.5">Marks Obtained</th>
                    <th className="p-3.5">Percentage</th>
                    <th className="p-3.5">GPA</th>
                    <th className="p-3.5">Grade</th>
                    <th className="p-3.5 text-right">Official Print</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {results.map(res => (
                    <tr key={res.id} className="hover:bg-slate-50">
                      <td className="p-3.5">
                        <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-700 font-bold font-mono flex items-center justify-center text-xs">
                          #{res.rank}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-slate-900">{res.studentName}</td>
                      <td className="p-3.5 text-slate-600 font-mono">{res.className} · {res.rollNo}</td>
                      <td className="p-3.5 font-mono text-slate-600">{res.totalMaxMarks}</td>
                      <td className="p-3.5 font-mono font-bold text-slate-900">{res.totalObtainedMarks}</td>
                      <td className="p-3.5 font-mono font-bold text-purple-700">{res.percentage}%</td>
                      <td className="p-3.5 font-mono font-bold text-emerald-600">{res.gpa.toFixed(2)}</td>
                      <td className="p-3.5 font-semibold text-slate-800">{res.overallGrade}</td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() =>
                            openPrintModal({
                              type: 'RESULT_CARD',
                              data: res
                            })
                          }
                          className="px-3 py-1.5 text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-md transition-colors"
                        >
                          Print Result Card
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 20. WEEKLY CLASS TESTS */}
      {activeTab === 'class-tests' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {classTests.map(ct => (
              <div key={ct.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{ct.title}</span>
                  <span className="text-[11px] font-mono text-slate-500">{ct.date}</span>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p>Subject: <strong>{ct.subject}</strong> ({ct.className})</p>
                  <p>Class Average Score: <strong className="text-indigo-600">{ct.avgScore}%</strong></p>
                  <p>Highest Recorded Score: <strong className="text-emerald-600">{ct.highestScore}/100</strong></p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="text-slate-500">Students Evaluated: {ct.totalStudents}</span>
                  <button className="text-indigo-600 hover:text-indigo-800 font-semibold">
                    View Remedial Roster
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 18. QUESTION PAPER BANK */}
      {activeTab === 'question-paper' && (
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Question Paper Repository & Blueprint</h3>
              <p className="text-xs text-slate-500">Curated bank categorized by cognitive taxonomy and marks weightage</p>
            </div>
            <button
              onClick={() => alert('Printable Question Paper layout compiled!')}
              className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700"
            >
              Generate Exam Paper PDF
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {questions.map(q => (
              <div key={q.id} className="py-3 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">
                      {q.subject}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{q.grade}</span>
                    <span className="text-[10px] font-bold text-slate-400">({q.type})</span>
                  </div>
                  <p className="text-xs text-slate-800 font-medium">{q.question}</p>
                </div>
                <span className="font-mono font-bold text-xs text-slate-700 shrink-0">
                  [{q.marks} Marks]
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 17. LIVE CLASS SCHEDULER */}
      {activeTab === 'live' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {liveSessions.map(ls => (
            <div key={ls.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">{ls.title}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    ls.status === 'LIVE_NOW'
                      ? 'bg-rose-100 text-rose-800 animate-pulse'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}
                >
                  {ls.status === 'LIVE_NOW' ? '● LIVE NOW' : ls.status}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                {ls.subject} · {ls.className} · Faculty: <strong>{ls.teacher}</strong>
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">Starts: {ls.startTime}</span>
                <a
                  href={ls.meetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  <span>Launch {ls.platform}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
