const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib
include("random.js")

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
  const first_name = document.getElementById("first_name").value
  const second_name = document.getElementById("scnd_name").value
  const card_num = document.getElementById("num_card").value
  const u_time = document.getElementById("time").value
  const u_date = document.getElementById("date").value
  const randString = getRandomString(8)

  // Get the width and height of the first page
  const { width, height } = firstPage.getSize()

  // Draw a string of text diagonally across the first page
  firstPage.drawText(first_name, {
    x: 5,
    y: 300,
    size: 14,
    font: helveticaFont,
  })

  firstPage.drawText(second_name, {
    x: 50,
    y: 250,
    size: 14,
    font: helveticaFont,
  })

  firstPage.drawText(card_num, {
    x: 100,
    y: 200,
    size: 14,
    font: helveticaFont,
  })

  firstPage.drawText(u_time, {
    x: 150,
    y: 150,
    size: 14,
    font: helveticaFont,
  })

  firstPage.drawText(u_date, {
    x: 200,
    y: 100,
    size: 14,
    font: helveticaFont,
  })

  firstPage.drawText(randString, {
    x: 200,
    y: 100,
    size: 14,
    font: helveticaFont,
  })

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save()

  // Trigger the browser to download the PDF document
  download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
}
