interface ICondition {
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
  condition: ICondition;
  temp: ITemperature;
  wind: IWind;
  humidity?: number;
  precipitationMm?: number;
}
