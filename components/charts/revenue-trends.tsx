"use client";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "next-themes";

const apiData = [
  { month: "Jan", profit: 14000, loss: 22000 },
  { month: "Feb", profit: 23000, loss: 17000 },
  { month: "Mar", profit: 19000, loss: 14000 },
  { month: "Apr", profit: 18000, loss: 20000 },
  { month: "May", profit: 26000, loss: 17000 },
  { month: "Jun", profit: 20000, loss: 27000 },
  { month: "Jul", profit: 19000, loss: 21000 },
  { month: "Aug", profit: 17000, loss: 14000 },
];

const GAP = Math.max(
  Math.max(...apiData.map((d) => d.profit + d.loss)) * 0.05,
  5,
);

const data = apiData.map((item) => ({
  ...item,
  gap: GAP,
}));

const formatCurrency = (num: number) => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
    style: "currency",
    currency: "USD",
  }).format(num);
};

export const RevenueTrends = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  return (
    <div className="h-80 w-[340px] md:w-96 border border-neutral-200/70 dark:border-neutral-800 rounded-xl shadow-xs flex flex-col gap-4 p-4 bg-white dark:bg-neutral-950">
      <div className="flex flex-col gap-1">
        <span className="text-lg font-semibold text-primary">Total Income</span>
        <p className="text-xs text-muted-foreground">
          View your income in a certain period of time
        </p>
      </div>
      <div className="p-4 bg-[#F6F6F6] dark:bg-neutral-900 flex-1 rounded-xl flex flex-col gap-3">
        <div className="flex justify-between">
          <span className="text-xs font-medium">Profit and Loss</span>
          <div className="flex gap-3 text-xs font-medium">
            <span className="flex gap-2 items-center">
              <span className="w-2.5 h-2.5 rounded-[2.8px] bg-[#FF5A5A] block" />
              Profit
            </span>
            <span className="flex gap-2 items-center">
              <span className="w-2.5 h-2.5 rounded-[2.8px] bg-[#262626] dark:bg-[#E5E5E5] block" />
              Loss
            </span>
          </div>
        </div>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 11,
                  letterSpacing: "0.07em",
                  fill: isDark ? "#E5E7EB" : "#6B7280",
                }}
                axisLine={false}
                tickMargin={8}
                tickLine={false}
              />

              <Bar
                dataKey="loss"
                stackId="a"
                fill={isDark ? "#E5E5E5" : "#262626"}
                radius={[6, 6, 6, 6]}
              />
              <Bar dataKey="gap" stackId="a" fill="transparent" />
              <Bar
                dataKey="profit"
                stackId="a"
                fill="url(#profitStripes)"
                radius={[6, 6, 6, 6]}
              />
              <Tooltip content={CustomTooltip} cursor={false} />
              <defs>
                <pattern
                  id="profitStripes"
                  patternUnits="userSpaceOnUse"
                  width="5"
                  height="5"
                  patternTransform="rotate(45)"
                >
                  <rect width="5" height="5" fill="#FF5A5A" />
                  <line
                    x1="0"
                    y="0"
                    x2="0"
                    y2="5"
                    stroke="rgba(255, 255, 255, 0.678)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: TooltipContentProps) => {
  if (!active || !payload) return null;

  const profit = Number(payload.find((p) => p.dataKey === "profit")?.value);
  const loss = Number(payload.find((p) => p.dataKey === "loss")?.value);

  return (
    <div className="px-2 py-1.5 rounded-md bg-[#F6F6F6] dark:bg-neutral-900 text-black dark:text-white text-xs flex flex-col gap-1 shadow-md border border-white dark:border-neutral-800">
      {/* Month */}
      <span className="text-neutral-800 dark:text-neutral-300 font-semibold">
        {label}
      </span>

      {/* Profit */}
      <div className="flex justify-between items-center gap-6">
        <span className="flex gap-2 items-center">
          <span className="w-2.5 h-2.5 rounded-[2.8px] bg-[#FF5A5A]" />
          Profit
        </span>
        <span className="font-semibold">{formatCurrency(profit)}</span>
      </div>

      {/* Loss */}
      <div className="flex justify-between items-center gap-6">
        <span className="flex gap-2 items-center">
          <span className="w-2.5 h-2.5 rounded-[2.8px] bg-[#262626] dark:bg-[#E5E5E5]" />
          Loss
        </span>
        <span className="font-semibold">{formatCurrency(loss)}</span>
      </div>
    </div>
  );
};
