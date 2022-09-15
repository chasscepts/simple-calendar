import { getMonthDates } from '../utilities';

describe('getMonthDates', () => {
  it('gets the correct dates when month starts on a Sunday', () => {
    expect(getMonthDates(4, 2022)).toStrictEqual([
      0, 0, 0, 0, 0, 0, 1,
      2, 3, 4, 5, 6, 7, 8,
      9, 10, 11, 12, 13, 14, 15,
      16, 17, 18, 19, 20, 21, 22,
      23, 24, 25, 26, 27, 28, 29,
      30, 31,
    ]);
  });

  it('gets the correct dates when month starts on a Monday', () => {
    expect(getMonthDates(7, 2022)).toStrictEqual([
      1, 2, 3, 4, 5, 6, 7,
      8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28,
      29, 30, 31,
    ]);
  });

  it('gets the correct dates when month starts on other weekdays', () => {
    expect(getMonthDates(10, 2023)).toStrictEqual([
      0, 0, 1, 2, 3, 4, 5,
      6, 7, 8, 9, 10, 11, 12,
      13, 14, 15, 16, 17, 18, 19,
      20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30,
    ]);
  });

  it('gets the correct dates in normal february', () => {
    expect(getMonthDates(1, 2022)).toStrictEqual([
      0, 1, 2, 3, 4, 5, 6,
      7, 8, 9, 10, 11, 12, 13,
      14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27,
      28,
    ]);
  });

  it('gets the correct dates in leap year february', () => {
    expect(getMonthDates(1, 2024)).toStrictEqual([
      0, 0, 0, 1, 2, 3, 4,
      5, 6, 7, 8, 9, 10, 11,
      12, 13, 14, 15, 16, 17, 18,
      19, 20, 21, 22, 23, 24, 25,
      26, 27, 28, 29,
    ]);
  });
});
