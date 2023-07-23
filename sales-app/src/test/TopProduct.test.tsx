import { render, screen } from '@testing-library/react';
import { AgeCount } from '../components/AgeCount';
import { Provider } from 'react-redux';
import store from '../store/store';
import '@testing-library/jest-dom/extend-expect';
import { OccupationData } from '../components/OccupationData';
import { TopProductSell } from '../components/TopProductSell';

jest.mock('react-chartjs-2', () => ({
  Bar: () => <div data-testid='radar-chart-mock-occupation'></div>,
}));

test('renders Top Products chart', () => {
  render(
    <Provider store={store}>
      <TopProductSell />
    </Provider>
  );
});
