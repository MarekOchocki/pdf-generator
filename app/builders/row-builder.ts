import { CompositeRow, CompositeRowElement } from "../calendar-rows/composite-row";
import { EmptyRowElement } from "../calendar-rows/composite-rows-elements/empty-row-element";
import { StandardDayElement } from "../calendar-rows/composite-rows-elements/standard-day-element";
import { VerticalLine } from "../calendar-rows/composite-rows-elements/vertical-line";
import { CalendarConfig } from "../shared/interfaces/calendar-config";
import { CalendarRow } from "../shared/interfaces/calendar-row";
import { DayConfigSelector } from "./day-config-selector";

export class RowBuilder {
  private readonly lineWidth;
  private readonly numberOfDays = 7;
  private readonly dayConfigSelector: DayConfigSelector;

  constructor(private config: CalendarConfig) {
    this.dayConfigSelector = new DayConfigSelector(this.config);
    this.lineWidth = this.config.borderWidth;
  }

  createRowsForMonth(height: number, width: number, monthIndex: number): CalendarRow[] {
    const dayWidth = (width - (this.numberOfDays + 1) * this.lineWidth) / this.numberOfDays;
    const firstDay = new Date(this.config.year, monthIndex, 1);
    const firstDayWeekDay = (firstDay.getDay() + 5) % this.numberOfDays;
    const dayElementsByWeek: CompositeRowElement[][] = [];
    for(let week = 0; week < 6; week++) {
      const currentWeek = []
      for(let i = 0; i < this.numberOfDays; i++) {
        const element = this.createElement(height, dayWidth, i + week * 7 - firstDayWeekDay, monthIndex);
        currentWeek.push(element);
      }
      dayElementsByWeek.push(currentWeek);
    }
    const filteredDayElementsByWeek = dayElementsByWeek.filter(week => !week.every(dayElement => dayElement instanceof EmptyRowElement));
    return filteredDayElementsByWeek.map(week => this.createWeekRow(height, week));
  }

  private createElement(height: number, dayWidth: number, dayNumber: number, monthIndex: number): CompositeRowElement {
    if(!this.isValidDayNumber(dayNumber, monthIndex)) {
      return new EmptyRowElement(dayWidth, height, this.config);
    }
    const dayConfig = this.dayConfigSelector.getConfigForDay(dayNumber, monthIndex);
    return new StandardDayElement(dayWidth, height, dayNumber, dayConfig, this.config);
  }

  private createWeekRow(height: number, dayElements: CompositeRowElement[]): CalendarRow {
    const elements: CompositeRowElement[] = [];
    elements.push(new VerticalLine(this.lineWidth, height, this.config.borderColor));
    for(let i = 0; i < this.numberOfDays; i++) {
      elements.push(dayElements[i]);
      elements.push(new VerticalLine(this.lineWidth, height, this.config.borderColor));
    }
    return new CompositeRow(elements);
  }

  private isValidDayNumber(dayNumber: number, monthIndex: number): boolean {
    const maxDay = new Date(this.config.year, monthIndex+1, 0).getDate();
    return dayNumber <= maxDay && dayNumber > 0;
  }
}