const PDFMerger = require("pdf-merger-js");


// merge PDF1 and PDF2
var merge1 = new PDFMerger();
(async () => {
    await merge1.add('D:/Projects/MergePDF/pdf1.pdf');
    await merge1.add('D:/Projects/MergePDF/pdf2.pdf');
    await merge1.save('D:/Projects/MergePDF/merge1.pdf');
})();


// merge page 1 of PDF3, pages 3,4 of PDF4, PDF1 and pages 8,9,10 of PDF4
var merge2 = new PDFMerger();
(async () => {
    await merge2.add('D:/Projects/MergePDF/pdf3.pdf',1);
    await merge2.add('D:/Projects/MergePDF/pdf4.pdf','3,4');
    await merge2.add('D:/Projects/MergePDF/pdf1.pdf');
    await merge2.add('D:/Projects/MergePDF/pdf4.pdf','8 to 10');
    await merge2.save('D:/Projects/MergePDF/merge2.pdf');
})();

