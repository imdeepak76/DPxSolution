import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Globe,
  ChevronDown,
  Building2,
  Database,
  Sparkles,
  AlertTriangle,
  LogOut,
  Lock,
  ShieldCheck,
  CheckCircle2,
  User
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { PORTAL_CONFIGS } from '../../auth/rbacMiddleware';

export const Header: React.FC = () => {
  const {
    institute,
    setInstitute,
    currentRole,
    isDrawerOpen,
    setIsDrawerOpen,
    isRTL,
    setIsRTL,
    notices,
    invoices,
    setIsArchitectureModalOpen,
    setActiveModule,
    navigateToRoute,
    userSession,
    logoutUser
  } = useSchool();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showInstituteSelector, setShowInstituteSelector] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const pendingInvoices = invoices.filter(inv => inv.status === 'OVERDUE' || inv.status === 'UNPAID');

  const branches = [
    { name: 'DPx Model International Academy', branch: 'Main Campus - Central Boulevard', code: 'DPX-IND-01' },
    { name: 'DPx Cambridge Senior School', branch: 'West Silicon Annex', code: 'DPX-WST-02' },
    { name: 'DPx Global EdTech Day Boarding', branch: 'North Hills Campus', code: 'DPX-NTH-03' }
  ];

  const portalConfig = userSession?.portalRoute ? PORTAL_CONFIGS[userSession.portalRoute] : null;

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    logoutUser();
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-xs backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Left Side: Brand Logo & Campus Switcher */}
          <div className="flex items-center space-x-3">
            <div
              onClick={() => {
                if (userSession) {
                  navigateToRoute(userSession.portalRoute);
                  setActiveModule('dashboard');
                } else {
                  navigateToRoute('/login');
                }
              }}
              className="flex items-center space-x-2.5 cursor-pointer group"
              title="Return to your authorized portal dashboard"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-violet-500 text-white flex items-center justify-center font-extrabold shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <span className="text-base tracking-tighter">DPx</span>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-base text-slate-900 tracking-tight">DPxSOLUTION</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-indigo-50 text-indigo-700 border border-indigo-200/60 font-bold rounded">
                    ERP
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium truncate max-w-[200px]">
                  {institute.name}
                </p>
              </div>
            </div>

            {/* Campus Switcher Dropdown (Admin & Principal only) */}
            {(currentRole === 'SUPER_ADMIN' || currentRole === 'PRINCIPAL') && (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowInstituteSelector(!showInstituteSelector)}
                  className="flex items-center space-x-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span className="truncate max-w-[150px]">{institute.branchName}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {showInstituteSelector && (
                  <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-1.5 border-b border-slate-100">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Select Institute Campus
                      </p>
                    </div>
                    {branches.map(b => (
                      <button
                        key={b.code}
                        onClick={() => {
                          setInstitute(prev => ({
                            ...prev,
                            name: b.name,
                            branchName: b.branch,
                            code: b.code
                          }));
                          setShowInstituteSelector(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex flex-col space-y-0.5 hover:bg-indigo-50 transition-colors cursor-pointer ${
                          institute.code === b.code ? 'bg-indigo-50/70 border-l-2 border-indigo-600' : ''
                        }`}
                      >
                        <span className="font-semibold text-slate-900">{b.name}</span>
                        <span className="text-[11px] text-slate-500">{b.branch}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Architecture / Schema Launcher (Admin only) */}
            {currentRole === 'SUPER_ADMIN' && (
              <button
                onClick={() => setIsArchitectureModalOpen(true)}
                className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/70 rounded-lg transition-colors cursor-pointer"
                title="View High-Level Architecture & Prisma Schema"
              >
                <Database className="w-3.5 h-3.5 text-indigo-600" />
                <span>Architecture</span>
              </button>
            )}

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Recent Alerts & Notices"
              >
                <Bell className="w-5 h-5" />
                {(pendingInvoices.length > 0 || notices.length > 0) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-xs text-slate-900">Notifications & Alerts</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-rose-100 text-rose-700 font-bold">
                        {pendingInvoices.length + notices.length}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400">Live Campus Feeds</span>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {pendingInvoices.slice(0, 2).map(inv => (
                      <div key={inv.id} className="p-3 hover:bg-slate-50 text-xs">
                        <div className="flex items-center space-x-1.5 text-rose-600 font-semibold mb-0.5">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span>Fee Overdue: {inv.studentName}</span>
                        </div>
                        <p className="text-slate-600 text-[11px]">
                          Invoice {inv.invoiceNo} of ${inv.amount} ({inv.className}) requires cashier resolution.
                        </p>
                      </div>
                    ))}

                    {notices.slice(0, 3).map(not => (
                      <div key={not.id} className="p-3 hover:bg-slate-50 text-xs">
                        <div className="flex items-center justify-between text-indigo-700 font-medium mb-0.5">
                          <span className="truncate">{not.title}</span>
                          <span className="text-[10px] text-slate-400">{not.publishDate}</span>
                        </div>
                        <p className="text-slate-600 text-[11px] line-clamp-2">{not.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RTL / LTR Toggle */}
            <button
              onClick={() => setIsRTL(!isRTL)}
              className="hidden sm:flex items-center space-x-1 px-2 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              title="Toggle LTR / RTL Direction"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span className="uppercase text-[10px]">{isRTL ? 'RTL' : 'LTR'}</span>
            </button>

            {/* LOCKED AUTHENTICATED USER BADGE (NO ROLE SWITCHER) */}
            {userSession && (
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    {userSession.displayName.charAt(0)}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[140px]">
                      {userSession.displayName}
                    </p>
                    <div className="flex items-center space-x-1 text-[10px]">
                      <Lock className="w-2.5 h-2.5 text-indigo-600 shrink-0" />
                      <span className="font-semibold text-indigo-700 font-mono">
                        {currentRole}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Explicit Logout Button */}
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
                  title="Sign out of DPxSOLUTION and invalidate current session"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            )}

            {/* Right Drawer Toggle Button (Only for Super Admin, Principal, Accountant, Teacher) */}
            {userSession && (
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="flex items-center space-x-1.5 px-3 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer"
                title="Open Modules Navigation Drawer"
              >
                <Menu className="w-4 h-4" />
                <span className="hidden sm:inline">Menu</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-slate-900">Sign Out of DPxSOLUTION?</h3>
              <p className="text-xs text-slate-500">
                This will immediately invalidate your <strong>{currentRole}</strong> session tokens and purge cached application credentials.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Active Persona:</span>
                <span className="font-bold text-slate-900">{userSession?.displayName}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Role Environment:</span>
                <span className="font-mono text-indigo-700 font-bold">{currentRole}</span>
              </div>
            </div>

            <div className="flex gap-2.5 pt-1">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Confirm Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
