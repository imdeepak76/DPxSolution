import React, { useState } from 'react';
import {
  Database,
  X,
  Copy,
  CheckCircle2,
  Layers,
  Server,
  ShieldCheck,
  FileCode,
  ExternalLink
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { SYSTEM_ARCHITECTURE_OVERVIEW, PRISMA_SCHEMA_CODE } from '../../data/prismaSchema';

export const ArchitectureModal: React.FC = () => {
  const { isArchitectureModalOpen, setIsArchitectureModalOpen } = useSchool();
  const [activeTab, setActiveTab] = useState<'architecture' | 'prisma'>('architecture');
  const [copied, setCopied] = useState(false);

  if (!isArchitectureModalOpen) return null;

  const handleCopyPrisma = () => {
    navigator.clipboard.writeText(PRISMA_SCHEMA_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-wide">
                DPxSOLUTION Architecture & Prisma Database Schema
              </h3>
              <p className="text-xs text-indigo-200">
                Multi-Tenant Relational Schema & PostgreSQL Enterprise Modeling
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsArchitectureModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch bar */}
        <div className="px-6 pt-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors ${
                activeTab === 'architecture'
                  ? 'border-indigo-600 text-indigo-600 bg-white rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Server className="w-4 h-4" />
              <span>System Architecture & Multi-Tenancy</span>
            </button>

            <button
              onClick={() => setActiveTab('prisma')}
              className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors ${
                activeTab === 'prisma'
                  ? 'border-indigo-600 text-indigo-600 bg-white rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileCode className="w-4 h-4" />
              <span>Prisma Schema (schema.prisma)</span>
            </button>
          </div>

          {activeTab === 'prisma' && (
            <button
              onClick={handleCopyPrisma}
              className="flex items-center space-x-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-bold shadow-xs transition-colors mb-1.5"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy schema.prisma'}</span>
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
          {activeTab === 'architecture' ? (
            <div className="space-y-6">
              {/* Architecture Blueprint Card */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <h4 className="font-extrabold text-sm text-slate-900 flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>High-Level Full-Stack Architecture</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-lg bg-indigo-50/50 border border-indigo-100">
                    <p className="font-bold text-indigo-900 mb-1">Presentation Layer</p>
                    <p className="text-slate-600 leading-relaxed">
                      React 19, Tailwind CSS v4, Lucide Icons, Right-Side Sliding Drawer Navigation, CSS Paged Media (@media print) for printable cards & slips.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-emerald-50/50 border border-emerald-100">
                    <p className="font-bold text-emerald-900 mb-1">Application & API Layer</p>
                    <p className="text-slate-600 leading-relaxed">
                      Node.js Express / Next.js Serverless API routes, JWT Session tokens, RBAC guard middleware, WhatsApp Business API Webhooks, Twilio SMPP SMS gateway.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-purple-50/50 border border-purple-100">
                    <p className="font-bold text-purple-900 mb-1">Database & ORM Layer</p>
                    <p className="text-slate-600 leading-relaxed">
                      PostgreSQL 16+ with Prisma ORM, JSONB audit trails, partitioned indices on <code>instituteId</code> for tenant isolation, Row-Level Security (RLS).
                    </p>
                  </div>
                </div>
              </div>

              {/* Multi-Tenancy & RBAC Matrix */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="font-extrabold text-sm text-slate-900 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Multi-Tenant Partitioning & RBAC Isolation</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every root entity (<code>Class</code>, <code>Student</code>, <code>Employee</code>, <code>FeeInvoice</code>, <code>AttendanceRecord</code>, <code>ExamSession</code>) enforces foreign key association to <code>Institute(id)</code>. Role-Based Access Control validates capabilities at the API boundary, guaranteeing that financial records (Accountant, Bursar) remain inaccessible to students and parents while preserving transparent academic visibility.
                </p>
              </div>

              {/* Textual Architecture Overview */}
              <pre className="p-4 bg-slate-900 text-indigo-300 font-mono text-[11px] rounded-xl overflow-x-auto whitespace-pre leading-relaxed">
                {SYSTEM_ARCHITECTURE_OVERVIEW}
              </pre>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>PostgreSQL-Ready Prisma Schema with 18 Models & 10 Enums</span>
                <span className="font-mono text-indigo-600">prisma/schema.prisma</span>
              </div>
              <pre className="p-4 bg-slate-900 text-slate-100 font-mono text-[11px] rounded-xl overflow-x-auto whitespace-pre leading-relaxed border border-slate-800">
                {PRISMA_SCHEMA_CODE}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex justify-end">
          <button
            onClick={() => setIsArchitectureModalOpen(false)}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors"
          >
            Close Architecture Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
