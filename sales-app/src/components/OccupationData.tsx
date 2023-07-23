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
import { getOccupation } from '../store/reducers/occupation.reducer';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const OccupationData = (props: any) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: any) => state.occupationData);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const barData = {
    labels: data.map((e: any) => e.occupationName),
    datasets: [
      {
        label: 'Dataset 1',
        data: data.map((e: any) => e.number),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  useEffect(() => {
    dispatch<any>(getOccupation());
  }, [dispatch]);
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
