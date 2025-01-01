import jsPDF from "jspdf";

export interface CalendarBackgroundBuilder {
  addBackgroundToCurrentPage(doc: jsPDF, monthIndex: number): void;
}