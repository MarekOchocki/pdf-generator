import jsPDF from "jspdf";
import { CompositeRowElement } from "../composite-row";
import { Vector2 } from "../../shared/types/vector2.type";
import { CalendarConfig } from "../../shared/interfaces/calendar-config";

export class EmptyRowElement implements CompositeRowElement {
  
  constructor(private width: number, private height: number, config: CalendarConfig) {
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  draw(doc: jsPDF, topLeft: Vector2): void {
    const prevColor = doc.getFillColor();
    doc.setFillColor("#efede0");
    doc.rect(topLeft.x, topLeft.y, this.width, this.height, 'F');
    doc.setFillColor(prevColor);
  }
}