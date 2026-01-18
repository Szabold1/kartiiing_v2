export interface IFastestLap {
  category: string;
  engineType: string;
  driverName: string;
  driverCountryCode?: string;
  lapTime: number;
  sessionType: string;
  date: string;
  eventTitle?: string;
}