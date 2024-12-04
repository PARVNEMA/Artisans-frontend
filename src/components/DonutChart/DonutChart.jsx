import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const DonutChart = ({ value }) => {
  const data = [
    { name: "Completed", value: value },
    { name: "Remaining", value: 100 - value },
  ];

  const COLORS = ["#4caf50", "#d2d3d4"];

  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default DonutChart;
