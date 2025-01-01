
export interface CalendarConfigDayObject {
  date: string;
  description: string;
}

export interface CalendarConfigCategory {
  name: string;
  days: string[] | CalendarConfigDayObject[];
  config: DaySquareConfig
}

export interface DaySquareConfig {
  backgroundColor?: string;
  underlineColor?: string
  dayDescription?: string;
}

export interface CalendarConfig {
  categories: CalendarConfigCategory[];
  dayNames: string[];
  monthNames: string[];
  year: number;
  borderColor: string;
  borderWidth: number;
  defaultDescriptionFontColor: string;
  monthNameFontColor: string,
  emptyDayConfig?: DaySquareConfig,
  weekDaysConfig: DaySquareConfig[]
}
