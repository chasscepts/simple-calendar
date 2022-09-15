import { dates, month, year } from './utilities/testProps';
import Calendar from './components/Calendar';

const App = () => (
  <Calendar dates={dates} month={month} year={year} />
);

export default App;
