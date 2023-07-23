import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getProfitAndRevenueData } from '../store/reducers/profitAndRevenue.reducer';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const ProfitAndRevenue = (props: any) => {
  const dispatch = useDispatch();
  let { data } = useSelector((state: any) => state.profitAndRevenue);
  data = data.slice().reverse();

  console.log(data)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  useEffect(() => {
    dispatch<any>(getProfitAndRevenueData());
  }, [dispatch]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const barData = {
    labels: data.map((e: any) => months[e.month - 1]),
    datasets: [
      {
        label: 'cost',
        data: data.map((e: any) => e.cost),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'revenue',
        data: data.map((e: any) => e.revenue),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'profit',
        data: data.map((e: any) => e.profit),
        backgroundColor: 'rgba(83, 166, 83,0.5)',
      },
    ],
  };
  return (
    <div style={{ height: '500px' }}>
      <Bar
        style={{ width: '100%', height: '100%' }}
        options={options}
        data={barData}
      />
    </div>
  );
};
