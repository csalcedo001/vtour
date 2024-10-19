import { generateRandomNumber } from './index';

describe('generateRandomNumber function', () => {
  test('generates a number within the specified range', () => {
    expect(generateRandomNumber(1, 10)).toBeGreaterThanOrEqual(1);
    expect(generateRandomNumber(1, 10)).toBeLessThanOrEqual(10);
  });

  test('handles cases where min is greater than max', () => {
    expect(generateRandomNumber(10, 1)).toBeGreaterThanOrEqual(1);
    expect(generateRandomNumber(10, 1)).toBeLessThanOrEqual(10);
  });
});