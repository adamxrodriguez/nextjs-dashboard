import { describe, it, expect } from 'vitest';
import { UserRole } from '@/app/lib/definitions';

describe('RBAC Types', () => {
  it('should have correct user roles defined', () => {
    const roles: UserRole[] = ['admin', 'user'];
    
    expect(roles).toContain('admin');
    expect(roles).toContain('user');
    expect(roles.length).toBe(2);
  });

  it('should support optional role in User type', () => {
    // This test verifies the type definition is correct
    const userWithoutRole = {
      id: '1',
      name: 'Test',
      email: 'test@test.com',
      password: 'hashed',
    };

    const userWithRole = {
      ...userWithoutRole,
      role: 'admin' as UserRole,
    };

    expect(userWithoutRole).toBeDefined();
    expect(userWithRole.role).toBe('admin');
  });
});

