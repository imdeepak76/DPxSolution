import React, { useState } from 'react';
import {
  MessageSquare,
  Mail,
  Smartphone,
  Plus,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Sliders,
  Pin,
  Calendar,
  X
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

interface CommunicationProps {
  initialTab?: 'whatsapp' | 'messaging' | 'sms';
}

export const CommunicationModules: React.FC<CommunicationProps> = ({ initialTab = 'whatsapp' }) => {
  const { notices, addNotice, smsTemplates } = useSchool();
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'messaging' | 'sms'>(initialTab);

  // Notice board form
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    category: 'ACADEMIC' as const,
    content: '',
    targetAudience: 'ALL' as const,
    author: 'Principal Office',
    isPinned: false
  });

  // WhatsApp simulation state
  const [waTriggerSuccess, setWaTriggerSuccess] = useState<string | null>(null);

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    addNotice({
      title: newNotice.title,
      category: newNotice.category,
      content: newNotice.content,
      targetAudience: newNotice.targetAudience,
      author: newNotice.author,
      isPinned: newNotice.isPinned
    });
    setShowNoticeModal(false);
  };

  const triggerWhatsAppAlert = (type: string) => {
    setWaTriggerSuccess(`WhatsApp automated broadcast for "${type}" successfully transmitted to Meta Cloud API!`);
    setTimeout(() => setWaTriggerSuccess(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <span>Modules 14, 15 & 16</span>
            <span>•</span>
            <span>Omnichannel Communications</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            WhatsApp Business API, Messaging & SMS Gateways
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Automated event-triggered notifications, internal bulletin notices, and SMPP/Twilio SMS gateways.
          </p>
        </div>

        {activeTab === 'messaging' && (
          <button
            onClick={() => setShowNoticeModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Notice</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('whatsapp')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'whatsapp'
              ? 'bg-green-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>14. WhatsApp Business API Automation</span>
        </button>

        <button
          onClick={() => setActiveTab('messaging')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'messaging'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>15. Campus Bulletin & Messaging</span>
        </button>

        <button
          onClick={() => setActiveTab('sms')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'sms'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>16. SMS Gateway & Template Engine</span>
        </button>
      </div>

      {/* WHATSAPP AUTOMATION */}
      {activeTab === 'whatsapp' && (
        <div className="space-y-4">
          {waTriggerSuccess && (
            <div className="p-3.5 bg-green-50 border border-green-200 text-green-900 rounded-xl text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>{waTriggerSuccess}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">Absenteeism Auto-Alert</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800">
                  Hook Active
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Dispatches instant WhatsApp template to parent phones immediately when a student is marked Absent during morning attendance roll call.
              </p>
              <button
                onClick={() => triggerWhatsAppAlert('Absenteeism Alert')}
                className="w-full py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Simulate Absent Alert Hook
              </button>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">Overdue Fee Notification</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800">
                  Hook Active
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Sends automated payment links and due breakdown to fee defaulters on the 10th and 20th of every calendar month.
              </p>
              <button
                onClick={() => triggerWhatsAppAlert('Overdue Fee Notification')}
                className="w-full py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Simulate Overdue Fee Broadcast
              </button>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">Exam Hall Ticket Dispatch</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800">
                  Ready
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Sends digital PDF hall tickets and datesheets directly via verified WhatsApp business account with 99.8% open rates.
              </p>
              <button
                onClick={() => triggerWhatsAppAlert('Exam Hall Ticket Dispatch')}
                className="w-full py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Simulate Hall Ticket Hook
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MESSAGING & BULLETIN */}
      {activeTab === 'messaging' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs divide-y divide-slate-100">
          {notices.map(n => (
            <div key={n.id} className="p-4 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900 text-xs">{n.title}</span>
                  {n.isPinned && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-100 text-rose-700">
                      Pinned
                    </span>
                  )}
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                    Audience: {n.targetAudience}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{n.content}</p>
                <div className="text-[11px] text-slate-400">
                  Published By: {n.author} · {n.publishDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SMS GATEWAY SERVICES */}
      {activeTab === 'sms' && (
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">SMS Gateway Templates with Dynamic Variables</h3>
              <p className="text-xs text-slate-500">Configured message templates with auto-injected merge tokens</p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-700">
              Twilio / SMPP Live
            </span>
          </div>

          <div className="space-y-3">
            {smsTemplates.map(tmpl => (
              <div key={tmpl.id} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800">{tmpl.title}</span>
                  <span className="font-mono text-[10px] text-slate-400">{tmpl.type}</span>
                </div>
                <p className="text-xs text-slate-600 font-mono bg-white p-2.5 rounded border border-slate-200">
                  {tmpl.templateBody}
                </p>
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-500">
                  <span className="font-semibold">Merge Tokens:</span>
                  {tmpl.variables.map(v => (
                    <span key={v} className="px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 font-mono">
                      {`{${v}}`}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Notice Modal */}
      {showNoticeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Publish Campus Announcement</h3>
              <button onClick={() => setShowNoticeModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePostNotice} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notice Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Mid-Term Examination Schedule Released"
                  value={newNotice.title}
                  onChange={e => setNewNotice({ ...newNotice, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newNotice.category}
                    onChange={e => setNewNotice({ ...newNotice, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  >
                    <option value="ACADEMIC">Academic</option>
                    <option value="EVENT">Campus Event</option>
                    <option value="HOLIDAY">Holiday Notice</option>
                    <option value="URGENT">Urgent Alert</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Audience</label>
                  <select
                    value={newNotice.targetAudience}
                    onChange={e => setNewNotice({ ...newNotice, targetAudience: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  >
                    <option value="ALL">All (Campus-wide)</option>
                    <option value="STUDENTS">Students Only</option>
                    <option value="PARENTS">Parents Only</option>
                    <option value="STAFF">Faculty & Staff</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Announcement Body</label>
                <textarea
                  rows={3}
                  value={newNotice.content}
                  onChange={e => setNewNotice({ ...newNotice, content: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="pin"
                  checked={newNotice.isPinned}
                  onChange={e => setNewNotice({ ...newNotice, isPinned: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="pin" className="text-xs font-semibold text-slate-700">
                  Pin to Top of Campus Notice Board
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowNoticeModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
