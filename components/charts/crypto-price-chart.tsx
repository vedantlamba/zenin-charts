"use client";
import { BitcoinPiggyBankIcon, Mining03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  TooltipContentProps,
  YAxis,
} from "recharts";
import { useId } from "react";

type TabKey = "1H" | "1D" | "1W" | "1M" | "1Y" | "ALL";
const Tabs: TabKey[] = ["1H", "1D", "1W", "1M", "1Y", "ALL"];

const getRangeLabels = (range: TabKey) => {
  switch (range) {
    case "1H":
      return { low: "Hour Low", high: "Hour High" };
    case "1D":
      return { low: "Today's Low", high: "Today's High" };
    case "1W":
      return { low: "Week Low", high: "Week High" };
    case "1M":
      return { low: "Month Low", high: "Month High" };
    case "1Y":
      return { low: "Year Low", high: "Year High" };
    case "ALL":
      return { low: "All-T Low", high: "All-T High" };
    default:
      return { low: "Low", high: "High" };
  }
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export interface CryptoPriceChartProps {
  title: string;
  quantityOwned: number;
  chartData: Record<TabKey, { time: string; price: number }[]>;
}

export const CryptoPriceChart = ({
  title,
  quantityOwned,
  chartData,
}: CryptoPriceChartProps) => {
  const [hoverPrice, setHoverPrice] = useState<number | null>(null);
  const [active, setActive] = useState<TabKey>("1D");
  const data = chartData[active];
  const low = Math.min(...data.map((d) => d.price));
  const high = Math.max(...data.map((d) => d.price));
  const currentPrice = data[data.length - 1].price;
  const firstPrice = data[0].price;
  const lastPrice = data[data.length - 1].price;
  const displayPrice = hoverPrice ?? lastPrice;
  const { low: lowLabel, high: highLabel } = getRangeLabels(active);
  const percentageChange = ((lastPrice - firstPrice) / firstPrice) * 100;
  const layoutScope = useId();

  return (
    <div className="w-80 h-80 bg-neutral-900 dark:bg-neutral-950 rounded-3xl border-3 border-double border-neutral-500 dark:border-neutral-800 p-4 text-neutral-100">
      <div className="flex flex-col gap-2 h-full">
        <ChartHeader
          quantityOwned={quantityOwned}
          displayPrice={displayPrice}
          percentageChange={percentageChange}
          title={title}
        />
        <MainChart
          active={active}
          setHoverPrice={setHoverPrice}
          chartData={chartData}
        />
        <ChartTabs
          active={active}
          setActive={setActive}
          layoutScope={layoutScope}
        />
        <ChartFooter
          quantityOwned={quantityOwned}
          high={high}
          low={low}
          currentPrice={currentPrice}
          lowLabel={lowLabel}
          highLabel={highLabel}
        />
      </div>
    </div>
  );
};

const MainChart = ({
  active,
  setHoverPrice,
  chartData,
}: {
  active: TabKey;
  setHoverPrice: React.Dispatch<React.SetStateAction<number | null>>;
  chartData: Record<TabKey, { time: string; price: number }[]>;
}) => {
  return (
    <div className="flex-1 w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData[active]}
          onMouseMove={(state) => {
            const rawIndex = state?.activeTooltipIndex;
            if (rawIndex !== undefined && rawIndex !== null) {
              const index = Number(rawIndex);
              const data = chartData[active];
              if (!Number.isNaN(index) && data[index]) {
                setHoverPrice(data[index].price);
              }
            }
          }}
          onMouseLeave={() => {
            setHoverPrice(null);
          }}
        >
          <Area
            dataKey="price"
            type="linear"
            stroke="#FF6500"
            strokeWidth={2}
            fill="url(#membersFillGradient)"
            activeDot={{
              r: 3,
              fill: "#ffffff",
              stroke: "#FA6868",
              strokeWidth: 1,
            }}
          />
          <Tooltip content={CustomToolTip} cursor={false} />
          {/* 
          <YAxis
            dataKey="price"
            width={30}
            tickCount={7}
            
            domain={["dataMin - 2000", "dataMax + 2000"]}
            tickLine={false}
            tickFormatter={formatCompactNumber}
            axisLine={false}
            tick={{ fontSize: 10, fill: "#FAF3E1" }}
          /> */}

          <defs>
            <linearGradient
              id="membersFillGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#FF6500" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#FF6500" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FF6500" stopOpacity="0" />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomToolTip = ({
  active,
  payload,
  label,
}: TooltipContentProps) => {
  if (!active || !payload?.length || !label) return null;
  return (
    <div>
      {payload.map((entry) => {
        const value = entry.value as number;

        return (
          <span
            key={String(entry.dataKey)}
            className="text-white rounded-sm px-1.5 py-0.5 bg-[#13b677] text-[11px] font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] flex gap-1"
          >
            <span>{entry.payload.time}</span>
            {formatCurrency(value)}
          </span>
        );
      })}
    </div>
  );
};

type ChartTabsProps = {
  active: TabKey;
  setActive: React.Dispatch<React.SetStateAction<TabKey>>;
  layoutScope: string;
};

const ChartTabs = ({ active, setActive, layoutScope }: ChartTabsProps) => {
  return (
    <div className="flex gap-1.5 p-1">
      {Tabs.map((tab) => {
        const isActive = active === tab;
        return (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className="relative flex-1 text-[11px] cursor-pointer rounded-md py-1 bg-linear-to-b from-neutral-600
             to-neutral-800 dark:bg-linear-to-b dark:from-neutral-800 dark:to-neutral-900 text-neutral-400 hover:text-white transition-colors duration-200"
          >
            {isActive && (
              <motion.div
                layoutId={`chartActiveTab-${layoutScope}`}
                transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                className="absolute inset-0 bg-linear-to-b from-orange-400 to-orange-700 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
              />
            )}
            <span className={cn("relative z-20", isActive && "text-white")}>
              {tab}
            </span>
          </button>
        );
      })}
    </div>
  );
};

interface ChartFooterProps {
  low: number;
  high: number;
  quantityOwned: number;
  currentPrice: number;
  lowLabel: string;
  highLabel: string;
}

const ChartFooter = ({
  low,
  high,
  quantityOwned,
  currentPrice,
  lowLabel,
  highLabel,
}: ChartFooterProps) => {
  const holdingsValue = currentPrice * quantityOwned;
  return (
    <div className="w-full h-14 bg-neutral-800 dark:bg-neutral-900 rounded-b-2xl rounded-t-sm flex items-center justify-center">
      <div className="flex-1 flex flex-col items-center gap-0.5">
        <span className="text-[11px] text-neutral-400">{lowLabel}</span>
        <span className="text-sm font-light">{formatCurrency(low)}</span>
      </div>
      <div className="w-px h-8 bg-neutral-700/60" />
      <div className="flex-1 flex flex-col items-center gap-0.5 px-2">
        <span className="text-[11px]">Holdings</span>
        <span className="text-sm text-[#16C784] font-semibold line-clamp-1">
          {formatCurrency(holdingsValue)}
        </span>
      </div>
      <div className="w-px h-8 bg-neutral-700/60" />

      <div className="flex-1 flex flex-col items-center gap-0.5">
        <span className="text-[11px] text-neutral-400">{highLabel}</span>
        <span className="text-sm font-light">{formatCurrency(high)}</span>
      </div>
    </div>
  );
};

const ChartHeader = ({
  title,
  quantityOwned,
  displayPrice,
  percentageChange,
}: {
  title: string;
  quantityOwned: number;
  displayPrice: number;
  percentageChange: number;
}) => {
  const isPositive = percentageChange >= 0;

  return (
    <div className="flex items-center">
      <div className="flex-1 flex gap-3">
        <span className="w-12 h-12 rounded-full  border-2 border-black">
          <span className="bg-linear-to-b from-neutral-600 to-neutral-700 w-full h-full rounded-full flex items-center justify-center border-2 border-neutral-800">
            <HugeiconsIcon icon={BitcoinPiggyBankIcon} />
          </span>
        </span>
        <span className="flex flex-col">
          <span className="text-lg tracking-wide">{title}</span>
          <span className="text-xs text-neutral-500 font-semibold flex gap-1">
            <HugeiconsIcon
              icon={Mining03Icon}
              className="size-4 text-orange-500"
            />
            <span>{quantityOwned}</span>
          </span>
        </span>
      </div>
      <div className="flex-1 flex flex-col text-end">
        <span
          className={cn(
            "text-xs",
            isPositive ? "text-[#16C784]" : "text-red-400",
          )}
        >
          {isPositive ? "+" : ""}
          {percentageChange.toFixed(2)}%
        </span>
        <span className="font-semibold text-[16px]">
          {formatCurrency(displayPrice)}
        </span>
      </div>
    </div>
  );
};
