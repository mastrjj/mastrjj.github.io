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
  const select = document.getElementById("select").value
  const url = 'pdfs/template' + select + '.pdf'
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
  const f_num = document.getElementById("num_f").value
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

  // Правая шапка
  firstPage.drawText(f_num, {
    x: 100,
    y: 462.5,
    size: 10,
    font: helveticaFontBold,
  })

  firstPage.drawText(u_date, {
    x: 78,
    y: 453,
    size: 8,
    font: helveticaFontBold,
  })

  firstPage.drawText(u_time, {
    x: 12,
    y: 445,
    size: 8,
    font: helveticaFontBold,
  })

  firstPage.drawText(randInt2 + '   ' + 'dd', {
    x: 36,
    y: 435,
    size: 8,
    font: helveticaFontBold,
  })

  firstPage.drawText(randString8, {
    x: 75,
    y: 426,
    size: 8,
    font: helveticaFont,
  })

  firstPage.drawText(first_name + " " + second_name, {
    x: 154,
    y: 412.5,
    size: 8,
    font: helveticaFont,
  })

  // Таблица
  firstPage.drawText(randString8 , {
    x: 66,
    y: 356.5,
    size: 8,
    font: helveticaFontBold,
  })

  firstPage.drawText(u_date , {
    x: 130,
    y: 356.5,
    size: 8,
    font: helveticaFont,
  })

  firstPage.drawText(u_date , {
    x: 12,
    y: 318,
    size: 7,
    font: helveticaFont,
  })

  firstPage.drawText(randInt1, {
    x: 64,
    y: 321,
    size: 7,
    font: helveticaFont,
  })

  // Оплата
  firstPage.drawText(card_num, {
    x: 535,
    y: 474,
    size: 7,
    font: helveticaFont,
  })

  firstPage.drawText(u_date, {
    x: 520,
    y: 525,
    size: 7,
    font: helveticaFont,
  })

  // Левая шапка
  firstPage.drawText(randInt1, {
    x: 720,
    y: 544,
    size: 9,
    font: helveticaFontBold,
  })

  firstPage.drawText(second_name, {
    x: 796 - second_name.length*4,
    y: 527,
    size: 9,
    font: helveticaFont,
  })

  firstPage.drawText(u_date , {
    x: 760,
    y: 516,
    size: 9,
    font: helveticaFont,
  })

  firstPage.drawText(randNum6 , {
    x: 774,
    y: 486,
    size: 10,
    font: helveticaFontBold,
  })


  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save()

  // Trigger the browser to download the PDF document
  download(pdfBytes, "hitra-kachka.pdf", "application/pdf");
}
