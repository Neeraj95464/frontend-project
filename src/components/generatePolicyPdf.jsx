// import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// export async function generatePolicyPdf(
//   asset,
//   policyText,
//   inductionText,
//   assetPhotos
// ) {
//   const pdfDoc = await PDFDocument.create();
//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

//   const page = pdfDoc.addPage();
//   const { width, height } = page.getSize();

//   let y = height - 40;

//   // Draw Asset Details in Table Style
//   const assetLines = [
//     ["Asset Name", asset.name],
//     ["Asset Tag", asset.assetTag],
//     ["Description", asset.description],
//     ["Serial Number", asset.serialNumber],
//     ["Brand", asset.brand],
//     ["Assigned To", asset.assignedUserName],
//     ["Type", asset.assetType],
//     ["Location", asset.locationName],
//     ["Date", new Date().toLocaleDateString()],
//   ];

//   const rowHeight = 20;
//   const col1Width = 120;
//   const col2Width = width - 100 - col1Width;

//   page.drawText("Asset Assignment Acknowledgement", {
//     x: 50,
//     y,
//     size: 16,
//     font,
//     color: rgb(0, 0, 0),
//   });
//   y -= 30;

//   for (const [label, value] of assetLines) {
//     page.drawText(`${label}:`, {
//       x: 50,
//       y,
//       size: 12,
//       font,
//       color: rgb(0.2, 0.2, 0.2),
//     });
//     page.drawText(`${value}`, {
//       x: 50 + col1Width,
//       y,
//       size: 12,
//       font,
//       color: rgb(0, 0, 0),
//     });
//     y -= rowHeight;
//   }

//   // Show Asset Photos (below table)
//   if (assetPhotos.length > 0) {
//     y -= 20;

//     for (const url of assetPhotos) {
//       try {
//         const imageBytes = await fetch(url).then((res) => res.arrayBuffer());
//         const image = await pdfDoc
//           .embedJpg(imageBytes)
//           .catch(() => pdfDoc.embedPng(imageBytes)); // Try JPG then PNG

//         const imgDims = image.scale(0.25);
//         const imgY = y - imgDims.height;

//         if (imgY < 50) {
//           // Not enough space, add new page
//           const newPage = pdfDoc.addPage();
//           y = newPage.getSize().height - 40;
//           page = newPage;
//         }

//         page.drawImage(image, {
//           x: 50,
//           y: y - imgDims.height,
//           width: imgDims.width,
//           height: imgDims.height,
//         });

//         y -= imgDims.height + 10;
//       } catch (error) {
//         console.error("Error embedding image:", url, error);
//       }
//     }
//   }

//   // Page 2 & 3: Policies
//   const splitTextIntoPages = (text, linesPerPage = 40) => {
//     const lines = text.split("\n");
//     const chunks = [];
//     for (let i = 0; i < lines.length; i += linesPerPage) {
//       chunks.push(lines.slice(i, i + linesPerPage).join("\n"));
//     }
//     return chunks;
//   };

//   for (const chunk of splitTextIntoPages(policyText)) {
//     const policyPage = pdfDoc.addPage();
//     const { height: ph } = policyPage.getSize();
//     let py = ph - 40;
//     chunk.split("\n").forEach((line) => {
//       policyPage.drawText(line, {
//         x: 50,
//         y: py,
//         size: 12,
//         font,
//         color: rgb(0, 0, 0),
//       });
//       py -= 18;
//     });
//   }

//   // Last Page: Induction Message
//   const inductionPage = pdfDoc.addPage();
//   let iy = inductionPage.getSize().height - 40;
//   inductionText.split("\n").forEach((line) => {
//     inductionPage.drawText(line, {
//       x: 50,
//       y: iy,
//       size: 12,
//       font,
//       color: rgb(0, 0, 0),
//     });
//     iy -= 18;
//   });

//   const pdfBytes = await pdfDoc.save();
//   const blob = new Blob([pdfBytes], { type: "application/pdf" });
//   const link = document.createElement("a");
//   link.href = URL.createObjectURL(blob);
//   link.download = "Asset_Acknowledgement.pdf";
//   link.click();
// }

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generatePolicyPdf(
  asset,
  policyText,
  inductionText,
  assetPhotos
) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  let y = height - 40;

  // Title
  page.drawText("Asset Assignment Acknowledgement", {
    x: 50,
    y,
    size: 18,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.5),
  });
  y -= 40;

  // Draw table
  const tableData = [
    ["Asset Name", asset.name],
    ["Asset Tag", asset.assetTag],
    ["Description", asset.description],
    ["Serial Number", asset.serialNumber],
    ["Brand", asset.brand],
    ["Assigned To", asset.assignedUserName],
    ["Type", asset.assetType],
    ["Location", asset.locationName],
    ["Date", new Date().toLocaleDateString()],
  ];

  const startX = 50;
  const cellHeight = 22;
  const labelWidth = 120;
  const valueWidth = 400;

  tableData.forEach(([label, value]) => {
    page.drawText(label, {
      x: startX,
      y,
      size: 12,
      font: boldFont,
      color: rgb(0.2, 0.2, 0.2),
    });
    page.drawText(value || "—", {
      x: startX + labelWidth + 10,
      y,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });
    y -= cellHeight;
  });

  y -= 20;

  // === Draw up to 6 images in 3x2 grid ===
  const imageWidth = 150;
  const imageHeight = 100;
  const gap = 20;
  const columns = 3;

  for (let i = 0; i < Math.min(assetPhotos.length, 6); i++) {
    try {
      const imgBytes = await fetch(assetPhotos[i]).then((res) =>
        res.arrayBuffer()
      );
      const image = await pdfDoc
        .embedJpg(imgBytes)
        .catch(() => pdfDoc.embedPng(imgBytes));
      const row = Math.floor(i / columns);
      const col = i % columns;

      const x = 50 + col * (imageWidth + gap);
      const imgY = y - row * (imageHeight + gap);

      page.drawImage(image, {
        x,
        y: imgY - imageHeight,
        width: imageWidth,
        height: imageHeight,
      });
    } catch (err) {
      console.error("Error embedding image", assetPhotos[i], err);
    }
  }

  y = y - 2 * (imageHeight + gap) - 20;

  // === Page 2 & 3: Policy Text (split if needed) ===
  const splitTextIntoPages = (text, linesPerPage = 40) => {
    const lines = text.split("\n");
    const chunks = [];
    for (let i = 0; i < lines.length; i += linesPerPage) {
      chunks.push(lines.slice(i, i + linesPerPage).join("\n"));
    }
    return chunks;
  };

  const policyChunks = splitTextIntoPages(policyText);
  for (const chunk of policyChunks) {
    const policyPage = pdfDoc.addPage();
    const { height: ph } = policyPage.getSize();
    let py = ph - 40;
    chunk.split("\n").forEach((line) => {
      policyPage.drawText(line, {
        x: 50,
        y: py,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      py -= 18;
    });
  }

  // === Final Page: Induction Text ===
  const inductionPage = pdfDoc.addPage();
  let iy = inductionPage.getSize().height - 40;
  inductionPage.drawText("Induction Acknowledgement", {
    x: 50,
    y: iy,
    size: 16,
    font: boldFont,
    color: rgb(0.2, 0.2, 0.6),
  });
  iy -= 30;

  inductionText.split("\n").forEach((line) => {
    inductionPage.drawText(line, {
      x: 50,
      y: iy,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });
    iy -= 18;
  });

  // === Save and Download PDF ===
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Asset_Acknowledgement.pdf";
  link.click();
}
