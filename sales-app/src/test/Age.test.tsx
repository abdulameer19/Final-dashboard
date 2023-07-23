import { render, screen } from '@testing-library/react';
import { AgeCount } from '../components/AgeCount';
import { Provider } from 'react-redux';
import store from '../store/store';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-chartjs-2', () => ({
  Radar: () => <div data-testid='radar-chart-mock'></div>,
}));

test('renders Age count chart', () => {
  render(
    <Provider store={store}>
      <AgeCount />
    </Provider>
  );
});
