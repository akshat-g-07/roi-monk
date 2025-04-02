import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BarChartSummary({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(0,0,0,0.85)",
          }}
        />
        <Legend />
        <Bar dataKey="Investment" fill="#8884d8" barSize={35} />
        <Bar dataKey="Revenue" fill="#ffc658" barSize={35} />
      </BarChart>
    </ResponsiveContainer>
  );
}
