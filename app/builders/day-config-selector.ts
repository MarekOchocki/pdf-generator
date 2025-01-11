import { CalendarConfig, CalendarConfigCategory, CalendarConfigDayObject, DaySquareConfig } from "../shared/interfaces/calendar-config";


export class DayConfigSelector {
  constructor(private calendarConfig: CalendarConfig) {}

  getConfigForDay(dayNumber: number, monthIndex: number): DaySquareConfig {
    const categoryConfig = this.getConfigFromCategories(dayNumber, monthIndex) ?? {};
    const weekdayConfig = this.getConfigForWeekday(dayNumber, monthIndex) ?? {};
    return {
      ...this.calendarConfig.emptyDayConfig,
      ...weekdayConfig,
      ...categoryConfig
    };
  }

  private getConfigForWeekday(dayNumber: number, monthIndex: number): DaySquareConfig | undefined {
    const date = new Date(this.calendarConfig.year, monthIndex, dayNumber);
    const dayOfTheWeekIndex = (date.getDay() - 1 + 7) % 7;
    return this.calendarConfig.weekDaysConfig[dayOfTheWeekIndex];
  }

  private findCategoryForDay(dayNumber: number, monthIndex: number): CalendarConfigCategory | undefined {
    return this.calendarConfig.categories.find(category => {
      return !!this.findDayInCategory(dayNumber, monthIndex, category);
    });
  }

  private getConfigFromCategories(dayNumber: number, monthIndex: number): DaySquareConfig | undefined {
    const category = this.findCategoryForDay(dayNumber, monthIndex);
    if(!category) return;
    const day = this.findDayInCategory(dayNumber, monthIndex, category);
    if(!day) return;
    if(typeof day === 'string') {
      return category.config;
    }
    return {
      ...category.config,
      dayDescription: day.description ?? category.config.dayDescription
    };
  }

  private findDayInCategory(dayNumber: number, monthIndex: number, category: CalendarConfigCategory): string | CalendarConfigDayObject | undefined {
    return category.days.find(day => {
      const date = typeof day === 'string' ? day : day.date;
      const dateAsObject = new Date(date);
      return dateAsObject.getDate() === dayNumber && dateAsObject.getMonth() === monthIndex;
    })
  }
}