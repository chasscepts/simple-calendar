import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLOR = '#666';

const CELL_WIDTH = `${100 / 7}%`;

const styles = StyleSheet.create({
  container: {

  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    paddingTop: 5,
    paddingStart: 10,
    color: COLOR,
  },
  headerRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    overFlowX: 'hidden',
    paddingTop: 10,
    paddingBottom: 5,
    width: '100%',
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: COLOR,
    width: CELL_WIDTH,
  },
  datesPanel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  cell: {
    width: CELL_WIDTH,
    height: 75,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 32,
  },
  date: {
    color: COLOR,
    fontSize: 20,
  }
});

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
];

const emojis = {
  happy: '🙂',
  fair: '😐',
  sad: '😡',
};

const getMonthDates = (month, year) => {
  const firstDayWeekDay = new Date(year, month, 1).getDay();
  // 0th day of next month is last day of this month.
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  const dates = [];

  let startDate = 1;
  let emptyCellsAtStart = 0;

  if (firstDayWeekDay === 0) {
    emptyCellsAtStart = 6;
    startDate = 2;
  } else if (firstDayWeekDay > 1) {
    emptyCellsAtStart = firstDayWeekDay - 1;
  }

  if (emptyCellsAtStart > 0) {
    for (let i = 0; i < emptyCellsAtStart; i += 1) {
      dates.push(0);
    }
  }

  for (let i = startDate; i <= daysInMonth; i += 1) {
    dates.push(i);
  }

  return dates;
};

const Cell = ({ date, mood, isToday }) => {
  if (date === 0) {
    return <View style={styles.cell} />
  }

  return (
    <View style={styles.cell}>
      {mood && (
        <Text accessibilityRole="image" accessibilityLabel={mood} style={styles.emoji}>
          {emojis[mood]}
        </Text>
      )}
      <Text style={[styles.date, { fontWeight: isToday? 'bold' : 'normal' }]}>
        {date}
      </Text>
    </View>
  );
};

const Calendar = ({ dates, month, year }) => {
  //  Assumption: month props is 1 indexed.
  const monthIndex = month - 1;

  const moods = dates.reduce((prev, current) => {
    prev[current.date] = current.mood;
    return prev;
  }, Object.create(null));

  const today = new Date();
  const isSameMonth = today.getMonth() === monthIndex && today.getFullYear() === year;
  const date = today.getDate();

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>
          {`${months[monthIndex]}, ${year}`}
        </Text>
      </View>
      <View style={styles.headerRow}>
        {weekdays.map((day) => <Text style={styles.header}>{day}</Text>)}
      </View>
      <View style={styles.datesPanel}>
        {getMonthDates(monthIndex, year).map((d) => (
          <Cell
            date={d}
            mood={moods[d]}
            isToday={isSameMonth && (d === date)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Calendar;
