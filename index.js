const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomNum(length) {
    var randomChars = '123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

function getRandomString(length) {
    var randomChars = 'BCDFGHJKLMNPQRSTVWXZ';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

async function modifyPdf() {
  // Fetch an existing PDF document
  const url = 'pdfs/template.pdf'
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes)

  // Embed the Helvetica font
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const helveticaFontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  // Get the first page of the document
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const first_name = document.getElementById("first_name").value
  const second_name = document.getElementById("scnd_name").value
  const card_num = document.getElementById("num_card").value
  const u_time = document.getElementById("time").value
  const u_date = document.getElementById("date").value
  const randString8 = getRandomString(8)
  const randString2 = getRandomString(2)
  const randNum6 = getRandomNum(6)
  const randInt1 = getRandomIntInclusive(103, 119).toString()
  const randInt2 = getRandomIntInclusive(82345, 231873).toString()

  // Get the width and height of the first page
  const { width, height } = firstPage.getSize()

  // Draw a string of text diagonally across the first page
  firstPage.drawText(first_name + " " + second_name, {
    x: 152,
    y: 412,
    size: 8,
    font: helveticaFont,
  })

  firstPage.drawText(u_date, {
    x: 100,
    y: 420,
    size: 10,
    font: helveticaFontBold,
  })

  firstPage.drawText(u_time, {
    x: 100,
    y: 410,
    size: 8,
    font: helveticaFontBold,
  })


  firstPage.drawText(card_num, {
    x: 100,
    y: 200,
    size: 8,
    font: helveticaFont,
  })

  firstPage.drawText(randString8, {
    x: 100,
    y: 210,
    size: 8,
    font: helveticaFont,
  })

  firstPage.drawText(randString2, {
    x: 100,
    y: 220,
    size: 8,
    font: helveticaFont,
  })

  firstPage.drawText(randNum6, {
    x: 100,
    y: 230,
    size: 8,
    font: helveticaFont,
  })

  firstPage.drawText(randInt1, {
    x: 100,
    y: 240,
    size: 8,
    font: helveticaFont,
  })

  firstPage.drawText(randInt2, {
    x: 100,
    y: 250,
    size: 8,
    font: helveticaFont,
  })

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save()

  // Trigger the browser to download the PDF document
  download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
}
