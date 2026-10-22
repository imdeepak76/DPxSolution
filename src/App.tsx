/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { SchoolProvider, useSchool } from './context/SchoolContext';
import { Header } from './components/common/Header';
import { RightDrawer, NAV_MODULES } from './components/navigation/RightDrawer';
import { LoginScreen } from './components/auth/LoginScreen';
import { Forbidden403Screen } from './components/auth/Forbidden403Screen';
import {
  SuperAdminPortalView,
  PrincipalPortalView,
  AccountantPortalView,
  TeacherPortalView,
  ParentPortalView
} from './components/dashboard/PortalDashboards';
import { StudentDashboardView } from './components/dashboard/StudentDashboardView';
import { GeneralSettingsModule } from './components/modules/GeneralSettingsModule';
import { ClassesModule } from './components/modules/ClassesModule';
import { SubjectsModule } from './components/modules/SubjectsModule';
import { StudentsModule } from './components/modules/StudentsModule';
import { EmployeesModule } from './components/modules/EmployeesModule';
import { AccountsModule } from './components/modules/AccountsModule';
import { FeeModule } from './components/modules/FeeModule';
import { SalaryModule } from './components/modules/SalaryModule';
import { AttendanceModule } from './components/modules/AttendanceModule';
import { TimeTableModule } from './components/modules/TimeTableModule';
import { HomeworkModule } from './components/modules/HomeworkModule';
import { BehaviourModule } from './components/modules/BehaviourModule';
import { CommunicationModules } from './components/modules/CommunicationModules';
import { AcademicModules } from './components/modules/AcademicModules';
import { ReportsModule } from './components/modules/ReportsModule';
import { CertificateModule } from './components/modules/CertificateModule';
import { WindowModal } from './components/common/WindowModal';
import { ArchitectureModal } from './components/common/ArchitectureModal';
import {
  checkModuleAccess,
  RBAC_ROLE_CAPABILITIES,
  evaluateRouteGuard,
  getCanonicalPortalRoute
} from './auth/rbacMiddleware';
import {
  ShieldAlert,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { PortalRoute } from './types/auth';

const AppContent: React.FC = () => {
  const {
    activeModule,
    setActiveModule,
    currentRole,
    resetAllData,
    institute,
    userSession,
    currentRoute,
    setCurrentRoute,
    navigateToRoute,
    logoutUser
  } = useSchool();

  const [unauthorizedNotice, setUnauthorizedNotice] = useState<string | null>(null);

  // Sync route on initial load and hash navigation
  useEffect(() => {
    const rawHash = typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : '';
    if (rawHash) {
      setCurrentRoute(rawHash);
    }
  }, [setCurrentRoute]);

  // Centralized Route Guard Interception
  const routeCheck = evaluateRouteGuard(userSession, currentRoute);

  // 1. Mandatory Entry Point: Unauthenticated user lands on Unified Login Screen
  if (!userSession || currentRoute === '/login' || routeCheck.status === 'REDIRECT_LOGIN') {
    return (
      <LoginScreen
        unauthorizedNotice={
          routeCheck.status === 'REDIRECT_LOGIN'
            ? routeCheck.reason || 'Session Required: Please authenticate to access the requested portal.'
            : unauthorizedNotice
        }
        onLoginSuccess={session => {
          setUnauthorizedNotice(null);
          navigateToRoute(session.portalRoute);
        }}
      />
    );
  }

  // 2. Strict Cross-Portal Boundary Guard: 403 Forbidden Screen
  if (routeCheck.status === 'FORBIDDEN_403') {
    return (
      <Forbidden403Screen
        currentRole={userSession.role}
        attemptedRoute={routeCheck.attemptedRoute || currentRoute}
        userDisplayName={userSession.displayName}
        onReturnToPortal={(targetRoute: PortalRoute) => {
          navigateToRoute(targetRoute);
          setActiveModule('dashboard');
        }}
        onLogout={logoutUser}
      />
    );
  }

  const currentModuleDef = NAV_MODULES.find(m => m.key === activeModule);

  // Check RBAC Route Guard for specific modules
  const accessCheck = checkModuleAccess(currentRole, activeModule);

  const renderModule = () => {
    // Check module permission
    if (!accessCheck.allowed) {
      const capability = RBAC_ROLE_CAPABILITIES[currentRole];
      return (
        <div className="max-w-2xl mx-auto my-12 bg-white rounded-2xl p-8 border border-rose-200 shadow-xl space-y-6 text-center animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto shadow-inner">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800">
              RBAC Route Guard Enforced
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Access Restricted: {currentRole.replace('_', ' ')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
              {accessCheck.reason}
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-700 font-bold border-b pb-1.5">
              <span>Active Persona: {capability.title}</span>
              <span className="font-mono text-indigo-600">{currentRole}</span>
            </div>
            <p className="text-slate-500 text-[11px]">{capability.description}</p>
            <div className="pt-1">
              <span className="font-bold text-slate-700 block mb-1">Permitted Modules for this Persona:</span>
              <div className="flex flex-wrap gap-1.5">
                {capability.allowedModules.map(modKey => (
                  <button
                    key={modKey}
                    onClick={() => setActiveModule(modKey)}
                    className="px-2 py-1 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[10px] capitalize transition-colors cursor-pointer"
                  >
                    {modKey.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveModule('dashboard')}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-2 cursor-pointer"
            >
              <span>Return to Permitted Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      );
    }

    // Role-specific Portal Dashboard
    if (activeModule === 'dashboard') {
      switch (currentRole) {
        case 'SUPER_ADMIN':
          return <SuperAdminPortalView />;
        case 'PRINCIPAL':
          return <PrincipalPortalView />;
        case 'ACCOUNTANT':
          return <AccountantPortalView />;
        case 'TEACHER':
          return <TeacherPortalView />;
        case 'STUDENT':
          return <StudentDashboardView />;
        case 'PARENT':
          return <ParentPortalView />;
        default:
          return <StudentDashboardView />;
      }
    }

    // Standard Functional Modules
    switch (activeModule) {
      case 'general-settings':
        return <GeneralSettingsModule />;
      case 'classes':
        return <ClassesModule />;
      case 'subject':
        return <SubjectsModule />;
      case 'students':
        return <StudentsModule />;
      case 'employees':
        return <EmployeesModule />;
      case 'account':
        return <AccountsModule />;
      case 'fee':
        return <FeeModule />;
      case 'salary':
        return <SalaryModule />;
      case 'attendance':
        return <AttendanceModule />;
      case 'timetable':
        return <TimeTableModule />;
      case 'homework':
        return <HomeworkModule />;
      case 'behaviour':
        return <BehaviourModule />;
      case 'whatsapp':
        return <CommunicationModules initialTab="whatsapp" />;
      case 'messaging':
        return <CommunicationModules initialTab="messaging" />;
      case 'sms':
        return <CommunicationModules initialTab="sms" />;
      case 'live-class':
        return <AcademicModules initialTab="live" />;
      case 'question-paper':
        return <AcademicModules initialTab="question-paper" />;
      case 'exams':
        return <AcademicModules initialTab="exams" />;
      case 'class-tests':
        return <AcademicModules initialTab="class-tests" />;
      case 'reports':
        return <ReportsModule />;
      case 'certificate':
        return <CertificateModule />;
      default:
        return <SuperAdminPortalView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/80 flex flex-col">
      {/* Strict Session Header (Role Switcher Removed, Explicit Logout Included) */}
      <Header />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderModule()}
      </main>

      {/* Institutional Footer */}
      <footer className="no-print mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
              DPx
            </div>
            <span className="font-bold text-slate-800">DPxSOLUTION</span>
            <span>•</span>
            <span>Strict Session Isolation & Route Guard Architecture</span>
            <span>•</span>
            <span className="text-slate-400 font-mono">v4.8 Enterprise</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                if (window.confirm('Reset all demo data back to default initial values? This will sign you out.')) {
                  resetAllData();
                  logoutUser();
                }
              }}
              className="flex items-center space-x-1 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              title="Reset all localStorage records"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo State</span>
            </button>

            <span className="text-slate-300">|</span>

            <span className="flex items-center space-x-1 text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>ISO 27001 / SOC2 Compliant</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Right Navigation Drawer (Role-Filtered) */}
      <RightDrawer />

      {/* Window-Style Modal Preview System */}
      <WindowModal />

      {/* Architecture & Prisma Schema Modal */}
      <ArchitectureModal />
    </div>
  );
};

export default function App() {
  return (
    <SchoolProvider>
      <AppContent />
    </SchoolProvider>
  );
}
