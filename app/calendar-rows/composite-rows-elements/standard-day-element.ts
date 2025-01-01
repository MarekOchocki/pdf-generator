import jsPDF from "jspdf";
import { CompositeRowElement } from "../composite-row";
import { Vector2 } from "../../shared/types/vector2.type";
import { getTextDimensions } from "../../shared/utils/text-dimensions";
import { CalendarConfig, DaySquareConfig } from "../../shared/interfaces/calendar-config";

export class StandardDayElement implements CompositeRowElement {
  private readonly dayNumberMargin = 2;
  private readonly underlineHeight = 1;
  private readonly underlineBottomMargin = 3;
  private readonly underlineHorizontalMargin = 5;
  
  private readonly descriptionHorizontalMargin = 3;
  private readonly descriptionBottomMargin = this.underlineHeight + this.underlineBottomMargin - 1;

  constructor(
    private width: number,
    private height: number,
    private dayNumber: number,
    private config: DaySquareConfig,
    private calendarConfig: CalendarConfig 
  ) {
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  draw(doc: jsPDF, topLeft: Vector2): void {
    if(this.config.backgroundColor) {
      this.drawBackgroundColor(doc, topLeft, this.config.backgroundColor);
    }
    if(this.config.underlineColor) { 
      this.drawUnderline(doc, topLeft, this.config.underlineColor);
    }
    if(this.config.dayDescription) { 
      this.drawDescription(doc, topLeft, this.config.dayDescription);
    }
    this.drawDayNumber(doc, topLeft);
  }

  private drawUnderline(doc: jsPDF, topLeft: Vector2, color: string): void {
    const prevColor = doc.getFillColor();
    doc.setFillColor(color);
    const left = topLeft.x + this.underlineHorizontalMargin;
    const top = topLeft.y + this.height - this.underlineBottomMargin - this.underlineHeight;
    const width = this.width - this.underlineHorizontalMargin * 2;
    doc.roundedRect(left, top, width, this.underlineHeight, this.underlineHeight / 2, this.underlineHeight / 2, 'F');
    doc.setFillColor(prevColor);
  }

  private drawBackgroundColor(doc: jsPDF, topLeft: Vector2, color: string): void {
    const prevColor = doc.getFillColor();
    doc.setFillColor(color);
    doc.rect(topLeft.x, topLeft.y, this.width, this.height, 'F');
    doc.setFillColor(prevColor);
  }

  private drawDayNumber(doc: jsPDF, topLeft: Vector2): void {
    doc.setFontSize(12);
    const text = `${this.dayNumber}`;
    const textDimensions = getTextDimensions(doc, text, this.width);
    const centeredLeft = topLeft.x + this.width - this.dayNumberMargin - textDimensions.w;
    doc.text(text, centeredLeft, topLeft.y + textDimensions.h + this.dayNumberMargin, {maxWidth: this.width});
  }

  private drawDescription(doc: jsPDF, topLeft: Vector2, description: string): void {
    const prevColor = doc.getTextColor();
    doc.setFontSize(8);
    doc.setTextColor(this.calendarConfig.defaultDescriptionFontColor);
    const maxWidth = this.width - this.descriptionHorizontalMargin * 2;
    const text = `${description}`.toUpperCase();
    const textDimensions = getTextDimensions(doc, text, maxWidth);
    const left = topLeft.x + this.width / 2
    const top = topLeft.y + this.height - textDimensions.h - this.descriptionBottomMargin;
    doc.text(text, left, top, {maxWidth, align: 'center'});
    doc.setTextColor(prevColor);
  }
}