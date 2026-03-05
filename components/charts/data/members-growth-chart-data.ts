// Example data for the MembersGrowthChart.
// Replace this with your real analytics data.

export type MembersGrowthData = {
  month: string;
  members: number;
};

export type TabKey = "All" | "Active" | "Enrolled";

export const membersData: Record<TabKey, MembersGrowthData[]> = {
  All: [
    { month: "Jan", members: 1200 },
    { month: "Feb", members: 1540 },
    { month: "Mar", members: 1580 },
    { month: "Apr", members: 1565 },
    { month: "May", members: 1620 },
    { month: "Jun", members: 1680 },
    { month: "Jul", members: 1520 },
  ],
  Active: [
    { month: "Jan", members: 420 },
    { month: "Feb", members: 460 },
    { month: "Mar", members: 480 },
    { month: "Apr", members: 270 },
    { month: "May", members: 520 },
    { month: "Jun", members: 160 },
    { month: "Jul", members: 400 },
  ],
  Enrolled: [
    { month: "Jan", members: 480 },
    { month: "Feb", members: 505 },
    { month: "Mar", members: 540 },
    { month: "Apr", members: 525 },
    { month: "May", members: 590 },
    { month: "Jun", members: 632 },
    { month: "Jul", members: 670 },
  ],
};