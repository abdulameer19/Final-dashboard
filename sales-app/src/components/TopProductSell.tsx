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
import { getTopProductSell } from '../store/reducers/topProducts.reducer';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const TopProductSell = (props: any) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: any) => state.topProductsSell);
  const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  const horizontalBarData = {
    labels: data.map((e: any) => e.productName),
    datasets: [
      {
        label: 'Dataset 1',
        data: data.map((e: any) => e.totalSoldQty),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  useEffect(() => {
    dispatch<any>(getTopProductSell());
  }, [dispatch]);
  return (
    <div style={{ height: '500px' }}>
      <Bar
        style={{ width: '100%', height: '100%' }}
        options={options}
        data={horizontalBarData}
      />
    </div>
  );
};
