import jsPDF from "jspdf";
import { Vector2 } from "../shared/types/vector2.type";
import { CalendarRow } from "../shared/interfaces/calendar-row";

export interface CalendarGridBuilder {
  createRows(doc: jsPDF, topLeft: Vector2, botRight: Vector2, monthIndex: number): CalendarRow[];
}