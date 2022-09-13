import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { emojis, getMonthDates, months, weekdays } from '../utilities';

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
        {weekdays.map((day) => <Text key={day} style={styles.header}>{day}</Text>)}
      </View>
      <View style={styles.datesPanel}>
        {getMonthDates(monthIndex, year).map((d, i) => (
          <Cell
            key={i}
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
