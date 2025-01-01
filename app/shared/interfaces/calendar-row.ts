import jsPDF from "jspdf";
import { Vector2 } from "../types/vector2.type";

export interface CalendarRow {
  getHeight(): number;
  draw(doc: jsPDF, topLeft: Vector2): void;
}