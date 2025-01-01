import { jsPDF } from "jspdf";
import { CalendarGridBuilder } from "./builders/calendar-grid-builder.type";
import { Vector2 } from "./shared/types/vector2.type";
import { DebugCalendarGridBuilder } from "./builders/calendar-grid-builders/debug-calendar-grid-builder";
import { callAddFont } from "./shared/utils/add-fonts";
import { CalendarConfig } from "./shared/interfaces/calendar-config";
import * as calendarConfig from "../src/config.json";
import { CalendarBackgroundBuilder } from "./builders/calendar-background-builder";
import { MonthNamesBackgroundBuilder } from "./builders/calendar-background-builders/month-names-background-builder";

class PdfBuilder {
  constructor(
    private gridBuilder: CalendarGridBuilder,
    private backgroundBuilder: CalendarBackgroundBuilder,
    private pageWidth: number,
    private pageHeight: number
  ) {
  }

  build(doc: jsPDF): void {
    doc.deletePage(1);
    for(let i = 0; i < 12; i++) {
      doc.addPage();
      this.backgroundBuilder.addBackgroundToCurrentPage(doc, i);
      this.addCalendarGridToCurrentPage(doc, i);
    }
  }

  private addCalendarGridToCurrentPage(doc: jsPDF, monthIndex: number): void {
    const xPointer = 20;
    let yPointer = 140;
    const rows = this.gridBuilder.createRows(doc, new Vector2(xPointer, yPointer), new Vector2(this.pageWidth - 20, this.pageHeight - 40), monthIndex);

    rows.forEach(row => {
      row.draw(doc, new Vector2(xPointer, yPointer));
      yPointer += row.getHeight();
    });
  }
}

class PdfFileGenerator {
  private readonly A3Height = 420;
  private readonly A3Width = 297;

  private doc: jsPDF;
  private readonly config: CalendarConfig = calendarConfig;

  constructor() {
    this.doc = new jsPDF({format: [this.A3Width, this.A3Height]});
    this.addFonts();
    this.doc.setFont('GlobalFontRegular');
    this.doc.setTextColor('#523c40');
  }

  buildAndSave(outFilePath: string): void {
    const gridBuilder = new DebugCalendarGridBuilder(this.config);
    const bgBuilder = new MonthNamesBackgroundBuilder(this.A3Width, this.config);
    const builder = new PdfBuilder(gridBuilder, bgBuilder, this.A3Width, this.A3Height);
    builder.build(this.doc);
    this.doc.save(outFilePath);
  }

  private addFonts(): void {
    callAddFont(this.doc);
  }
}


function main(): void {
  const pdfCreator = new PdfFileGenerator();
  pdfCreator.buildAndSave('calendar.pdf');
}

main();