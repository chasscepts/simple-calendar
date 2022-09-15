export const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
];

export const emojis = {
  happy: '🙂',
  fair: '😐',
  sad: '😡',
};

/**
 * Fills an array with dates of the month.
 * This array behaves like a flattened 2-d array with Sunday as the last column.
 * Empty starting cells (if any) are filled with zeros.
 * @param {number} month 0 indexed month
 * @param {number} year year under consideration
 */
export const getMonthDates = (month, year) => {
  const firstDayWeekDay = new Date(year, month, 1).getDay();
  // 0th day of next month is last day of this month.
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  const dates = [];

  let startDate = 1;
  let emptyCellsAtStart = 0;

  if (firstDayWeekDay === 0) {
    emptyCellsAtStart = 6;
  } else if (firstDayWeekDay > 1) {
    emptyCellsAtStart = firstDayWeekDay - 1;
  }

  if (emptyCellsAtStart > 0) {
    for (let i = 0; i < emptyCellsAtStart; i += 1) {
      dates.push(0);
    }
  }

  for (let i = 1; i <= daysInMonth; i += 1) {
    dates.push(i);
  }

  return dates;
};
