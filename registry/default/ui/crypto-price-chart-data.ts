export type ChartDataPoint = {
  time: string;
  price: number;
};

export const oneHourData: ChartDataPoint[] = [
  { time: "10:00", price: 51210 },
  { time: "10:10", price: 51240 },
  { time: "10:20", price: 51190 },
  { time: "10:30", price: 51280 },
  { time: "10:40", price: 51220 },
  { time: "10:50", price: 51310 },
  { time: "11:00", price: 51290 },
];

export const oneDayData: ChartDataPoint[] = [
  { time: "00:00", price: 33000 },
  { time: "03:00", price: 32500 },
  { time: "06:00", price: 20000 },
  { time: "09:00", price: 38000 },
  { time: "12:00", price: 29000 },
  { time: "15:00", price: 39500 },
  { time: "18:00", price: 24000 },
  { time: "21:00", price: 41000 },
  { time: "23:59", price: 43500 },
];
export const oneWeekData: ChartDataPoint[] = [
  { time: "Mon", price: 42000 },
  { time: "Tue", price: 43800 },
  { time: "Wed", price: 41000 },
  { time: "Thu", price: 46000 },
  { time: "Fri", price: 48000 },
  { time: "Sat", price: 47000 },
  { time: "Sun", price: 43800 },
];

export const oneMonthData: ChartDataPoint[] = [
  { time: "Week 1", price: 35000 },
  { time: "Week 2", price: 39000 },
  { time: "Week 3", price: 42000 },
  { time: "Week 4", price: 46000 },
  { time: "Week 5", price: 45300 },
];

export const oneYearData: ChartDataPoint[] = [
  { time: "Jan", price: 22000 },
  { time: "Feb", price: 25000 },
  { time: "Mar", price: 28000 },
  { time: "Apr", price: 31000 },
  { time: "May", price: 29000 },
  { time: "Jun", price: 35000 },
  { time: "Jul", price: 38000 },
  { time: "Aug", price: 42000 },
  { time: "Sep", price: 45000 },
  { time: "Oct", price: 48000 },
  { time: "Nov", price: 50000 },
  { time: "Dec", price: 52000 },
];

export const allTimeData: ChartDataPoint[] = [
  { time: "2018", price: 8000 },
  { time: "2019", price: 12000 },
  { time: "2020", price: 18000 },
  { time: "2021", price: 45000 },
  { time: "2022", price: 30000 },
  { time: "2023", price: 38000 },
  { time: "2024", price: 52000 },
];

export const cryptoChartData = {
  "1H": oneHourData,
  "1D": oneDayData,
  "1W": oneWeekData,
  "1M": oneMonthData,
  "1Y": oneYearData,
  "ALL": allTimeData,
};