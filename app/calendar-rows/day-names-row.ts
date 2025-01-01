import jsPDF from "jspdf";
import { CalendarRow } from "../shared/interfaces/calendar-row";
import { Vector2 } from "../shared/types/vector2.type";
import { getTextDimensions } from "../shared/utils/text-dimensions";

export class DayNamesRow implements CalendarRow {
  constructor(private height: number, private width: number, private dayNames: string[]) {
    this.dayNames = this.dayNames.map(name => name.toUpperCase());
  }
  
  getHeight(): number {
    return this.height;
  }
  
  draw(doc: jsPDF, topLeft: Vector2): void {
    const cellWidth = this.width / 7;
    const currentTopLeft = {...topLeft};
    for(let i = 0; i < 7; i++) {
      this.drawCell(doc, currentTopLeft, cellWidth, this.dayNames[i]);
      currentTopLeft.x += cellWidth;
    }
  }

  private drawCell(doc: jsPDF, topLeft: Vector2, width: number, text: string): void {
    // TODO: set font and color
    doc.setFontSize(12);
    const textDimensions = getTextDimensions(doc, text, width);
    const centeredLeft = topLeft.x + width / 2 - textDimensions.w / 2;
    doc.text(text, centeredLeft, topLeft.y, {maxWidth: width});
  }
}
