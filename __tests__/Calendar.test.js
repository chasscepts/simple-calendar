import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react-native';
import Calendar from '../components/Calendar';
import { weekdays } from '../utilities';
import { dates, month, year } from '../utilities/testProps';
import { View } from 'react-native';

describe('Calendar', () => {
  describe('snapshot', () => {
    beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date(2022, 8, 14));
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('renders correctly', () => {
      const tree = renderer.create(<Calendar dates={dates} month={month} year={year} />);
      expect(tree.toJSON()).toMatchSnapshot();
      tree.unmount();
    });
  });

  it('displays the month and year', () => {
    const testID = 'calendar';
    const { queryByTestId } = render(
      <View testID={testID}>
        <Calendar dates={dates} month={month} year={year} />
      </View>
    );
    expect(queryByTestId(testID)).toHaveTextContent('September, 2022');
  });

  it('displays the weekday headings', () => {
    const testID = 'calendar';
    const { queryByTestId } = render(
      <View testID={testID}>
        <Calendar dates={dates} month={month} year={year} />
      </View>
    );
    const node = queryByTestId(testID);
    weekdays.forEach((w) => (
      expect(node).toHaveTextContent(w)
    ))
  });

  it('displays the 30 days of september', () => {
    const testID = 'calendar';
    const { queryByTestId } = render(
      <View testID={testID}>
        <Calendar dates={dates} month={month} year={year} />
      </View>
    );
    const node = queryByTestId(testID);
    [...Array(30)].map((_, idx) => idx + 1).forEach((num) => (
      expect(node).toHaveTextContent(num)
    ))
  });
});
