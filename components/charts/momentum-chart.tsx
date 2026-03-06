"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import { DotPattern } from "../ui/dot-pattern";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { Area, AreaChart, ResponsiveContainer, XAxis } from "recharts";
import { useSpring, motion, useTransform } from "motion/react";
import { useEffect } from "react";

const momentumData = [
  { day: "Mon", value: 90000 },
  { day: "Tue", value: 140000 },
  { day: "Wed", value: 175000 },
  { day: "Thu", value: 150000 },
  { day: "Fri", value: 110000 },
  { day: "Sat", value: 200000 },
  { day: "Sun", value: 264802.43 },
];

export const MomentumChart = () => {
  const lastPrice = momentumData[momentumData.length - 1];
  const priceSpring = useSpring(lastPrice.value, {
    damping: 20,
    stiffness: 300,
  });

  const basePrice = momentumData[0].value;
  const delta = useTransform(priceSpring, (v) => v - basePrice);
  const percentage = useTransform(priceSpring, (v) => {
    const change = v - basePrice;
    return (change / basePrice) * 100;
  });

  const formattedPrice = useTransform(priceSpring, (v) =>
    v.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  );
  const formattedDelta = useTransform(delta, (v) => {
    const sign = v >= 0 ? "+" : "-";
    return `${sign} $${Math.abs(v).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  });

  const formattedPercentage = useTransform(percentage, (v) => {
    const sign = v >= 0 ? "+" : "-";
    return `(${sign}${Math.abs(v).toFixed(2)}%)`;
  });

  const isPositive = useTransform(delta, (v) => v >= 0);
  const deltaColor = useTransform(isPositive, (v) =>
    v ? "#60a5fa" : "#f87171",
  );

  const previousWeekClose = momentumData[0].value;
  const weekComparison = useTransform(priceSpring, (v) => {
    const change = v - previousWeekClose;
    return (change / previousWeekClose) * 100;
  });
  const weekSentence = useTransform(weekComparison, (v) => {
    const sign = v >= 0 ? "+" : "-";
    const word = v >= 0 ? "More" : "Less";

    return `${sign}${Math.abs(v).toFixed(2)}% ${word} than last week`;
  });

  useEffect(() => {
    priceSpring.set(lastPrice.value);
  }, [lastPrice.value]);

  return (
    <div className="w-80 h-80 md:w-120 rounded-4xl overflow-hidden bg-linear-to-l from-neutral-900 via-neutral-800 to-neutral-900 relative md:p-8 p-6 text-white">
      <DotPattern className="text-white/8 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)]" />
      <div className="flex flex-col gap-5">
        <div className="text-2xl flex gap-1">
          <span className="text-neutral-500 font-semibold">$</span>
          <motion.span className="font-light tracking-wide">
            {formattedPrice}
          </motion.span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex gap-2 items-center">
            <HugeiconsIcon
              icon={ArrowUpRight01Icon}
              className="p-1 rounded-full bg-blue-500 text-white size-6"
            />
            <motion.span
              style={{ color: deltaColor }}
              className="font-light text-lg tracking-wide"
            >
              {formattedDelta}
            </motion.span>
            <motion.span className="text-sm">{formattedPercentage}</motion.span>
          </div>
          <div>
            <motion.span className="text-neutral-300 text-xs tracking-wider opacity-80">
              {weekSentence}
            </motion.span>
          </div>
        </div>
        <div className="w-full h-30">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={momentumData}
              margin={{ left: 20, right: 20 }}
              onMouseMove={(state) => {
                const rawIndex = state?.activeTooltipIndex;
                if (rawIndex === null) return;

                const index = Number(rawIndex);
                const point = momentumData[index];
                if (!point) return;
                priceSpring.set(point.value);
              }}
              onMouseLeave={() => {
                priceSpring.set(lastPrice.value);
              }}
            >
              <Area
                type="bump"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fill="transparent"
                filter="url(#line-glow)"
                activeDot={{ r: 5, fill: "#F7F8F0", stroke: "0" }}
              />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{
                  fontSize: 11,
                  fill: "#F7F8F0",
                  letterSpacing: "0.08em",
                }}
                tickFormatter={(value) => value.toUpperCase()}
              />

              <defs>
                <filter
                  id="line-glow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation="10" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
