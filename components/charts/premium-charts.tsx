"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { ChartPoint } from "@/types/business";

const colors = ["#38bdf8", "#8b5cf6", "#34d399", "#f59e0b", "#f472b6"];

const tooltipStyle = {
  background: "rgba(2, 6, 23, 0.92)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 16,
  color: "white"
};

export const RevenueAreaChart = ({ data }: { data: ChartPoint[] }) => (
  <ResponsiveContainer width="100%" height={320}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.55} />
          <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
      <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} />
      <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
      <Tooltip contentStyle={tooltipStyle} />
      <Area type="monotone" dataKey="revenue" stroke="#38bdf8" strokeWidth={3} fill="url(#revenue)" />
    </AreaChart>
  </ResponsiveContainer>
);

export const ChannelDonutChart = ({ data }: { data: { name: string; value: number }[] }) => (
  <ResponsiveContainer width="100%" height={260}>
    <PieChart>
      <Pie data={data} dataKey="value" nameKey="name" innerRadius={72} outerRadius={104} paddingAngle={4}>
        {data.map((entry, index) => (
          <Cell key={entry.name} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip contentStyle={tooltipStyle} />
    </PieChart>
  </ResponsiveContainer>
);

export const GrowthLineChart = ({ data }: { data: ChartPoint[] }) => (
  <ResponsiveContainer width="100%" height={260}>
    <LineChart data={data}>
      <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
      <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} />
      <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
      <Tooltip contentStyle={tooltipStyle} />
      <Line type="monotone" dataKey="customers" stroke="#34d399" strokeWidth={3} dot={false} />
      <Line type="monotone" dataKey="conversion" stroke="#8b5cf6" strokeWidth={3} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

export const PerformanceBarChart = ({ data }: { data: ChartPoint[] }) => (
  <ResponsiveContainer width="100%" height={260}>
    <BarChart data={data}>
      <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
      <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} />
      <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
      <Tooltip contentStyle={tooltipStyle} />
      <Bar dataKey="orders" fill="#8b5cf6" radius={[10, 10, 0, 0]} />
      <Bar dataKey="ai" fill="#38bdf8" radius={[10, 10, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);
