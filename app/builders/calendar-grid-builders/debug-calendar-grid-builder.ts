import jsPDF from "jspdf";
import { CalendarRow } from "../../shared/interfaces/calendar-row";
import { Vector2 } from "../../shared/types/vector2.type";
import { RowBuilder } from "../row-builder";
import { HorizontalLine } from "../../calendar-rows/horizontal-line-row";
import { CalendarGridBuilder } from "../calendar-grid-builder.type";
import { DayNamesRow } from "../../calendar-rows/day-names-row";
import { CalendarConfig } from "../../shared/interfaces/calendar-config";

export class DebugCalendarGridBuilder implements CalendarGridBuilder {
  private readonly horizontalLineHeight;
  private readonly dayNamesHeight = 4;
  private readonly numberOfWeekRows = 6;

  constructor(private config: CalendarConfig) {
    this.horizontalLineHeight = this.config.borderWidth;
  }

  createRows(doc: jsPDF, topLeft: Vector2, botRight: Vector2, monthIndex: number): CalendarRow[] {
    const rowBuilder = new RowBuilder(this.config);
    const rows: CalendarRow[] = [];
    const width = botRight.x - topLeft.x;
    const height = botRight.y - topLeft.y;
    const weekRowHeight = (height - (this.numberOfWeekRows + 1) * this.horizontalLineHeight - this.dayNamesHeight) / this.numberOfWeekRows;

    const weekRows = rowBuilder.createRowsForMonth(weekRowHeight, width, monthIndex);

    rows.push(new DayNamesRow(this.dayNamesHeight, width, this.config.dayNames));
    weekRows.forEach(weekRow => {
      rows.push(new HorizontalLine(this.horizontalLineHeight, width, this.config.borderColor));
      rows.push(weekRow);
    })
    rows.push(new HorizontalLine(this.horizontalLineHeight, width, this.config.borderColor));
    return rows;
  }
}