import React, { useEffect, useState } from 'react';
import {
  ShieldAlert,
  Lock,
  ArrowRight,
  LogOut,
  AlertTriangle,
  Clock,
  ShieldCheck,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { UserRole } from '../../types';
import { PortalRoute } from '../../types/auth';
import { PORTAL_CONFIGS, getCanonicalPortalRoute } from '../../auth/rbacMiddleware';

interface Forbidden403ScreenProps {
  currentRole: UserRole;
  attemptedRoute: string;
  userDisplayName: string;
  onReturnToPortal: (targetRoute: PortalRoute) => void;
  onLogout: () => void;
}

export const Forbidden403Screen: React.FC<Forbidden403ScreenProps> = ({
  currentRole,
  attemptedRoute,
  userDisplayName,
  onReturnToPortal,
  onLogout
}) => {
  const [countdown, setCountdown] = useState<number>(10);
  const authorizedRoute = getCanonicalPortalRoute(currentRole);
  const authorizedPortalConfig = PORTAL_CONFIGS[authorizedRoute];

  // Auto-redirect countdown
  useEffect(() => {
    if (countdown <= 0) {
      onReturnToPortal(authorizedRoute);
      return;
    }
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, authorizedRoute, onReturnToPortal]);

  const incidentId = `SEC-403-${Math.floor(100000 + Math.random() * 900000)}`;
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 selection:bg-rose-500 selection:text-white">
      <div className="max-w-xl w-full bg-slate-950 border border-rose-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95">
        {/* Glow backdrop */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Header Shield */}
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-800 uppercase tracking-wider">
                  HTTP 403 Forbidden
                </span>
                <span className="text-xs font-mono text-slate-500">Ref: {incidentId}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                Role Boundary Violation Intercepted
              </h2>
            </div>
          </div>

          {/* Explanation */}
          <div className="p-4 bg-rose-950/40 border border-rose-900/60 rounded-xl space-y-2 text-xs">
            <p className="text-rose-200 font-semibold leading-relaxed">
              Access to <code className="px-1.5 py-0.5 rounded bg-rose-900/60 font-mono text-rose-100">{attemptedRoute}</code> has been blocked by DPxSOLUTION centralized security middleware.
            </p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Your active authenticated persona is <strong>{currentRole.replace('_', ' ')}</strong> ({userDisplayName}). In compliance with institutional audit regulations, cross-role traversal between separated portals is strictly restricted.
            </p>
          </div>

          {/* Incident Telemetry Box */}
          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs space-y-1.5 text-slate-300">
            <div className="flex justify-between items-center text-[11px] text-slate-400 border-b border-slate-800/80 pb-1">
              <span>Security Event Telemetry</span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>{timestamp} UTC</span>
              </span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-500">Authenticated Role:</span>
              <span className="font-bold text-indigo-400">{currentRole}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-500">Target Route:</span>
              <span className="font-bold text-rose-400">{attemptedRoute}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-500">Permitted Portal:</span>
              <span className="font-bold text-emerald-400">{authorizedRoute}</span>
            </div>
          </div>

          {/* Auto Redirect Notice */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="flex items-center space-x-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-slate-500 animate-spin" />
              <span>
                Automatic return to authorized dashboard in <strong>{countdown}s</strong>
              </span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <button
              onClick={() => onReturnToPortal(authorizedRoute)}
              className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Return to {authorizedPortalConfig?.name || 'Your Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onLogout}
              className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-slate-400" />
              <span>Logout & Re-Authenticate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
