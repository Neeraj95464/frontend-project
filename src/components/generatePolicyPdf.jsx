//   // ======= DRAW CONTENT =======
//   drawHeading(policyPage, "Asset Usage & Handling Policy", 16);

//   drawHeading(policyPage, "Purpose");
//   drawParagraph(
//     policyPage,
//     "Laptop computers provide important functionality, allowing employees to have their computing resources at hand..."
//   );

//   drawHeading(policyPage, "Scope");
//   drawParagraph(
//     policyPage,
//     "These procedures apply to all employees who use Company owned laptop. These individuals are hereinafter referred to as 'owners'..."
//   );

//   drawHeading(policyPage, "3.0 Procedures");
//   drawParagraph(
//     policyPage,
//     "The following rules apply to all company-owned laptops:"
//   );

//   drawHeading(policyPage, "3.1 Registering a laptop");
//   drawBullets(policyPage, [
//     "Every laptop must have an owner.",
//     "Departments must maintain a sign-out sheet with make, model, and serial number.",
//     "Updates to ownership must be reported to HR.",
//   ]);

//   drawHeading(policyPage, "3.2 Using a laptop");
//   drawBullets(policyPage, [
//     "Use only for official purposes.",
//     "Do not engage in unlawful or abusive activities.",
//     "Violations may result in disciplinary action.",
//   ]);

//   // Continue same pattern for rest of policy sections...

//   // ===== Page 3: Induction =====
//   const inductionPage = pdfDoc.addPage();
//   let inductionY = inductionPage.getSize().height - 50;
//   inductionPage.drawText("Induction Acknowledgement", {
//     x: 50,
//     y: inductionY,
//     size: 16,
//     font: boldFont,
//     color: rgb(0.2, 0.4, 0.7),
//   });
//   inductionY -= 30;
//   wrapTextAndDrawLines(
//     inductionPage,
//     inductionText,
//     50,
//     inductionY,
//     500,
//     16,
//     font,
//     11
//   );

//   // ===== Save & Download =====
//   const pdfBytes = await pdfDoc.save();
//   const blob = new Blob([pdfBytes], { type: "application/pdf" });
//   const link = document.createElement("a");
//   link.href = URL.createObjectURL(blob);
//   link.download = `Asset_${asset.assetTag || "Acknowledgement"}.pdf`;
//   link.click();
// }

// import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// export async function generatePolicyPdf(asset, assetPhotos) {
//   const pdfDoc = await PDFDocument.create();
//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//   const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

//   // HEADER
//   const page = pdfDoc.addPage();
//   const { width, height } = page.getSize();
//   let y = height - 50;
//   page.drawText("MAHAVIR GROUP", {
//     x: width / 2 - 90,
//     y,
//     size: 24,
//     font: boldFont,
//     color: rgb(0, 0.2, 0.6),
//   });
//   y -= 30;
//   page.drawText("Asset Allocation & Acknowledgement", {
//     x: width / 2 - 130,
//     y,
//     size: 14,
//     font,
//     color: rgb(0.3, 0.3, 0.3),
//   });
//   y -= 40;

//   // TABLE LAYOUT CONFIG
//   const startXLeft = 50;
//   const startXRight = 350;
//   const colLabelWidth = 110;
//   const colValueWidth = 160;
//   const rowHeight = 22;
//   const tableWidth = colLabelWidth + colValueWidth;

//   // DATA
//   const assetDetails = [
//     ["Asset Name", asset.name],
//     ["Asset Tag", asset.assetTag],
//     ["Serial Number", asset.serialNumber],
//     ["Brand", asset.brand],
//     ["Type", asset.assetType],
//     ["Location", asset.locationName],
//     ["Date", new Date().toLocaleDateString()],
//   ];
//   const employeeDetails = [
//     ["Assigned To", asset.assignedUserName || "—"],
//     ["Employee ID", asset.employeeId || "—"],
//     ["Department", asset.department || "—"],
//     ["Employee Location", asset.employeeLocation || "—"],
//   ];

//   // TABLE RENDER ROWS SIDE-BY-SIDE ↑↓
//   const maxRows = Math.max(assetDetails.length, employeeDetails.length);
//   for (let i = 0; i < maxRows; i++) {
//     // LEFT COLUMN
//     if (i < assetDetails.length) {
//       const [label, value] = assetDetails[i];
//       page.drawRectangle({
//         x: startXLeft,
//         y: y - 2,
//         width: tableWidth,
//         height: rowHeight,
//         color: i % 2 === 0 ? rgb(0.96, 0.97, 1) : rgb(1, 1, 1),
//         borderColor: rgb(0.8, 0.8, 0.8),
//         borderWidth: 0.5,
//       });
//       page.drawText(label, {
//         x: startXLeft + 6,
//         y: y + 6,
//         size: 11,
//         font: boldFont,
//         color: rgb(0.1, 0.1, 0.1),
//       });
//       page.drawText((value ?? "—").toString(), {
//         x: startXLeft + colLabelWidth + 14,
//         y: y + 6,
//         size: 11,
//         font,
//         color: rgb(0, 0, 0),
//         maxWidth: colValueWidth - 8,
//       });
//     }
//     // RIGHT COLUMN
//     if (i < employeeDetails.length) {
//       const [label, value] = employeeDetails[i];
//       page.drawRectangle({
//         x: startXRight,
//         y: y - 2,
//         width: tableWidth,
//         height: rowHeight,
//         color: i % 2 === 0 ? rgb(0.96, 0.97, 1) : rgb(1, 1, 1),
//         borderColor: rgb(0.8, 0.8, 0.8),
//         borderWidth: 0.5,
//       });
//       page.drawText(label, {
//         x: startXRight + 6,
//         y: y + 6,
//         size: 11,
//         font: boldFont,
//         color: rgb(0.1, 0.1, 0.1),
//       });
//       page.drawText((value ?? "—").toString(), {
//         x: startXRight + colLabelWidth + 14,
//         y: y + 6,
//         size: 11,
//         font,
//         color: rgb(0, 0, 0),
//         maxWidth: colValueWidth - 8,
//       });
//     }
//     y -= rowHeight;
//   }

//   y -= 16;

//   // ASSET DESCRIPTION - FULL WIDTH, WRAPPED, NO CUT OFF!
//   if (asset.description) {
//     const descHeight = 38; // Adjusted for single/multi-line
//     page.drawRectangle({
//       x: startXLeft,
//       y: y - 2,
//       width: startXRight + tableWidth - startXLeft,
//       height: descHeight,
//       color: rgb(0.94, 0.94, 1),
//       borderColor: rgb(0.8, 0.8, 0.8),
//       borderWidth: 0.5,
//     });
//     page.drawText("Description:", {
//       x: startXLeft + 6,
//       y: y + 14,
//       size: 12,
//       font: boldFont,
//       color: rgb(0.15, 0.16, 0.4),
//     });
//     // Wrap text
//     y =
//       wrapTextAndDrawLines(
//         page,
//         asset.description,
//         startXLeft + 95,
//         y + 14,
//         630,
//         13,
//         font,
//         11
//       ) - 8;
//   }

//   y -= 25;

//   // PHOTOS GRID (if any): 3 columns, up to 6 photos, with spacing
//   const imageWidth = 120;
//   const imageHeight = 82;
//   const gap = 12;
//   const columns = 3;
//   for (let i = 0; i < Math.min(assetPhotos.length, 6); i++) {
//     try {
//       const imgBytes = await fetch(assetPhotos[i]).then((res) =>
//         res.arrayBuffer()
//       );
//       let image;
//       try {
//         image = await pdfDoc.embedJpg(imgBytes);
//       } catch {
//         image = await pdfDoc.embedPng(imgBytes);
//       }
//       const row = Math.floor(i / columns);
//       const col = i % columns;
//       const x = 60 + col * (imageWidth + gap);
//       const imgY = y - row * (imageHeight + gap);

//       page.drawImage(image, {
//         x,
//         y: imgY - imageHeight,
//         width: imageWidth,
//         height: imageHeight,
//       });
//     } catch (err) {
//       console.error("Image embedding error:", assetPhotos[i], err);
//     }
//   }

//   function computeWrappedLines(text, maxWidth, font, fontSize) {
//     const paragraphs = text.split("\n");
//     let count = 0;
//     paragraphs.forEach((paragraph) => {
//       let line = "";
//       paragraph.split(/\s+/).forEach((word) => {
//         let testLine = line ? `${line} ${word}` : word;
//         const testWidth = font.widthOfTextAtSize(testLine, fontSize);
//         if (testWidth < maxWidth) {
//           line = testLine;
//         } else {
//           count++;
//           line = word;
//         }
//       });
//       if (line) count++;
//       count++; // for paragraph margin
//     });
//     return count;
//   }

//   // -------- TEXT WRAPPING UTILITY (for description, policy etc.) --------
//   // function wrapTextAndDrawLines(
//   //   page,
//   //   text,
//   //   x,
//   //   y,
//   //   maxWidth,
//   //   lineHeight,
//   //   font,
//   //   fontSize
//   // ) {
//   //   const safeText = (text ?? "").toString();
//   //   const paragraphs = safeText.split("\n");
//   //   let currentY = y;
//   //   paragraphs.forEach((paragraph) => {
//   //     let words = paragraph.split(/\s+/);
//   //     let line = "";
//   //     words.forEach((word) => {
//   //       let testLine = line ? `${line} ${word}` : word;
//   //       const testWidth = font.widthOfTextAtSize(testLine, fontSize);
//   //       if (testWidth < maxWidth) {
//   //         line = testLine;
//   //       } else {
//   //         page.drawText(line, {
//   //           x,
//   //           y: currentY,
//   //           size: fontSize,
//   //           font,
//   //           color: rgb(0, 0, 0),
//   //         });
//   //         currentY -= lineHeight;
//   //         line = word;
//   //       }
//   //     });
//   //     if (line) {
//   //       page.drawText(line, {
//   //         x,
//   //         y: currentY,
//   //         size: fontSize,
//   //         font,
//   //         color: rgb(0, 0, 0),
//   //       });
//   //       currentY -= lineHeight;
//   //     }
//   //     // Extra space between paragraphs
//   //     currentY -= 4;
//   //   });
//   //   return currentY;
//   // }

//   function wrapTextAndDrawLines(
//     page,
//     text,
//     x,
//     y,
//     maxWidth,
//     lineHeight,
//     font,
//     fontSize
//   ) {
//     const safeText = (text ?? "").toString();
//     const paragraphs = safeText.split("\n");
//     let currentY = y;
//     paragraphs.forEach((paragraph) => {
//       let line = "";
//       paragraph.split(/\s+/).forEach((word) => {
//         let testLine = line ? `${line} ${word}` : word;
//         const testWidth = font.widthOfTextAtSize(testLine, fontSize);
//         if (testWidth < maxWidth) {
//           line = testLine;
//         } else {
//           page.drawText(line, {
//             x,
//             y: currentY,
//             size: fontSize,
//             font,
//             color: rgb(0, 0, 0),
//           });
//           currentY -= lineHeight;
//           line = word;
//         }
//       });
//       if (line) {
//         page.drawText(line, {
//           x,
//           y: currentY,
//           size: fontSize,
//           font,
//           color: rgb(0, 0, 0),
//         });
//         currentY -= lineHeight;
//       }
//       currentY -= 5; // Extra margin after paragraph
//     });
//     return currentY;
//   }

//   // ============ POLICY PAGE (no overlap, wrapped, spaced) ============
//   const policyText = `You are responsible for the asset assigned to you. Handle it with care, avoid misuse, and report any damage immediately. Company policy prohibits unauthorized software installation and non-work-related use.`;

//   let policyPage = pdfDoc.addPage();
//   let pY = policyPage.getSize().height - 54;
//   policyPage.drawText("Asset Usage & Handling Policy", {
//     x: 52,
//     y: pY,
//     size: 16,
//     font: boldFont,
//     color: rgb(0.1, 0.2, 0.68),
//   });
//   pY -= 32;
//   pY = wrapTextAndDrawLines(policyPage, policyText, 52, pY, 500, 15, font, 12);

//   // ============ INDUCTION PAGE ============
//   const inductionText = `I acknowledge that I have received induction training, understand the policies, and agree to abide by the company’s IT guidelines and procedures.`;

//   let inductionPage = pdfDoc.addPage();
//   let iY = inductionPage.getSize().height - 50;
//   inductionPage.drawText("Induction & Policy Acknowledgement", {
//     x: 52,
//     y: iY,
//     size: 16,
//     font: boldFont,
//     color: rgb(0.2, 0.3, 0.7),
//   });
//   iY -= 32;
//   wrapTextAndDrawLines(inductionPage, inductionText, 52, iY, 500, 15, font, 12);

//   // ============ SAVE & DOWNLOAD ============
//   const pdfBytes = await pdfDoc.save();
//   const blob = new Blob([pdfBytes], { type: "application/pdf" });
//   const link = document.createElement("a");
//   link.href = URL.createObjectURL(blob);
//   link.download = `Asset_${asset.assetTag || "Acknowledgement"}.pdf`;
//   link.click();
// }

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// export async function generatePolicyPdf(asset, assetPhotos) {
//   const pdfDoc = await PDFDocument.create();
//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//   const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

//   // Example texts inside this file
//   const policyText = `You are responsible for the asset assigned to you. Handle it with care, avoid misuse, and report any damage immediately. Company policy prohibits unauthorized software installation and non-work-related use.`;

//   const inductionText = `I acknowledge that I have received induction training, understand the policies, and agree to abide by the company’s IT guidelines and procedures.`;

//   // ===== Page 1: Header + Asset Details =====
//   const page = pdfDoc.addPage();
//   const { width, height } = page.getSize();
//   let y = height - 50;

//   page.drawText("MAHAVIR GROUP", {
//     x: width / 2 - 90,
//     y,
//     size: 24,
//     font: boldFont,
//     color: rgb(0, 0.2, 0.6),
//   });
//   y -= 30;
//   page.drawText("Asset Allocation & Acknowledgement", {
//     x: width / 2 - 130,
//     y,
//     size: 14,
//     font,
//     color: rgb(0.3, 0.3, 0.3),
//   });
//   y -= 40;

//   // ===== Page 1: Header + Two-Column Table =====
//   const startXLeft = 50;
//   const startXRight = 350; // Right column starts after left column width
//   const colLabelWidth = 120;
//   const colValueWidth = 150;
//   const rowHeight = 24;

//   // Separate asset and employee data
//   const assetDetails = [
//     ["Asset Name", asset.name],
//     ["Asset Tag", asset.assetTag],
//     ["Description", asset.description], // will be single-line
//     ["Serial Number", asset.serialNumber],
//     ["Brand", asset.brand],
//     ["Type", asset.assetType],
//     ["Location", asset.locationName],
//     ["Date", new Date().toLocaleDateString()],
//   ];

//   const employeeDetails = [
//     ["Assigned To", asset.assignedUserName || "—"],
//     ["Employee ID", asset.employeeId || "—"],
//     ["Department", asset.department || "—"],
//     ["Employee Location", asset.employeeLocation || "—"],
//   ];

//   const maxRows = Math.max(assetDetails.length, employeeDetails.length);
//   for (let i = 0; i < maxRows; i++) {
//     // Special case: Description field should take full width and wrap
//     if (i < assetDetails.length && assetDetails[i][0] === "Description") {
//       const [label, value] = assetDetails[i];
//       const descHeight = 50; // initial height for rectangle
//       page.drawRectangle({
//         x: startXLeft,
//         y: y - 2,
//         width:
//           (colLabelWidth + colValueWidth) * 2 +
//           (startXRight - startXLeft - (colLabelWidth + colValueWidth)),
//         height: descHeight,
//         color: rgb(0.96, 0.97, 1),
//         borderColor: rgb(0.8, 0.8, 0.8),
//         borderWidth: 0.5,
//       });

//       // Draw label
//       page.drawText(label, {
//         x: startXLeft + 5,
//         y: y + 6,
//         size: 11,
//         font: boldFont,
//         color: rgb(0.1, 0.1, 0.1),
//       });

//       // Wrap text for description
//       const textStartX = startXLeft + colLabelWidth + 10;
//       y =
//         wrapTextAndDrawLines(
//           page,
//           value,
//           textStartX,
//           y + 6,
//           500,
//           14,
//           font,
//           11
//         ) - 8;
//       continue; // skip to next iteration
//     }

//     // Left Column
//     if (i < assetDetails.length) {
//       const [label, value] = assetDetails[i];
//       page.drawRectangle({
//         x: startXLeft,
//         y: y - 2,
//         width: colLabelWidth + colValueWidth,
//         height: rowHeight,
//         color: i % 2 === 0 ? rgb(0.96, 0.97, 1) : rgb(1, 1, 1),
//         borderColor: rgb(0.8, 0.8, 0.8),
//         borderWidth: 0.5,
//       });

//       page.drawText(label, {
//         x: startXLeft + 5,
//         y: y + 6,
//         size: 11,
//         font: boldFont,
//         color: rgb(0.1, 0.1, 0.1),
//       });

//       page.drawText((value ?? "—").toString(), {
//         x: startXLeft + colLabelWidth + 10,
//         y: y + 6,
//         size: 11,
//         font,
//         color: rgb(0, 0, 0),
//         maxWidth: colValueWidth,
//       });
//     }

//     // Right Column
//     if (i < employeeDetails.length) {
//       const [label, value] = employeeDetails[i];
//       page.drawRectangle({
//         x: startXRight,
//         y: y - 2,
//         width: colLabelWidth + colValueWidth,
//         height: rowHeight,
//         color: i % 2 === 0 ? rgb(0.96, 0.97, 1) : rgb(1, 1, 1),
//         borderColor: rgb(0.8, 0.8, 0.8),
//         borderWidth: 0.5,
//       });

//       page.drawText(label, {
//         x: startXRight + 5,
//         y: y + 6,
//         size: 11,
//         font: boldFont,
//         color: rgb(0.1, 0.1, 0.1),
//       });

//       page.drawText((value ?? "—").toString(), {
//         x: startXRight + colLabelWidth + 10,
//         y: y + 6,
//         size: 11,
//         font,
//         color: rgb(0, 0, 0),
//         maxWidth: colValueWidth,
//       });
//     }

//     y -= rowHeight;
//   }

//   // ===== Asset Photos =====
//   const imageWidth = 140;
//   const imageHeight = 100;
//   const gap = 15;
//   const columns = 3;

//   for (let i = 0; i < Math.min(assetPhotos.length, 6); i++) {
//     try {
//       const imgBytes = await fetch(assetPhotos[i]).then((res) =>
//         res.arrayBuffer()
//       );
//       let image;
//       try {
//         image = await pdfDoc.embedJpg(imgBytes);
//       } catch {
//         image = await pdfDoc.embedPng(imgBytes);
//       }
//       const row = Math.floor(i / columns);
//       const col = i % columns;
//       const x = 50 + col * (imageWidth + gap);
//       const imgY = y - row * (imageHeight + gap);

//       page.drawImage(image, {
//         x,
//         y: imgY - imageHeight,
//         width: imageWidth,
//         height: imageHeight,
//       });
//     } catch (err) {
//       console.error("Image embedding error:", assetPhotos[i], err);
//     }
//   }

//   // ===== Text Wrapping Function =====
//   function wrapTextAndDrawLines(
//     page,
//     text,
//     x,
//     y,
//     maxWidth,
//     lineHeight,
//     font,
//     fontSize
//   ) {
//     const safeText = (text ?? "").toString();
//     const words = safeText.split(/\s+/);
//     let line = "";
//     let lines = [];

//     words.forEach((word) => {
//       const testLine = line ? `${line} ${word}` : word;
//       const testWidth = font.widthOfTextAtSize(testLine, fontSize);
//       if (testWidth < maxWidth) {
//         line = testLine;
//       } else {
//         lines.push(line);
//         line = word;
//       }
//     });
//     if (line) lines.push(line);

//     lines.forEach((lineText, index) => {
//       page.drawText(lineText, {
//         x,
//         y: y - index * lineHeight,
//         size: fontSize,
//         font,
//         color: rgb(0, 0, 0),
//       });
//     });

//     return y - lines.length * lineHeight;
//   }

//   // === Page 2: Policy with Styling ===
//   const policyPage = pdfDoc.addPage();
//   const { height: policyHeight } = policyPage.getSize();
//   let policyY = policyHeight - 50;

//   // Helpers for headings, paragraphs, and bullets
//   function drawHeading(page, text, fontSize = 13) {
//     page.drawText(text, {
//       x: 50,
//       y: policyY,
//       size: fontSize,
//       font: boldFont,
//       color: rgb(0.1, 0.1, 0.5),
//     });
//     policyY -= 20;
//   }

// function drawParagraph(page, text, fontSize = 11) {
//   const words = text.split(" ");
//   let line = "";
//   words.forEach((word) => {
//     const testLine = line + word + " ";
//     if (font.widthOfTextAtSize(testLine, fontSize) > 500) {
//       page.drawText(line.trim(), { x: 50, y: policyY, size: fontSize, font });
//       policyY -= 14;
//       line = word + " ";
//     } else {
//       line = testLine;
//     }
//   });
//   if (line) {
//     page.drawText(line.trim(), { x: 50, y: policyY, size: fontSize, font });
//     policyY -= 14;
//   }
//   policyY -= 6;
// }

//   function drawBullets(page, items, fontSize = 11) {
//     items.forEach((item) => {
//       page.drawText("•", { x: 50, y: policyY, size: fontSize, font: boldFont });
//       const words = item.split(" ");
//       let line = "";
//       words.forEach((word) => {
//         const testLine = line + word + " ";
//         if (font.widthOfTextAtSize(testLine, fontSize) > 480) {
//           page.drawText(line.trim(), {
//             x: 65,
//             y: policyY,
//             size: fontSize,
//             font,
//           });
//           policyY -= 14;
//           line = word + " ";
//         } else {
//           line = testLine;
//         }
//       });
//       if (line) {
//         page.drawText(line.trim(), { x: 65, y: policyY, size: fontSize, font });
//         policyY -= 14;
//       }
//     });
//     policyY -= 6;
//   }
// lll;

// --- Helper for counting wrapped lines ---
function computeWrappedLines(text, maxWidth, font, fontSize) {
  const paragraphs = (text ?? "").toString().split("\n");
  let count = 0;
  paragraphs.forEach((paragraph) => {
    let line = "";
    paragraph.split(/\s+/).forEach((word) => {
      let testLine = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(testLine, fontSize) < maxWidth) {
        line = testLine;
      } else {
        count++;
        line = word;
      }
    });
    if (line) count++;
    count++; // Extra for paragraph gap
  });
  return count;
}

// --- Helper for wrapping and drawing text lines ---
function wrapTextAndDrawLines(
  page,
  text,
  x,
  y,
  maxWidth,
  lineHeight,
  font,
  fontSize
) {
  const paragraphs = (text ?? "").toString().split("\n");
  let currentY = y;
  paragraphs.forEach((paragraph) => {
    let line = "";
    paragraph.split(/\s+/).forEach((word) => {
      let testLine = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(testLine, fontSize) < maxWidth) {
        line = testLine;
      } else {
        page.drawText(line, {
          x,
          y: currentY,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
        currentY -= lineHeight;
        line = word;
      }
    });
    if (line) {
      page.drawText(line, {
        x,
        y: currentY,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
      currentY -= lineHeight;
    }
    currentY -= 5; // Paragraph spacing
  });
  return currentY;
}

export async function generatePolicyPdf(asset, assetPhotos, assetEmployee) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Page setup
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  let y = height - 50;

  const logoUrl =
    "https://th.bing.com/th/id/OIP.6-PIdVHEciKXZnxuZqmUYgAAAA?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"; // can be .png or .jpg

  // Fetch image
  const response = await fetch(logoUrl);
  const imageBytes = await response.arrayBuffer();

  // Get MIME type from headers
  const contentType = response.headers.get("content-type");

  let logoImage;
  if (contentType.includes("png")) {
    logoImage = await pdfDoc.embedPng(imageBytes);
  } else if (contentType.includes("jpg") || contentType.includes("jpeg")) {
    logoImage = await pdfDoc.embedJpg(imageBytes);
  } else {
    throw new Error(`Unsupported image type: ${contentType}`);
  }

  // Scale and draw image
  const logoDims = logoImage.scale(0.5);

  page.drawImage(logoImage, {
    x: 30, // left margin
    y: height - logoDims.height - 10, // keep top margin
    width: logoDims.width,
    height: logoDims.height,
  });

  // Header texts
  page.drawText("MAHAVIR GROUP", {
    x: width / 2 - 130,
    y,
    size: 24,
    font: boldFont,
    color: rgb(0, 0.2, 0.6),
  });
  y -= 30;
  page.drawText("Asset Allocation & Acknowledgement", {
    x: width / 2 - 130,
    y,
    size: 14,
    font,
    color: rgb(0.3, 0.3, 0.3),
  });
  y -= 40;

  // Table layout config
  const startXLeft = 50;
  const startXRight = 305;
  const colLabelWidth = 110;
  const colValueWidth = 140;
  const rowHeight = 20;
  const tableWidth = colLabelWidth + colValueWidth;

  // Data
  const assetDetails = [
    ["Asset Name", asset.name],
    ["Asset Tag", asset.assetTag],
    ["Serial Number", asset.serialNumber],

    ["Brand", asset.brand],
    ["Type", asset.assetType],
    ["Location", asset.locationName],
    ["Date", new Date().toLocaleDateString()],
  ];
  const employeeDetails = [
    ["Email", assetEmployee.email || "—"],
    ["Assigned To", asset.assignedUserName || "—"],
    ["Emp ID", assetEmployee.employeeId || "—"],
    ["Department", assetEmployee.department || "—"],

    ["Location", assetEmployee.location?.name || "—"],
  ];
  const maxRows = Math.max(assetDetails.length, employeeDetails.length);

  const baseLineOffset = 14; // distance from top of cell to first line of text

  for (let i = 0; i < maxRows; i++) {
    let leftHeight = rowHeight;
    let rightHeight = rowHeight;
    let leftLines = [];
    let rightLines = [];

    // LEFT SIDE
    if (i < assetDetails.length) {
      let [label, value] = assetDetails[i];
      let displayValue = (value ?? "—").toString();

      // Wrap text if Asset Name is long
      if (label === "Asset Name" && displayValue.length > 20) {
        const words = displayValue.split(" ");
        let lines = [],
          currentLine = "";
        words.forEach((word) => {
          if ((currentLine + word).length <= 20) {
            currentLine += (currentLine ? " " : "") + word;
          } else {
            lines.push(currentLine);
            currentLine = word;
          }
        });
        if (currentLine) lines.push(currentLine);
        leftLines = lines;
      } else {
        leftLines = [displayValue];
      }

      leftHeight = rowHeight * leftLines.length;

      // Draw rectangle (expanding downward if multi-line)
      page.drawRectangle({
        x: startXLeft,
        y: y - 2 - (leftHeight - rowHeight),
        width: tableWidth,
        height: leftHeight,
        color: i % 2 === 0 ? rgb(0.96, 0.97, 1) : rgb(1, 1, 1),
        borderColor: rgb(0.8, 0.8, 0.8),
        borderWidth: 0.5,
      });

      // Label
      page.drawText(label, {
        x: startXLeft + 6,
        y: y + rowHeight - baseLineOffset,
        size: 11,
        font: boldFont,
        color: rgb(0.1, 0.1, 0.1),
      });

      // Value lines
      leftLines.forEach((line, idx) => {
        page.drawText(line, {
          x: startXLeft + colLabelWidth + 14,
          y: y + rowHeight - baseLineOffset - idx * 12,
          size: 11,
          font,
          color: rgb(0, 0, 0),
          maxWidth: colValueWidth,
        });
      });
    }

    // RIGHT SIDE
    if (i < employeeDetails.length) {
      let [label, value] = employeeDetails[i];
      let displayValue = (value ?? "—").toString();

      // Wrap text for long email
      if (label === "Email" && displayValue.length > 25) {
        const chars = displayValue.split("");
        let lines = [];
        for (let j = 0; j < chars.length; j += 25) {
          lines.push(chars.slice(j, j + 25).join(""));
        }
        rightLines = lines;
      } else {
        rightLines = [displayValue];
      }

      rightHeight = rowHeight * rightLines.length;

      // Draw rectangle (expanding downward if multi-line)
      page.drawRectangle({
        x: startXRight,
        y: y - 2 - (rightHeight - rowHeight),
        width: tableWidth,
        height: rightHeight,
        color: i % 2 === 0 ? rgb(0.96, 0.97, 1) : rgb(1, 1, 1),
        borderColor: rgb(0.8, 0.8, 0.8),
        borderWidth: 0.5,
      });

      // Label
      page.drawText(label, {
        x: startXRight + 6,
        y: y + rowHeight - baseLineOffset,
        size: 11,
        font: boldFont,
        color: rgb(0.1, 0.1, 0.1),
      });

      // Value lines
      rightLines.forEach((line, idx) => {
        page.drawText(line, {
          x: startXRight + colLabelWidth + 2,
          y: y + rowHeight - baseLineOffset - idx * 12,
          size: 11,
          font,
          color: rgb(0, 0, 0),
          maxWidth: colValueWidth,
        });
      });
    }

    // Move Y down by tallest row height
    y -= Math.max(leftHeight, rightHeight);
  }

  y -= 15;

  // printing description below

  if (asset.description) {
    const descX = startXLeft;
    const descWidth = startXRight + tableWidth - startXLeft;
    const descFontSize = 11;
    const descLineHeight = 13;

    // Remove any newlines to treat description as a continuous wrapped paragraph
    const descText = asset.description.replace(/\n+/g, " ");

    // Compute how many wrapped lines the description will occupy
    const descWrappedLines = computeWrappedLines(
      descText,
      descWidth - 32,
      font,
      descFontSize
    );

    // Add top and bottom padding: top padding for label + bottom padding for spacing
    const paddingTop = 10;
    const paddingBottom = 30;

    // Total height of description box
    const descHeight =
      descWrappedLines * descLineHeight + paddingTop + paddingBottom;

    const rectY = y - descHeight + paddingBottom;

    // Draw the background rectangle
    page.drawRectangle({
      x: descX,
      y: rectY,
      width: descWidth,
      height: descHeight,
      color: rgb(0.94, 0.94, 1),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 0.5,
    });

    // Draw the "Description:" label at the top inside the rectangle
    page.drawText("Asset Description:", {
      x: descX + 8,
      y: rectY + descHeight - paddingTop - 8, // label adjusted inside top padding
      size: 12,
      font: boldFont,
      color: rgb(0.15, 0.16, 0.4),
    });

    // Draw the wrapped description text below the label inside the rectangle
    wrapTextAndDrawLines(
      page,
      descText,
      descX + 8,
      rectY + descHeight - paddingTop - 30, // text slightly below the label
      descWidth - 32,
      descLineHeight,
      font,
      descFontSize
    );

    // Update the vertical cursor y to be just below the rectangle, plus small spacing
    y = rectY - 10;
  }

  // Asset Photos Grid below description
  const imageWidth = 108;
  const imageHeight = 72;
  const gap = 14;
  const columns = 3;
  for (let i = 0; i < Math.min(assetPhotos.length, 6); i++) {
    try {
      const imgBytes = await fetch(assetPhotos[i]).then((res) =>
        res.arrayBuffer()
      );
      let image;
      try {
        image = await pdfDoc.embedJpg(imgBytes);
      } catch {
        image = await pdfDoc.embedPng(imgBytes);
      }
      const row = Math.floor(i / columns);
      const col = i % columns;
      const x = startXLeft + 10 + col * (imageWidth + gap);
      const imgY = y - row * (imageHeight + gap);
      page.drawImage(image, {
        x,
        y: imgY - imageHeight,
        width: imageWidth,
        height: imageHeight,
      });
    } catch (err) {
      console.error("Image embedding error:", assetPhotos[i], err);
    }
  }
  y -= 95;

  // ======== NEW PAGE FOR POLICY THINGS ==========

  //   // ======= DRAW CONTENT =======

  //   // === Page 2: Policy with Styling ===

  function drawBullets(page, items, fontSize = 11) {
    items.forEach((item) => {
      page.drawText("•", { x: 50, y: policyY, size: fontSize, font: boldFont });
      const words = item.split(" ");
      let line = "";
      words.forEach((word) => {
        const testLine = line + word + " ";
        if (font.widthOfTextAtSize(testLine, fontSize) > 480) {
          page.drawText(line.trim(), {
            x: 65,
            y: policyY,
            size: fontSize,
            font,
          });
          policyY -= 14;
          line = word + " ";
        } else {
          line = testLine;
        }
      });
      if (line) {
        page.drawText(line.trim(), { x: 65, y: policyY, size: fontSize, font });
        policyY -= 14;
      }
    });
    policyY -= 6;
  }

  function drawParagraph(page, text, fontSize = 11) {
    const words = text.split(" ");
    let line = "";
    words.forEach((word) => {
      const testLine = line + word + " ";
      if (font.widthOfTextAtSize(testLine, fontSize) > 500) {
        page.drawText(line.trim(), { x: 50, y: policyY, size: fontSize, font });
        policyY -= 14;
        line = word + " ";
      } else {
        line = testLine;
      }
    });
    if (line) {
      page.drawText(line.trim(), { x: 50, y: policyY, size: fontSize, font });
      policyY -= 14;
    }
    policyY -= 6;
  }

  const policyPage = pdfDoc.addPage();
  const { height: policyHeight } = policyPage.getSize();
  let policyY = policyHeight - 50;

  function drawHeading(page, text, fontSize = 13) {
    page.drawText(text, {
      x: 50,
      y: policyY,
      size: fontSize,
      font: boldFont,
      color: rgb(0.1, 0.1, 0.5),
    });
    policyY -= 20;
  }

  drawHeading(policyPage, "Asset Usage & Handling Policy", 16);

  drawHeading(policyPage, "Purpose");
  drawParagraph(
    policyPage,
    "Laptop computers provide important functionality, allowing employees to have their computing resources at hand..."
  );

  drawHeading(policyPage, "Scope");
  drawParagraph(
    policyPage,
    "These procedures apply to all employees who use Company owned laptop. These individuals are hereinafter referred to as 'owners'..."
  );

  drawHeading(policyPage, "3.0 Procedures");
  drawParagraph(
    policyPage,
    "The following rules apply to all company-owned laptops:"
  );

  drawHeading(policyPage, "3.1 Registering a laptop");
  drawBullets(policyPage, [
    "Every laptop must have an owner.",
    "Departments must maintain a sign-out sheet with make, model, and serial number.",
    "Updates to ownership must be reported to HR.",
  ]);

  drawHeading(policyPage, "3.2 Using a laptop");
  drawBullets(policyPage, [
    "Use only for official purposes.",
    "Do not engage in unlawful or abusive activities.",
    "Violations may result in disciplinary action.",
  ]);

  //   // Continue same pattern for rest of policy sections...

  // Induction Page
  let inductionPage = pdfDoc.addPage();
  let iY = inductionPage.getSize().height - 50;
  inductionPage.drawText("Induction & Policy Acknowledgement", {
    x: 52,
    y: iY,
    size: 16,
    font: boldFont,
    color: rgb(0.2, 0.3, 0.7),
  });
  iY -= 32;
  const inductionText = `I acknowledge that I have received induction training, understand the policies, and agree to abide by the company’s IT guidelines and procedures.`;
  wrapTextAndDrawLines(inductionPage, inductionText, 52, iY, 500, 15, font, 12);

  // Save & Download
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `Asset_${asset.assetTag || "Acknowledgement"}.pdf`;
  link.click();
}
