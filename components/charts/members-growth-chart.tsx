"use client";
import { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  TooltipContentProps,
  XAxis,
} from "recharts";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { MembersGrowthData, TabKey } from "./data/members-growth-chart-data";
import { useId } from "react";

type MembersGrowthChartProps = {
  data: Record<TabKey, MembersGrowthData[]>;
  date?: string;
  greeting?: string;
  avatar: string;
};

export const MembersGrowthChart = ({
  data,
  date = "March 23, 2026",
  greeting = "Good Morning",
  avatar,
}: MembersGrowthChartProps) => {
  const tabs = Object.keys(data) as TabKey[];
  const [active, setActive] = useState<TabKey>(tabs[2]);

  const currentData = data[active];
  const totalMembers = currentData.reduce((sum, item) => sum + item.members, 0);

  const layoutScope = useId();

  return (
    <div className="w-90  rounded-4xl bg-linear-to-b from-neutral-100 to-neutral-300 relative p-6 shadow-xs">
      <div className="flex flex-col gap-5">
        <ChartHeader date={date} greeting={greeting} avatar={avatar} />
        <div className="rounded-xl bg-linear-to-b from-white via-neutral-200 to-transparent p-[1.5px]">
          <div className="rounded-xl bg-linear-to-b from-neutral-100 to-neutral-300 p-3 shadow-[inset_0_1px_5px_rgba(0,0,0,0.06),inset_0_-6px_12px_rgba(255,255,255,0.55)] flex flex-col gap-2.5">
            <MembersTab
              tabs={tabs}
              active={active}
              setActive={setActive}
              totalMembers={totalMembers}
              layoutScope={layoutScope}
            />
            <CardText />
            <div className="w-full h-20">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData} margin={{ left: 12, right: 12 }}>
                  <Area
                    type="monotone"
                    dataKey="members"
                    stroke="url(#membersStrokeGradient)"
                    fill="url(#membersFillGradient)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    activeDot={{
                      r: 4,
                      fill: "url(#membersDotGradient)",
                      stroke: "#ffffff",
                      strokeWidth: 2,
                    }}
                  />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={6}
                    tick={{
                      fontSize: 11,
                      fill: "#37353E",
                      fontWeight: "400",
                      letterSpacing: "0.08em",
                    }}
                  />
                  <Tooltip
                    content={CustomToolTip}
                    cursor={{ stroke: "#ffffff", strokeWidth: 1.5 }}
                  />
                  <defs>
                    <linearGradient
                      id="membersStrokeGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#FAAC68" />
                      <stop offset="33%" stopColor="#FA6868" />
                      <stop offset="66%" stopColor="#FB88B4" />
                      <stop offset="100%" stopColor="#5272F2" />
                    </linearGradient>
                    <linearGradient
                      id="membersFillGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#FA6868"
                        stopOpacity="0.65"
                      />

                      <stop
                        offset="40%"
                        stopColor="#FA6868"
                        stopOpacity="0.25"
                      />

                      <stop offset="100%" stopColor="#FA6868" stopOpacity="0" />
                    </linearGradient>
                    <radialGradient
                      id="membersDotGradient"
                      cx="50%"
                      cy="50%"
                      r="50%"
                    >
                      <stop offset="0%" stopColor="#37353E" />
                      <stop offset="100%" stopColor="#262626" />
                    </radialGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomToolTip = ({
  active,
  payload,
  label,
}: TooltipContentProps<number, string>) => {
  if (!active || !payload?.length || !label) return null;
  return (
    <div className="bg-linear-to-b from-neutral-900 to-neutral-800 text-white text-xs px-2 py-1 rounded-full">
      {payload.map((entry) => {
        return <span key={entry.dataKey}>{entry.value}</span>;
      })}
    </div>
  );
};

type MembersTabProps = {
  tabs: TabKey[];
  active: TabKey;
  setActive: React.Dispatch<React.SetStateAction<TabKey>>;
  totalMembers: number;
  layoutScope: string;
};
const MembersTab = ({
  tabs,
  active,
  setActive,
  totalMembers,
  layoutScope,
}: MembersTabProps) => {
  const formattedTotalMembers = totalMembers.toLocaleString();
  const digits = formattedTotalMembers.split("");
  return (
    <div className="flex">
      <div className="rounded-lg bg-neutral-200 flex-1 text-[11px] flex items-center justify-between px-1.5 font-semibold text-neutral-400 gap-1 shadow-[inset_0_-2px_6px_rgba(0,0,0,0.08),inset_0_1px_3px_rgba(255,255,255,0.5)]">
        {tabs.map((tab) => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className="relative px-1.5 py-1.5 rounded-md cursor-pointer"
            >
              {isActive && (
                <motion.div
                  layoutId={`membersActiveTab-${layoutScope}`}
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  className="absolute inset-0 bg-white rounded-md shadow-xs"
                />
              )}
              <span
                className={cn(
                  "relative z-10 transition-colors duration-100",
                  isActive ? "text-neutral-800" : "text-neutral-400",
                )}
              >
                {tab}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex-1 flex justify-end flex-col text-end">
        <span className="font-semibold flex justify-end overflow-hidden">
          {digits.map((digit, index) => {
            return (
              <motion.span
                key={index + digit}
                initial={{ y: 30, opacity: 0, filter: "blur(3px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05,
                  ease: "easeOut",
                  bounce: 0.3,
                }}
                className="inline-block text-neutral-800 text-[16px]"
              >
                {digit}
              </motion.span>
            );
          })}
        </span>
        <span className="text-[11px] text-muted-foreground">Total Members</span>
      </div>
    </div>
  );
};

const ChartHeader = ({
  date,
  greeting,
  avatar,
}: {
  date: string;
  greeting: string;
  avatar: string;
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-muted-foreground text-[10px] font-semibold">
          {date}
        </span>
        <span className="font-semibold text-neutral-800 text-[16px]">{greeting}</span>
      </div>
      <div>
        <img
          src={avatar}
          alt="women"
          onError={(e) => {
            e.currentTarget.src = "/mock/women-7.jpeg";
          }}
          className="aspect-square w-10 h-10 object-cover rounded-full"
        />
      </div>
    </div>
  );
};

const CardText = () => {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-neutral-900">Members</span>
      <p className="text-[11px] text-neutral-400 w-60 font-medium text-balance">
        Growth and engagement overview
      </p>
    </div>
  );
};