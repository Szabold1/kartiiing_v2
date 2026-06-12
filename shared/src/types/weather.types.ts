export interface IWeatherCondition {
  name: string;
  icon?: string;
}

interface ITemperature {
  min: number;
  max: number;
  avg?: number;
}

interface IWind {
  speed?: number;
  gust?: number;
}

export interface IWeatherDataDay {
  date: string;
  condition: IWeatherCondition;
  temp: ITemperature;
  wind: IWind;
  precipitationMm?: number;
}
