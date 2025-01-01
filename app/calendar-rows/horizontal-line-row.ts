import jsPDF from "jspdf";
import { CalendarRow } from "../shared/interfaces/calendar-row";
import { Vector2 } from "../shared/types/vector2.type";

export class HorizontalLine implements CalendarRow {
  constructor(private height: number, private width: number, private color: string) {}  

  getHeight(): number {
    return this.height;
  }

  draw(doc: jsPDF, topLeft: Vector2): void {
    doc.setDrawColor(this.color);
    doc.setFillColor(this.color);
    doc.rect(topLeft.x, topLeft.y, this.width, this.height, 'F');
  }
}