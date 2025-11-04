import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDateToLocal, generatePagination } from '@/app/lib/utils';
import { Revenue } from '@/app/lib/definitions';

describe('Utility Functions', () => {
  describe('formatCurrency', () => {
    it('should format cents to dollars', () => {
      expect(formatCurrency(1000)).toBe('$10.00');
      expect(formatCurrency(1234)).toBe('$12.34');
      expect(formatCurrency(100000)).toBe('$1,000.00');
    });

    it('should handle zero', () => {
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('should handle large numbers', () => {
      expect(formatCurrency(1000000)).toBe('$10,000.00');
    });
  });

  describe('formatDateToLocal', () => {
    it('should format date correctly', () => {
      const date = '2024-01-15';
      const formatted = formatDateToLocal(date);
      expect(formatted).toContain('2024');
    });

    it('should handle different locales', () => {
      const date = '2024-01-15';
      const formatted = formatDateToLocal(date, 'en-US');
      expect(formatted).toBeTruthy();
    });
  });

  describe('generatePagination', () => {
    it('should generate pagination for small number of pages', () => {
      const pages = generatePagination(1, 5);
      expect(pages).toEqual([1, 2, 3, 4, 5]);
    });

    it('should generate pagination with ellipsis when needed', () => {
      const pages = generatePagination(1, 10);
      expect(pages).toEqual([1, 2, 3, '...', 9, 10]);
    });

    it('should handle current page in middle', () => {
      const pages = generatePagination(5, 10);
      expect(pages).toEqual([1, '...', 4, 5, 6, '...', 10]);
    });

    it('should handle current page near end', () => {
      const pages = generatePagination(9, 10);
      expect(pages).toEqual([1, 2, '...', 8, 9, 10]);
    });
  });
});

