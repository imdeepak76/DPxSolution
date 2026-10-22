import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  KeyRound,
  User,
  GraduationCap,
  Users,
  Building2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  RefreshCw,
  LogOut,
  Laptop,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { AuthPortalType, LoginAuditLog, UserSession } from '../../types/auth';
import { UserRole } from '../../types';

interface AuthPortalsProps {
  onLoginSuccess?: () => void;
}

export const AuthPortals: React.FC<AuthPortalsProps> = ({ onLoginSuccess }) => {
  const {
    userSession,
    loginUser,
    logoutUser,
    activeAuthPortal,
    setActiveAuthPortal,
    institute
  } = useSchool();

  // Selected portal: admin, staff, or student
  const [selectedPortal, setSelectedPortal] = useState<AuthPortalType>(activeAuthPortal || 'ADMIN_PRINCIPAL');

  // Form states
  const [adminEmail, setAdminEmail] = useState('admin@dpxsolution.edu');
  const [adminPassword, setAdminPassword] = useState('••••••••••••');
  const [selectedAdminRole, setSelectedAdminRole] = useState<'SUPER_ADMIN' | 'PRINCIPAL'>('SUPER_ADMIN');

  // MFA state for admin/principal
  const [mfaStep, setMfaStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Staff credentials
  const [staffCode, setStaffCode] = useState('EMP-ACC-01');
  const [staffPassword, setStaffPassword] = useState('••••••••••••');
  const [staffTellerCounter, setStaffTellerCounter] = useState('Terminal #01 - Main Bursar Cashier');

  // Student credentials
  const [studentIdentifier, setStudentIdentifier] = useState('DPX-2024-001'); // Alexander Wright
  const [studentPin, setStudentPin] = useState('2026');

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  // Audit trail state
  const [auditLogs, setAuditLogs] = useState<LoginAuditLog[]>([
    {
      id: 'log-1',
      timestamp: '2026-10-22 08:34:12',
      username: 'admin@dpxsolution.edu',
      role: 'SUPER_ADMIN',
      portal: 'ADMIN_PRINCIPAL',
      ipAddress: '192.168.1.104 (Campus LAN)',
      userAgent: 'Chrome 128 / macOS Sequoia',
      status: 'SUCCESS'
    },
    {
      id: 'log-2',
      timestamp: '2026-10-22 08:15:02',
      username: 'finance@dpxsolution.edu',
      role: 'ACCOUNTANT',
      portal: 'STAFF_ACCOUNTANT',
      ipAddress: '10.0.4.22 (Bursar Terminal #1)',
      userAgent: 'Firefox 130 / Ubuntu Linux',
      status: 'SUCCESS'
    },
    {
      id: 'log-3',
      timestamp: '2026-10-22 07:55:40',
      username: 'DPX-2024-001',
      role: 'STUDENT',
      portal: 'STUDENT_PARENT',
      ipAddress: '73.189.44.12 (Residential ISP)',
      userAgent: 'Mobile Safari / iOS 18',
      status: 'SUCCESS'
    }
  ]);

  // Handle Admin / Principal Form Submission
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    // High security requirement: initiate MFA
    setMfaStep(true);
    setOtpSent(true);
    setOtpCode('849201'); // simulated OTP for demo convenience
  };

  // Verify MFA OTP
  const handleVerifyMfa = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) {
      setAuthError('Please enter a valid 6-digit verification code.');
      return;
    }

    const session: UserSession = {
      userId: selectedAdminRole === 'SUPER_ADMIN' ? 'usr-adm-01' : 'usr-prn-01',
      emailOrUsername: adminEmail,
      displayName: selectedAdminRole === 'SUPER_ADMIN' ? 'Dr. Gregory Sterling' : 'Dr. Patricia Holt',
      role: selectedAdminRole,
      portalType: 'ADMIN_PRINCIPAL',
      portalRoute: selectedAdminRole === 'SUPER_ADMIN' ? '/portal/admin' : '/portal/principal',
      instituteId: institute.id,
      instituteName: institute.name,
      token: `dpx_jwt_sec_${Date.now()}`,
      mfaVerified: true,
      lastLoginAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 8 * 3600 * 1000).toISOString()
    };

    loginUser(session);
    setAuthSuccess(`Welcome back, ${session.displayName}! Authenticated as ${selectedAdminRole}.`);

    // Log to audit trail
    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        username: adminEmail,
        role: selectedAdminRole,
        portal: 'ADMIN_PRINCIPAL',
        ipAddress: '192.168.1.104 (Campus Secure Gateway)',
        userAgent: navigator.userAgent.slice(0, 30),
        status: 'SUCCESS'
      },
      ...prev
    ]);

    setMfaStep(false);
    if (onLoginSuccess) onLoginSuccess();
  };

  // Handle Staff / Accountant Login
  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const session: UserSession = {
      userId: 'usr-acc-01',
      emailOrUsername: staffCode,
      displayName: 'Marcus Sterling-Price (Chief Bursar)',
      role: 'ACCOUNTANT',
      portalType: 'STAFF_ACCOUNTANT',
      portalRoute: '/portal/accounts',
      instituteId: institute.id,
      instituteName: institute.name,
      token: `dpx_staff_token_${Date.now()}`,
      mfaVerified: false,
      lastLoginAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 8 * 3600 * 1000).toISOString()
    };

    loginUser(session);
    setAuthSuccess(`Cashier session active: Assigned to ${staffTellerCounter}.`);

    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        username: staffCode,
        role: 'ACCOUNTANT',
        portal: 'STAFF_ACCOUNTANT',
        ipAddress: '10.0.4.22 (Bursar Terminal #1)',
        userAgent: navigator.userAgent.slice(0, 30),
        status: 'SUCCESS'
      },
      ...prev
    ]);

    if (onLoginSuccess) onLoginSuccess();
  };

  // Handle Student / Parent Login
  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const session: UserSession = {
      userId: 'usr-stu-101',
      emailOrUsername: studentIdentifier,
      displayName: 'Alexander Wright',
      role: 'STUDENT',
      portalType: 'STUDENT_PARENT',
      portalRoute: '/portal/student',
      instituteId: institute.id,
      instituteName: institute.name,
      token: `dpx_stu_token_${Date.now()}`,
      mfaVerified: false,
      studentId: 'stu-101',
      admissionNo: 'DPX-2024-001',
      rollNo: '10-A-01',
      className: 'Grade 10',
      section: 'A',
      lastLoginAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString()
    };

    loginUser(session);
    setAuthSuccess('Authenticated into Student & Parent View-Only Portal.');

    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        username: studentIdentifier,
        role: 'STUDENT',
        portal: 'STUDENT_PARENT',
        ipAddress: '73.189.44.12 (Residential Client)',
        userAgent: navigator.userAgent.slice(0, 30),
        status: 'SUCCESS'
      },
      ...prev
    ]);

    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center space-y-2 pb-4 border-b border-slate-200">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-indigo-700 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Multi-Tenant Enterprise Authentication</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          DPxSOLUTION Access Control Portals
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Isolated login routes, session credentials, and cryptographic role enforcement for Institutional Heads, Accounts Staff, and Learners.
        </p>
      </div>

      {/* Active User Session Card (if logged in) */}
      {userSession && (
        <div className="p-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl shadow-lg border border-indigo-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-base">
              {userSession.displayName[0]}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm text-white">{userSession.displayName}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/30 text-indigo-200 uppercase">
                  {userSession.role}
                </span>
                {userSession.mfaVerified && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                    MFA Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 font-mono">
                Session Token: {userSession.token.slice(0, 18)}... · {userSession.portalType}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                logoutUser();
                setAuthSuccess('You have been securely signed out.');
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-600/80 hover:bg-rose-600 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out Session</span>
            </button>
          </div>
        </div>
      )}

      {/* Portal Selection Switcher Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Tier 1: Admin / Principal */}
        <div
          onClick={() => {
            setSelectedPortal('ADMIN_PRINCIPAL');
            setActiveAuthPortal('ADMIN_PRINCIPAL');
            setMfaStep(false);
          }}
          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
            selectedPortal === 'ADMIN_PRINCIPAL'
              ? 'border-purple-600 bg-purple-50/50 shadow-md ring-2 ring-purple-500/20'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold font-mono text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
              /auth/admin-login
            </span>
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">1. Admin & Principal</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Root governance, institutional config & 6-digit MFA verification.
          </p>
        </div>

        {/* Tier 2: Accountant / Staff */}
        <div
          onClick={() => {
            setSelectedPortal('STAFF_ACCOUNTANT');
            setActiveAuthPortal('STAFF_ACCOUNTANT');
            setMfaStep(false);
          }}
          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
            selectedPortal === 'STAFF_ACCOUNTANT'
              ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-500/20'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold font-mono text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
              /auth/staff-login
            </span>
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">2. Accountant & Staff</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Bursar POS cashier counter, payroll disbursement & ledger audits.
          </p>
        </div>

        {/* Tier 3: Student & Parent */}
        <div
          onClick={() => {
            setSelectedPortal('STUDENT_PARENT');
            setActiveAuthPortal('STUDENT_PARENT');
            setMfaStep(false);
          }}
          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
            selectedPortal === 'STUDENT_PARENT'
              ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              /auth/student-login
            </span>
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">3. Student & Parent</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Admission No / Roll + PIN. View-only portal with fee-gated admit cards.
          </p>
        </div>
      </div>

      {authSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{authSuccess}</span>
        </div>
      )}

      {authError && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-900 rounded-xl text-xs font-bold flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{authError}</span>
        </div>
      )}

      {/* PORTAL LOGIN CARD */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* PORTAL 1: SUPER ADMIN & PRINCIPAL */}
        {selectedPortal === 'ADMIN_PRINCIPAL' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Institutional Governance Sign-In
                </h3>
                <p className="text-xs text-slate-500">
                  Super Administrator & Principal Tier with Hardware/Authenticator MFA Guard
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAdminRole('SUPER_ADMIN');
                    setAdminEmail('director@dpxsolution.edu');
                  }}
                  className={`px-2.5 py-1 text-xs rounded-md font-bold ${
                    selectedAdminRole === 'SUPER_ADMIN'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Super Admin
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAdminRole('PRINCIPAL');
                    setAdminEmail('principal.holt@dpxsolution.edu');
                  }}
                  className={`px-2.5 py-1 text-xs rounded-md font-bold ${
                    selectedAdminRole === 'PRINCIPAL'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Principal
                </button>
              </div>
            </div>

            {!mfaStep ? (
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Institutional Email Address
                  </label>
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={e => setAdminEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Security Passphrase / Master Key
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={adminPassword}
                      onChange={e => setAdminPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl flex items-center justify-between text-xs text-purple-900">
                  <span className="flex items-center space-x-1.5 font-medium">
                    <KeyRound className="w-4 h-4 text-purple-700" />
                    <span>2-Step MFA OTP verification will be required after password</span>
                  </span>
                  <span className="font-mono text-[11px] text-purple-700 font-bold">256-Bit TLS</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <span>Authenticate & Generate OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* MFA OTP Step */
              <form onSubmit={handleVerifyMfa} className="space-y-4 animate-in fade-in zoom-in-95">
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl space-y-2">
                  <div className="flex items-center space-x-2 text-purple-900 font-bold text-xs">
                    <KeyRound className="w-4 h-4 text-purple-600" />
                    <span>Multi-Factor Authentication (MFA / OTP)</span>
                  </div>
                  <p className="text-xs text-purple-800">
                    A 6-digit cryptographic verification code has been dispatched to your authorized hardware authenticator for <strong>{adminEmail}</strong>.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Enter 6-Digit OTP Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={e => setOtpCode(e.target.value)}
                    placeholder="849201"
                    className="w-full px-4 py-3 text-lg font-mono font-extrabold tracking-widest text-center border-2 border-purple-400 rounded-xl focus:ring-2 focus:ring-purple-600 bg-purple-50/20"
                    required
                  />
                  <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1.5">
                    <span>Demo auto-filled code: <strong>849201</strong></span>
                    <button
                      type="button"
                      onClick={() => setOtpCode('849201')}
                      className="text-purple-600 font-bold hover:underline"
                    >
                      Autofill Code
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setMfaStep(false)}
                    className="w-1/3 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify MFA & Enter Dashboard</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* PORTAL 2: STAFF / ACCOUNTANT */}
        {selectedPortal === 'STAFF_ACCOUNTANT' && (
          <form onSubmit={handleStaffLogin} className="space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">
                Staff & Bursar Financial Terminal Login
              </h3>
              <p className="text-xs text-slate-500">
                Restricted to Fee Cashier POS, Payroll disbursement, and Chart of Accounts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Employee Code / Username
                </label>
                <input
                  type="text"
                  value={staffCode}
                  onChange={e => setStaffCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Assigned Teller / Terminal
                </label>
                <select
                  value={staffTellerCounter}
                  onChange={e => setStaffTellerCounter(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl"
                >
                  <option value="Terminal #01 - Main Bursar Cashier">Terminal #01 - Main Bursar Cashier</option>
                  <option value="Terminal #02 - Secondary Admissions Counter">Terminal #02 - Secondary Admissions Counter</option>
                  <option value="Terminal #03 - Payroll & Accounts Desk">Terminal #03 - Payroll & Accounts Desk</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Security Password</label>
              <input
                type="password"
                value={staffPassword}
                onChange={e => setStaffPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900">
              <p className="font-bold">RBAC Scope Enforced:</p>
              <p className="text-slate-600 mt-0.5">
                Financial, Fee POS, and Payroll modules allowed. Academic curriculum and grading alterations strictly blocked.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>Sign In as Finance Staff</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* PORTAL 3: STUDENT & PARENT */}
        {selectedPortal === 'STUDENT_PARENT' && (
          <form onSubmit={handleStudentLogin} className="space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">
                Student & Parent View-Only Portal
              </h3>
              <p className="text-xs text-slate-500">
                Access attendance logs, homework tasks, timetables, and fee-gated examination admit cards.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Admission Number / Roll Number
                </label>
                <input
                  type="text"
                  value={studentIdentifier}
                  onChange={e => setStudentIdentifier(e.target.value)}
                  placeholder="e.g. DPX-2024-001 or 10-A-01"
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <span className="text-[10px] text-slate-400">Demo student: DPX-2024-001</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Student Security PIN / Password
                </label>
                <input
                  type="password"
                  value={studentPin}
                  onChange={e => setStudentPin(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono"
                  required
                />
                <span className="text-[10px] text-slate-400">Default PIN: 2026</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 space-y-1">
              <p className="font-bold">Conditional Gating Active:</p>
              <p className="text-slate-600">
                Admit cards require current-month fee clearance. Report cards require complete no-dues verification.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>Access Student Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

      {/* LOGIN AUDIT TRAIL & ACTIVE SESSION MANAGEMENT */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">Security Audit Trail & Login Telemetry</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">SOC2 / ISO 27001 Active</span>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border border-slate-200 rounded-lg">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Identifier / User</th>
                <th className="p-3">Role Tier</th>
                <th className="p-3">IP Address</th>
                <th className="p-3">Client Device</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogs.slice(0, 5).map(log => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono text-slate-500">{log.timestamp}</td>
                  <td className="p-3 font-semibold text-slate-900">{log.username}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 font-mono">
                      {log.role}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-600">{log.ipAddress}</td>
                  <td className="p-3 text-slate-500 truncate max-w-xs">{log.userAgent}</td>
                  <td className="p-3 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
