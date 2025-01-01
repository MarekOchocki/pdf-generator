import jsPDF from "jspdf";
import { CalendarRow } from "../shared/interfaces/calendar-row";
import { Vector2 } from "../shared/types/vector2.type";

export class EmptyRow implements CalendarRow {
  constructor(private height: number, private width: number) {}

  getHeight(): number {
    return this.height;
  }

  draw(doc: jsPDF, topLeft: Vector2): void {
    return; // intentionally empty
  }
}
