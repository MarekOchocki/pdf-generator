import jsPDF from "jspdf";
import { CalendarRow } from "../shared/interfaces/calendar-row";
import { Vector2 } from "../shared/types/vector2.type";

export interface CompositeRowElement {
  getWidth(): number;
  getHeight(): number;
  draw(doc: jsPDF, topLeft: Vector2): void;
}

export class CompositeRow implements CalendarRow {
  private height: number;

  constructor(private elements: CompositeRowElement[]) {
    this.height = this.elements.reduce((prev, curr) => {
      return Math.max(prev, curr.getHeight())
    }, 0);
  }

  getHeight(): number {
    return this.height;
  }

  draw(doc: jsPDF, topLeft: Vector2): void {
    let currentTopLeft = topLeft;
    this.elements.forEach(element => {
      element.draw(doc, currentTopLeft);
      currentTopLeft.x += element.getWidth();
    });
  }
}