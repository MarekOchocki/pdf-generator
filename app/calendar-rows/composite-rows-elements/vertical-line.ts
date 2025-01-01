import jsPDF from "jspdf";
import { CompositeRowElement } from "../composite-row";
import { Vector2 } from "../../shared/types/vector2.type";

export class VerticalLine implements CompositeRowElement {
  constructor(private width: number, private height: number, private color: string) {}

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  draw(doc: jsPDF, topLeft: Vector2): void {
    doc.setDrawColor(this.color);
    doc.setFillColor(this.color);
    doc.rect(topLeft.x, topLeft.y, this.width, this.height, 'F');
  }
}