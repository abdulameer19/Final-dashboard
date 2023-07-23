import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getGenderChart } from '../store/reducers/genderChart.reducer';

ChartJS.register(ArcElement, Tooltip, Legend);

export const GenderChart = (props: any) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: any) => state.genderChart);
  const doughnutData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: '# of Votes',
        data: Object.values(data),
        backgroundColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderColor: ['#ffffff'],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    dispatch<any>(getGenderChart());
  }, [dispatch]);
  return (
    <div style={{ height: '500px' }}>
      <Doughnut  data={doughnutData} />
    </div>
  );
};
