import { render, screen } from '@testing-library/react';
import { AgeCount } from '../components/AgeCount';
import { Provider } from 'react-redux';
import store from '../store/store';
import '@testing-library/jest-dom/extend-expect';
import { OccupationData } from '../components/OccupationData';

jest.mock('react-chartjs-2', () => ({
  Bar: () => <div data-testid='radar-chart-mock-occupation'></div>,
}));

test('renders occupation data chart', () => {
  render(
    <Provider store={store}>
      <OccupationData />
    </Provider>
  );
});
