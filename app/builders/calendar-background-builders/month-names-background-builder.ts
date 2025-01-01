import jsPDF from "jspdf";
import { CalendarBackgroundBuilder } from "../calendar-background-builder";
import { CalendarConfig } from "../../shared/interfaces/calendar-config";

export class MonthNamesBackgroundBuilder implements CalendarBackgroundBuilder {
  constructor(private width: number, private config: CalendarConfig) {
  }
  
  addBackgroundToCurrentPage(doc: jsPDF, monthIndex: number): void {
    const prevColor = doc.getTextColor();
    const prevFont = doc.getFont();
    doc.setTextColor(this.config.monthNameFontColor);
    doc.setFontSize(80);
    doc.setFont('BeVietnamProThin');
    const text = `${this.config.monthNames[monthIndex]}`.toUpperCase();
    doc.text(text, this.width / 2, 90, {maxWidth: this.width, align: 'center'});
    doc.setTextColor(prevColor);
    doc.setFont(prevFont.fontName, prevFont.fontStyle);
  }
}