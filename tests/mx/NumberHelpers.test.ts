import { expect, test } from 'vitest';
import { getNumberWithSuffix, timeToString } from '../../src/utils/NumberHelpers.js';

test('test number suffixes', () => {
  const testCases = {
    1: "1st",
    2: "2nd",
    3: "3rd",
    4: "4th",
    5: "5th",
    11: "11th",
    12: "12th",
    13: "13th",
    14: "14th",
    21: "21st",
    22: "22nd",
    23: "23rd",
    31: "31st"
  };

  Object.entries(testCases).forEach(([num, expectedNumberWithSuffix]) => {
    expect(getNumberWithSuffix(Number(num))).toBe(expectedNumberWithSuffix);
  });
});

describe('time to string', () => {
  it('should return correct positive values', () => {
    expect(timeToString(1)).toBe("0:01.000");
    expect(timeToString(119.564)).toBe("1:59.564");
    expect(timeToString(605)).toBe("10:05.000");
  });

  it('should return correct negative values', () => {
    expect(timeToString(-1)).toBe("-0:01.000");
    expect(timeToString(-119.564)).toBe("-1:59.564");
    expect(timeToString(-605)).toBe("-10:05.000");
  });
});
