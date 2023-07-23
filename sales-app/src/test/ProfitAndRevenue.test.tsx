import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/store';
import '@testing-library/jest-dom/extend-expect';
import { ProfitAndRevenue } from '../components/ProfitAndRevenue';

jest.mock('react-chartjs-2', () => ({
  Bar: () => <div data-testid='radar-chart-mock-occupation'></div>,
}));

test('renders bar chart', () => {
  render(
    <Provider store={store}>
      <ProfitAndRevenue />
    </Provider>
  );
});
