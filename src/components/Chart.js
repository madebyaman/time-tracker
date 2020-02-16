import React from "react";
import { Doughnut } from "react-chartjs-2";

const Chart = ({ categories }) => {
  const data = {
    labels: categories.map(category => category.name),
    datasets: [
      {
        data: categories.map(category => category.blocks * 15),
        backgroundColor: categories.map(category => category.color)
      }
    ]
  };

  return <Doughnut data={data} />;
};

export default Chart;
