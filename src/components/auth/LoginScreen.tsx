import React, { useState, useEffect } from 'react';
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
  ArrowRight,
  ShieldAlert,
  Loader2,
  FileCheck2,
  BookOpen,
  DollarSign
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { UserRole } from '../../types';
import {
  DEMO_ACCOUNTS,
  detectRoleFromIdentifier,
  getCanonicalPortalRoute,
  DemoAccount
} from '../../auth/rbacMiddleware';
import { UserSession } from '../../types/auth';

interface LoginScreenProps {
  unauthorizedNotice?: string | null;
  onLoginSuccess?: (session: UserSession) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  unauthorizedNotice,
  onLoginSuccess
}) => {
  const { institute, loginUser } = useSchool();

  // Selected role preset for convenience
  const [selectedRole, setSelectedRole] = useState<UserRole>('SUPER_ADMIN');

  // Input states
  const [identifier, setIdentifier] = useState('admin@dpxsolution.edu');
  const [password, setPassword] = useState('Admin@2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Status states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Role metadata for tabbed switcher
  const roleTabs: {
    role: UserRole;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    targetRoute: string;
  }[] = [
    { role: 'SUPER_ADMIN', label: 'Super Admin', icon: ShieldCheck, color: 'text-purple-600', targetRoute: '/portal/admin' },
    { role: 'PRINCIPAL', label: 'Principal', icon: Building2, color: 'text-indigo-600', targetRoute: '/portal/principal' },
    { role: 'ACCOUNTANT', label: 'Accountant', icon: DollarSign, color: 'text-emerald-600', targetRoute: '/portal/accounts' },
    { role: 'TEACHER', label: 'Teacher', icon: BookOpen, color: 'text-blue-600', targetRoute: '/portal/teacher' },
    { role: 'STUDENT', label: 'Student', icon: GraduationCap, color: 'text-teal-600', targetRoute: '/portal/student' },
    { role: 'PARENT', label: 'Parent', icon: Users, color: 'text-amber-600', targetRoute: '/portal/parent' }
  ];

  // When clicking a role preset tab, auto-fill standard credentials
  const handleSelectRolePreset = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage(null);
    const demo = DEMO_ACCOUNTS.find(a => a.role === role);
    if (demo) {
      setIdentifier(demo.identifier);
      setPassword(demo.password);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validation
    const cleanId = identifier.trim();
    if (!cleanId) {
      setErrorMessage('Please enter your Institutional Identifier (Username, Email, Admission No, or Employee ID).');
      return;
    }
    if (!password || password.length < 4) {
      setErrorMessage('Password must contain at least 4 characters.');
      return;
    }

    setIsLoading(true);

    // Simulate authenticating against the campus LDAP / Auth service with realistic latency
    setTimeout(() => {
      // Auto-detect role or use selectedRole
      const detected = detectRoleFromIdentifier(cleanId) || selectedRole;
      const demoAccount = DEMO_ACCOUNTS.find(a => a.role === detected) || DEMO_ACCOUNTS[0];

      const canonicalRoute = getCanonicalPortalRoute(detected);

      const session: UserSession = {
        userId: `usr-${detected.toLowerCase().slice(0, 3)}-${Date.now()}`,
        emailOrUsername: cleanId,
        displayName: cleanId === demoAccount.identifier ? demoAccount.displayName : `${cleanId} (${detected})`,
        role: detected,
        portalType:
          detected === 'SUPER_ADMIN' || detected === 'PRINCIPAL'
            ? 'ADMIN_PRINCIPAL'
            : detected === 'ACCOUNTANT' || detected === 'CLERK' || detected === 'TEACHER'
            ? 'STAFF_ACCOUNTANT'
            : 'STUDENT_PARENT',
        portalRoute: canonicalRoute,
        instituteId: institute.id,
        instituteName: institute.name,
        token: `dpx_jwt_${detected.toLowerCase()}_${Date.now()}`,
        mfaVerified: detected === 'SUPER_ADMIN' || detected === 'PRINCIPAL',
        lastLoginAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 12 * 3600 * 1000).toISOString(),
        // Extra metadata based on role
        employeeCode: demoAccount.details?.employeeCode,
        department: demoAccount.details?.department,
        admissionNo: demoAccount.details?.admissionNo,
        className: demoAccount.details?.className,
        section: demoAccount.details?.section
      };

      setIsLoading(false);
      setSuccessMessage(`Authenticated successfully! Redirecting to ${canonicalRoute}...`);

      loginUser(session);
      if (onLoginSuccess) {
        onLoginSuccess(session);
      }
    }, 450);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        {/* Brand Crest */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 p-0.5 shadow-xl shadow-indigo-500/25 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-indigo-400 to-purple-300 tracking-tighter">
                DPx
              </span>
            </div>
          </div>
        </div>

        <h1 className="mt-4 text-center text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          DPxSOLUTION
        </h1>
        <p className="mt-1 text-center text-xs sm:text-sm font-medium text-indigo-300">
          School Management System · Secure Institutional Gateway
        </p>

        {/* Security Notice / Unauthorized Interception Banner */}
        {unauthorizedNotice && (
          <div className="mt-4 p-3.5 bg-rose-500/15 border border-rose-500/40 rounded-xl text-rose-200 text-xs flex items-center space-x-2.5 animate-in fade-in">
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
            <div>
              <p className="font-bold text-rose-300">Authentication Required</p>
              <p className="text-rose-200/90 text-[11px] mt-0.5">{unauthorizedNotice}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white/95 backdrop-blur-md py-7 px-6 sm:px-10 shadow-2xl rounded-2xl border border-slate-200/80">
          {/* Header Title inside Card */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Sign In to Your Portal</h2>
              <p className="text-xs text-slate-500">
                Single unified access point for all institutional roles
              </p>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              RBAC v4.8
            </span>
          </div>

          {/* Role Preset Tabs */}
          <div className="mt-4">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Portal / Role Preset
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 p-1 bg-slate-100 rounded-xl">
              {roleTabs.map(tab => {
                const Icon = tab.icon;
                const isSelected = selectedRole === tab.role;
                return (
                  <button
                    key={tab.role}
                    type="button"
                    onClick={() => handleSelectRolePreset(tab.role)}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-white text-slate-900 shadow-sm border border-slate-200 ring-2 ring-indigo-500/30'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1 ${tab.color}`} />
                    <span className="text-[10px] leading-tight text-center">{tab.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-1.5 text-[11px] text-slate-500 flex items-center justify-between">
              <span>
                Target route: <code className="font-mono text-indigo-600 font-bold">{getCanonicalPortalRoute(selectedRole)}</code>
              </span>
              <span className="text-emerald-700 font-semibold text-[10px]">Click any tab to autofill</span>
            </p>
          </div>

          {/* Feedback messages */}
          {errorMessage && (
            <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center space-x-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form className="mt-5 space-y-4" onSubmit={handleLoginSubmit}>
            <div>
              <label htmlFor="identifier" className="block text-xs font-bold text-slate-700">
                Institutional Identifier
              </label>
              <div className="mt-1 relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  id="identifier"
                  type="text"
                  required
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder="Username / Email / Admission No / Employee ID"
                  className="block w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold text-slate-700">
                Security Password / PIN
              </label>
              <div className="mt-1 relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter security password"
                  className="block w-full pl-9 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center space-x-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
                />
                <span>Remember on this terminal</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  setErrorMessage('Please contact campus IT helpdesk at it-support@dpxsolution.edu for password resets.');
                }}
                className="font-medium text-indigo-600 hover:text-indigo-700"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 shadow-md shadow-indigo-600/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 transition-all cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials & Permissions...</span>
                </>
              ) : (
                <>
                  <span>Sign In to {selectedRole.replace('_', ' ')} Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Credential Helper Accordion / Tray */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider text-[10px] text-slate-400">
                Institutional Demo Credentials
              </span>
              <span className="text-[10px] text-indigo-600 font-medium">Click any row to test</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {DEMO_ACCOUNTS.map(acc => (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => handleSelectRolePreset(acc.role)}
                  className={`p-2 rounded-lg border text-left flex items-start justify-between transition-colors ${
                    selectedRole === acc.role
                      ? 'border-indigo-300 bg-indigo-50/70'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center space-x-1">
                      <span className="font-bold text-[11px] text-slate-900 truncate">
                        {acc.role.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="font-mono text-[10px] text-slate-500 truncate">{acc.identifier}</p>
                  </div>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white text-slate-600 border border-slate-200 shrink-0">
                    {acc.password}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Security Assurance Badges */}
        <div className="mt-4 flex items-center justify-center space-x-4 text-[11px] text-indigo-300">
          <span className="flex items-center space-x-1">
            <Lock className="w-3.5 h-3.5 text-indigo-400" />
            <span>256-Bit SSL/TLS Encryption</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Role-Based Access Control Guarded</span>
          </span>
        </div>
      </div>
    </div>
  );
};
