import { jsPDF } from "jspdf"
import { BeVietnamProRegular, BeVietnamProThin } from "../../../src/fonts64/BeVietnam";

export const callAddFont = function (doc: jsPDF) {
  doc.addFileToVFS('GlobalFontRegular.ttf', BeVietnamProRegular);
  doc.addFont('GlobalFontRegular.ttf', 'GlobalFontRegular', 'normal');

  doc.addFileToVFS('BeVietnamProThin.ttf', BeVietnamProThin);
  doc.addFont('BeVietnamProThin.ttf', 'BeVietnamProThin', 'normal');
};
