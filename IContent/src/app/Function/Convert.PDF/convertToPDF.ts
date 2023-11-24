import  PDFDocument from 'pdfkit';
import fs from 'fs';

async function convertToPDF(textBD: string, caminhoDoArquivo: string)
{
    const docs = new PDFDocument()

    docs.text(textBD);

    docs.pipe(fs.createWriteStream(caminhoDoArquivo))

    docs.end()
}

export default convertToPDF