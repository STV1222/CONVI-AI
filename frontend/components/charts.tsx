import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartStyle = {
  fontSize: 12,
};

const riskColors = ["#34d399", "#fbbf24", "#f87171"];

export function ScheduleProgressChart({
  data,
}: {
  data: Array<{ name: string; planned: number; actual: number }>;
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid vertical={false} stroke="rgba(148,163,184,0.12)" />
        <XAxis dataKey="name" stroke="#94a3b8" tick={chartStyle} axisLine={false} tickLine={false} />
        <YAxis stroke="#94a3b8" tick={chartStyle} axisLine={false} tickLine={false} />
        <Tooltip cursor={{ fill: "rgba(15,23,42,0.7)" }} contentStyle={{ background: "#020617", border: "1px solid rgba(148,163,184,0.2)", borderRadius: 16 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="planned" fill="#38bdf8" radius={[10, 10, 0, 0]} />
        <Bar dataKey="actual" fill="#22c55e" radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function BudgetForecastChart({
  data,
}: {
  data: Array<{ name: string; budget: number; forecast: number }>;
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid vertical={false} stroke="rgba(148,163,184,0.12)" />
        <XAxis dataKey="name" stroke="#94a3b8" tick={chartStyle} axisLine={false} tickLine={false} />
        <YAxis stroke="#94a3b8" tick={chartStyle} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ background: "#020617", border: "1px solid rgba(148,163,184,0.2)", borderRadius: 16 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line type="monotone" dataKey="budget" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
        <Line type="monotone" dataKey="forecast" stroke="#f97316" strokeWidth={3} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function ResourceUtilizationChart({
  data,
}: {
  data: Array<{ week: string; crews: number; equipment: number }>;
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid vertical={false} stroke="rgba(148,163,184,0.12)" />
        <XAxis dataKey="week" stroke="#94a3b8" tick={chartStyle} axisLine={false} tickLine={false} />
        <YAxis stroke="#94a3b8" tick={chartStyle} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ background: "#020617", border: "1px solid rgba(148,163,184,0.2)", borderRadius: 16 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line type="monotone" dataKey="crews" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
        <Line type="monotone" dataKey="equipment" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function RiskDistributionChart({
  data,
}: {
  data: Array<{ label: string; value: number }>;
}) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} innerRadius={58} outerRadius={84} paddingAngle={4} dataKey="value" nameKey="label">
          {data.map((entry, index) => (
            <Cell key={entry.label} fill={riskColors[index % riskColors.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ background: "#020617", border: "1px solid rgba(148,163,184,0.2)", borderRadius: 16 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
