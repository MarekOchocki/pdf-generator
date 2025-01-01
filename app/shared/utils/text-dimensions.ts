import jsPDF from "jspdf";

export function getTextDimensions(doc: jsPDF, str: string, maxWidth: number): {w: number, h: number} {
  const splitText = doc.splitTextToSize(str, maxWidth);
  return doc.getTextDimensions(splitText, {maxWidth});
}