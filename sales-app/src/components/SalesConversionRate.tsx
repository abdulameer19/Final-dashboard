import React from "react";
import { Line } from "react-chartjs-2";
import { ChartOptions} from "chart.js";

interface SalesConversionGraphProps {
  data: number[]; // Conversion rate data (percentage) for each month
  labels: string[]; // Labels for the X-axis (months)
}

const SalesConversionRate: React.FC<SalesConversionGraphProps> = ({
  data,
  labels,
}) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Conversion Rate (%)",
        data: data,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.4)",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${Number(value).toFixed(0)}%`, // Ensure value is treated as a number
        },
      },
    },
  };

  return (
    <div>
      <h2>Sales Conversion Rate Over Time</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SalesConversionRate;
