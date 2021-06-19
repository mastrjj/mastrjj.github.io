const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib

async function modifyPdf() {
  // Fetch an existing PDF document
  const url = 'pdfs/template.pdf'
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes)

  // Embed the Helvetica font
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

  // Get the first page of the document
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const textToPrint = document.getElementById("textToPrint").value
  // Get the width and height of the first page
  const { width, height } = firstPage.getSize()

  // Draw a string of text diagonally across the first page
  firstPage.drawText(textToPrint, {
    x: 5,
    y: 300,
    size: 14,
    font: arial,
  })

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save()

  // Trigger the browser to download the PDF document
  download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
}
