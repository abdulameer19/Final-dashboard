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
import { getSalesVSTarget } from '../store/reducers/salesVSTarget.reducer';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const SalesVSTarget = (props: any) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: any) => state.salesVSTarget);
console.log("salevstarg",data)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  // Custom colors for the bars
  const colors = {
    actualSales: 'rgba(255, 99, 132, 0.7)',
    targetSales: 'rgba(54, 162, 235, 0.7)',
  };

  const chaseBarData = {
    labels: data.map((e: any) => e.productName),
    datasets: [
      {
        label: 'Actual Sales',
        data: data.map((e: any) => e.totalSellProduct),
        backgroundColor: colors.actualSales,
        borderColor: colors.actualSales.replace('0.7', '1'),
        borderWidth: 1,
      },
      {
        label: 'Target Sales',
        data: data.map((e: any) => e.expectedSellProduct),
        backgroundColor: colors.targetSales,
        borderColor: colors.targetSales.replace('0.7', '1'),
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    dispatch<any>(getSalesVSTarget());
  }, [dispatch]);

  return (
    <div style={{ height: '500px' }}>
      <Bar
        style={{ width: '100%', height: '100%' }}
        options={options}
        data={chaseBarData}
      />
    </div>
  );
};
