import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getCanonicalPortalRoute,
  canRoleAccessPortal,
  detectRoleFromIdentifier,
  evaluateRouteGuard,
  ROLE_PORTAL_MAP,
  PORTAL_ROLE_MAP
} from './rbacMiddleware';
import { UserSession } from '../types/auth';

test('getCanonicalPortalRoute correctly maps every role to its exclusive portal', () => {
  assert.equal(getCanonicalPortalRoute('SUPER_ADMIN'), '/portal/admin');
  assert.equal(getCanonicalPortalRoute('PRINCIPAL'), '/portal/principal');
  assert.equal(getCanonicalPortalRoute('ACCOUNTANT'), '/portal/accounts');
  assert.equal(getCanonicalPortalRoute('TEACHER'), '/portal/teacher');
  assert.equal(getCanonicalPortalRoute('STUDENT'), '/portal/student');
  assert.equal(getCanonicalPortalRoute('PARENT'), '/portal/parent');
});

test('canRoleAccessPortal enforces strict security isolation', () => {
  // Student cannot access admin or accountant or teacher
  assert.equal(canRoleAccessPortal('STUDENT', '/portal/admin'), false);
  assert.equal(canRoleAccessPortal('STUDENT', '/portal/accounts'), false);
  assert.equal(canRoleAccessPortal('STUDENT', '/portal/teacher'), false);
  assert.equal(canRoleAccessPortal('STUDENT', '/portal/student'), true);

  // Accountant cannot access admin or teacher or student
  assert.equal(canRoleAccessPortal('ACCOUNTANT', '/portal/admin'), false);
  assert.equal(canRoleAccessPortal('ACCOUNTANT', '/portal/teacher'), false);
  assert.equal(canRoleAccessPortal('ACCOUNTANT', '/portal/student'), false);
  assert.equal(canRoleAccessPortal('ACCOUNTANT', '/portal/accounts'), true);

  // Teacher cannot access admin or accountant
  assert.equal(canRoleAccessPortal('TEACHER', '/portal/admin'), false);
  assert.equal(canRoleAccessPortal('TEACHER', '/portal/accounts'), false);
  assert.equal(canRoleAccessPortal('TEACHER', '/portal/teacher'), true);

  // Super Admin has master authority
  assert.equal(canRoleAccessPortal('SUPER_ADMIN', '/portal/admin'), true);
});

test('detectRoleFromIdentifier parses user credentials correctly', () => {
  assert.equal(detectRoleFromIdentifier('admin@dpxsolution.edu'), 'SUPER_ADMIN');
  assert.equal(detectRoleFromIdentifier('principal@dpxsolution.edu'), 'PRINCIPAL');
  assert.equal(detectRoleFromIdentifier('accountant@dpxsolution.edu'), 'ACCOUNTANT');
  assert.equal(detectRoleFromIdentifier('teacher.morris@dpxsolution.edu'), 'TEACHER');
  assert.equal(detectRoleFromIdentifier('DPX-2024-001'), 'STUDENT');
  assert.equal(detectRoleFromIdentifier('parent.wright@gmail.com'), 'PARENT');
});

test('evaluateRouteGuard blocks unauthenticated access to protected portals', () => {
  const result = evaluateRouteGuard(null, '/portal/admin');
  assert.equal(result.status, 'REDIRECT_LOGIN');
  assert.equal(result.redirectPath, '/login?unauthorized=true');

  const loginResult = evaluateRouteGuard(null, '/login');
  assert.equal(loginResult.status, 'ALLOWED');
});

test('evaluateRouteGuard intercepts cross-role attempts with 403 Forbidden', () => {
  const studentSession: UserSession = {
    userId: 'usr-std-01',
    emailOrUsername: 'DPX-2024-001',
    displayName: 'Alexander Wright',
    role: 'STUDENT',
    portalType: 'STUDENT_PARENT',
    portalRoute: '/portal/student',
    instituteId: 'inst-01',
    instituteName: 'DPx Model International Academy',
    token: 'test_token',
    mfaVerified: false,
    lastLoginAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 3600000).toISOString()
  };

  const breachAttempt = evaluateRouteGuard(studentSession, '/portal/admin');
  assert.equal(breachAttempt.status, 'FORBIDDEN_403');
  assert.equal(breachAttempt.redirectPath, '/portal/student');
  assert.equal(breachAttempt.userRole, 'STUDENT');
  assert.equal(breachAttempt.attemptedRoute, '/portal/admin');

  // Allowed access for student's own portal
  const allowedAttempt = evaluateRouteGuard(studentSession, '/portal/student');
  assert.equal(allowedAttempt.status, 'ALLOWED');
});
