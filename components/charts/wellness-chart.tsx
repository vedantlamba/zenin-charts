"use client";
import { cn } from "@/lib/utils";
import {
  Activity01Icon,
  ArrowDown01Icon,
  Fire03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useId, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";

type MetricType = "mood" | "energy" | "sleep" | "focus";
type TimeRange = "Today" | "Weekly" | "Monthly";

type DayData = {
  day: string;
  value: number;
};

type WellnessData = {
  [key in MetricType]: DayData[];
};

type WellnessTimeData = {
  [key in TimeRange]: WellnessData;
};

type Insight = {
  label: string;
  value: string;
};

export const wellnessData: WellnessTimeData = {
  Weekly: {
    sleep: [
      { day: "Mon", value: 6.2 },
      { day: "Tue", value: 8.1 },
      { day: "Wed", value: 9.2 },
      { day: "Thu", value: 7.0 },
      { day: "Fri", value: 5.8 },
      { day: "Sat", value: 8.7 },
      { day: "Sun", value: 9.1 },
    ],

    mood: [
      { day: "Mon", value: 6 },
      { day: "Tue", value: 7 },
      { day: "Wed", value: 8 },
      { day: "Thu", value: 6 },
      { day: "Fri", value: 5 },
      { day: "Sat", value: 9 },
      { day: "Sun", value: 8 },
    ],

    energy: [
      { day: "Mon", value: 5 },
      { day: "Tue", value: 7 },
      { day: "Wed", value: 8 },
      { day: "Thu", value: 6 },
      { day: "Fri", value: 5 },
      { day: "Sat", value: 9 },
      { day: "Sun", value: 8 },
    ],

    focus: [
      { day: "Mon", value: 4 },
      { day: "Tue", value: 6 },
      { day: "Wed", value: 7 },
      { day: "Thu", value: 6 },
      { day: "Fri", value: 5 },
      { day: "Sat", value: 8 },
      { day: "Sun", value: 7 },
    ],
  },

  Monthly: {
    sleep: [
      { day: "Jan", value: 6.5 },
      { day: "Feb", value: 7.2 },
      { day: "Mar", value: 8.4 },
      { day: "Apr", value: 7.1 },
      { day: "May", value: 6.8 },
      { day: "Jun", value: 8.9 },
      { day: "Jul", value: 9.3 },
    ],
    mood: [
      { day: "Jan", value: 6 },
      { day: "Feb", value: 7 },
      { day: "Mar", value: 8 },
      { day: "Apr", value: 7 },
      { day: "May", value: 6 },
      { day: "Jun", value: 9 },
      { day: "Jul", value: 8 },
    ],
    energy: [
      { day: "Jan", value: 5 },
      { day: "Feb", value: 6 },
      { day: "Mar", value: 7 },
      { day: "Apr", value: 6 },
      { day: "May", value: 5 },
      { day: "Jun", value: 8 },
      { day: "Jul", value: 9 },
    ],
    focus: [
      { day: "Jan", value: 5 },
      { day: "Feb", value: 6 },
      { day: "Mar", value: 7 },
      { day: "Apr", value: 6 },
      { day: "May", value: 5 },
      { day: "Jun", value: 8 },
      { day: "Jul", value: 7 },
    ],
  },

  Today: {
    sleep: [
      { day: "6AM", value: 4 },
      { day: "9AM", value: 5 },
      { day: "12PM", value: 6 },
      { day: "3PM", value: 5 },
      { day: "6PM", value: 4 },
      { day: "9PM", value: 8 },
      { day: "12AM", value: 9 },
    ],
    mood: [
      { day: "6AM", value: 5 },
      { day: "9AM", value: 6 },
      { day: "12PM", value: 7 },
      { day: "3PM", value: 6 },
      { day: "6PM", value: 5 },
      { day: "9PM", value: 8 },
      { day: "12AM", value: 7 },
    ],
    energy: [
      { day: "6AM", value: 4 },
      { day: "9AM", value: 6 },
      { day: "12PM", value: 7 },
      { day: "3PM", value: 6 },
      { day: "6PM", value: 5 },
      { day: "9PM", value: 7 },
      { day: "12AM", value: 6 },
    ],
    focus: [
      { day: "6AM", value: 3 },
      { day: "9AM", value: 6 },
      { day: "12PM", value: 7 },
      { day: "3PM", value: 6 },
      { day: "6PM", value: 5 },
      { day: "9PM", value: 6 },
      { day: "12AM", value: 4 },
    ],
  },
};

function getLevelText(value: number, metric: MetricType) {
  if (metric === "sleep") {
    if (value >= 9) return "excellent rest";
    if (value >= 7) return "well rested";
    if (value >= 5) return "decent sleep";
    return "poor sleep";
  }

  if (metric === "energy") {
    if (value >= 8) return "high energy";
    if (value >= 6) return "good energy";
    if (value >= 4) return "moderate energy";
    return "low energy";
  }

  if (metric === "focus") {
    if (value >= 8) return "deep focus";
    if (value >= 6) return "solid focus";
    if (value >= 4) return "average focus";
    return "low focus";
  }

  if (metric === "mood") {
    if (value >= 8) return "great mood";
    if (value >= 6) return "positive mood";
    if (value >= 4) return "neutral mood";
    return "low mood";
  }

  return "";
}

function getConnector(range: TimeRange) {
  if (range === "Today") return "at";
  if (range === "Weekly") return "on";
  return "in";
}

function getInsight(data: DayData[], metric: MetricType, range: TimeRange) {
  const maxItem = data.reduce((prev, curr) =>
    curr.value > prev.value ? curr : prev,
  );

  const levelText = getLevelText(maxItem.value, metric);
  const connector = getConnector(range);

  return {
    label: `You had ${levelText}`,
    value: `${connector} ${maxItem.day}`,
  };
}

export const WellnessChart = () => {
  const [metric, setMetric] = useState<MetricType>("sleep");
  const [selected, setSelected] = useState<TimeRange>("Weekly");
  const options: TimeRange[] = ["Today", "Weekly", "Monthly"];
  const data = wellnessData[selected][metric];
  const segmentedControls: MetricType[] = ["mood", "energy", "sleep", "focus"];
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const layoutScope = useId();
  const insight = getInsight(data, metric, selected);

  return (
    <div className="h-80 w-96 rounded-xl shadow-xs p-1 bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-none">
      <div className="rounded-lg w-full h-full bg-neutral-50 dark:bg-neutral-900 p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm">
          <span className="flex gap-2 items-center">
            <span>
              <HugeiconsIcon icon={Activity01Icon} className="size-5" />
            </span>
            <span className="font-medium">Your Progress</span>
          </span>
          <TimeRangeDropdown
            options={options}
            selected={selected}
            setSelected={setSelected}
          />
        </div>

        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="day"
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
                dataKey="value"
                barSize={20}
                radius={[25, 25, 25, 25]}
                fill="url(#barGradient)"
                filter="url(#barGlow)"
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F6F0D7" stopOpacity={0.4} />
                  <stop offset="25%" stopColor="#C5D89D" stopOpacity={0.95} />
                  <stop offset="65%" stopColor="#9CAB84" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#89986D" stopOpacity={1} />
                </linearGradient>

                <filter
                  id="barGlow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <SegmentedControl
          segmentedControls={segmentedControls}
          metric={metric}
          setMetric={setMetric}
          layoutScope={layoutScope}
        />

        <InsightCard insight={insight} />
      </div>
    </div>
  );
};

interface TimeRangeDropdownProps {
  options: TimeRange[];
  selected: TimeRange;
  setSelected: React.Dispatch<React.SetStateAction<TimeRange>>;
}

export const TimeRangeDropdown = ({
  selected,
  setSelected,
  options,
}: TimeRangeDropdownProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: TimeRange) => {
    setSelected(value);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs
        bg-neutral-50 dark:bg-neutral-800 border-2 border-white dark:border-neutral-700 cursor-pointer w-24 justify-center"
      >
        {selected}
        <HugeiconsIcon icon={ArrowDown01Icon} className="size-3.5" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute z-50 right-0 top-9 h-auto w-full rounded-lg bg-neutral-50 dark:bg-neutral-800 border-2 border-white dark:border-neutral-700 cursor-pointer px-3 py-2 flex flex-col gap-1.5 text-xs shadow-xs"
          >
            {options.map((item, index) => {
              return (
                <span
                  onClick={() => handleSelect(item)}
                  key={index}
                  className={cn(
                    "text-neutral-400 dark:text-neutral-500",
                    item === selected && "text-neutral-800 dark:text-white",
                  )}
                >
                  {item}
                </span>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface SegmentedControlProps {
  segmentedControls: MetricType[];
  metric: MetricType;
  setMetric: React.Dispatch<React.SetStateAction<MetricType>>;
  layoutScope: string;
}

export const SegmentedControl = ({
  segmentedControls,
  metric,
  setMetric,
  layoutScope,
}: SegmentedControlProps) => {
  return (
    <div className="flex gap-1.5">
      {segmentedControls.map((item, index) => {
        const isActive = item === metric;
        return (
          <button
            onClick={() => setMetric(item)}
            className={cn(
              "relative flex-1 rounded-xl py-1.5 px-2.5 bg-neutral-50 dark:bg-neutral-800 cursor-pointer border-2 border-white dark:border-neutral-700 text-sm capitalize",
            )}
            key={index}
          >
            {isActive && (
              <motion.div
                layoutId={`chartActiveTab-${layoutScope}`}
                transition={{ type: "spring", duration: 0.4 }}
                className="absolute inset-0 rounded-xl bg-black dark:bg-neutral-100 text-white dark:text-neutral-900   border-2 border-neutral-300 dark:border-neutral-200"
              />
            )}
            <span
              className={cn(
                "relative z-20",
                isActive && "text-white dark:text-neutral-800",
              )}
            >
              {item}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export const InsightCard = ({ insight }: { insight: Insight }) => {
  return (
    <div className="rounded-lg py-1.5 px-1.5 bg-neutral-50 dark:bg-neutral-800 border-2 border-white dark:border-neutral-700">
      <AnimatePresence mode="wait">
        <motion.p
          key={insight.label + insight.value}
          initial={{ opacity: 0, y: 2, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -2, filter: "blur(3px)" }}
          transition={{ duration: 0.25 }}
          className="text-sm text-center text-muted-foreground tracking-wide"
        >
          {insight.label}{" "}
          <span className="text-primary whitespace-nowrap font-medium">
            {insight.value}
          </span>
        </motion.p>
      </AnimatePresence>
    </div>
  );
};
