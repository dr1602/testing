import { describe, expect, it } from 'vitest';

import { range } from '../utils';

describe('utils', () => {
  describe('example tests', () => {
    it('checks that 1 equals 1', () => {
      expect(1).toEqual(1);
    });
    it('checks that 2 equals 2', () => {
      expect(2).toEqual(2);
    });
  });

  describe('range', () => {
    it('returns correct result from 1 to 6 range', () => {
      const result = range(1, 6);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('returns correct result from 41 to 45 range', () => {
      const result = range(41, 45);
      expect(result).toEqual([41, 42, 43, 44]);
    });
  });
});
