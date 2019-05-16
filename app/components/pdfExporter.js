let PdfPrinter = require('pdfmake');
let Exporter = require('./exporter').Exporter;
let fs = require('fs');

let fonts = {
    Courier: {
        normal: 'Courier',
        bold: 'Courier-Bold',
        italics: 'Courier-Oblique',
        bolditalics: 'Courier-BoldOblique'
    },
    Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
    },
    Times: {
        normal: 'Times-Roman',
        bold: 'Times-Bold',
        italics: 'Times-Italic',
        bolditalics: 'Times-BoldItalic'
    },
    Symbol: {
        normal: 'Symbol'
    },
    ZapfDingbats: {
        normal: 'ZapfDingbats'
    },
    Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
    }
};

let defaultStyles = {
    title:{
        fontSize:20,
        bold:true,
        font:'Times',
        alignment:"center",
        margin:[0,10,0,0]
    },
    header:{
        fontSize:14,
        alignment:"center",
        font:'Courier'
    },
    cardTitle:{
        fontSize:18,
        alignment:"left",
        bold:true,
        font:'Helvetica'
    },
    cardNumberTitle:{
        fontSize:18,
        alignment:"left",
        bold:true,
        font:'Helvetica'
    },
    headerTable:{
        fontSize:12,
        alignment:'center',
        bold:true,
        font:'Helvetica'
    },
    bodyTable:{
        fontSize:11,
        alignment:'center',
        font:'Courier'
    },
    tableExample: {
        margin: [0, 30, 0, 30]
    },
    headerExample:{
        margin: [15, 5]

    },
    pagination:{
        alignment:'right',
        margin: [0, 0, 30, 30]
    },
    defaultStyle:{
        fontSize:15,
        alignment:'right',
        font:'Helvetica'
    }
};

class PDFExporter extends Exporter {
    constructor(params){
        super(params);
        this.docDefinition = {
            header:[],
            content:[],
            footer:[],
            styles:defaultStyles,
            defaultStyle:defaultStyles.defaultStyle,
            pageMargins:[20,80,20,40],
            pageOrientation: 'portrait',

            // by default we use portrait, you can change it to landscape if you wish

            // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        };
        this.options = {};
    }


    getParams() {
        return {
            ...super.getParams(),
            propInfoArray: this.propInfoArray,
            fileName: this.fileName
        }
    }

    setStyle(...styleObj){
        this.docDefinition.styles = styleObj;
    }

    setPageMargins(margins){
        this.docDefinition.pageMargins = margins;
    }

    setPageOrientation(orientation){
        this.docDefinition.pageOrientation = orientation;
    }

    setOptions(options) {
        this.options = options;
        return this;
    }

    addHeadersToPDF(headers){
        console.log("headers", headers);
        this.docDefinition.header = headers;
        return this;
    }

    addTitleToPDF(title){
        if(title){
           this.docDefinition.header.unshift(title);
        } else {
           this.docDefinition.header.unshift(this.title);
        }
        return this
    }

    addContentToPDF(content){
        if(Array.isArray(content)){
            this.docDefinition.content.push(...content);
        } else {
            this.docDefinition.content.push(content);
        }
        return this;
    }
    addFooterToPDF(footer){
        if(footer){
            if(Array.isArray(footer)){
                this.docDefinition.footer.push(...footer);
            } else {
                this.docDefinition.footer.push(footer);
            }
        } else {
            this.docDefinition.footer = function (currentPage, pageCount) {
                return { text:'Página ' + currentPage.toString() + ' de ' + pageCount, style:'pagination' };
            }
        }
        return this;
    }
    exportToFile(req, res){
        try {
            let printer = new PdfPrinter(fonts);
            console.log("this.docDefinition", this.docDefinition);
            let pdfDoc = printer.createPdfKitDocument(this.docDefinition,this.options);
            // let chunks = [];
            // let result;
            // pdfDoc.on('data', function (chunk) {
            //     chunks.push(chunk);
            // });
            // pdfDoc.on('end', function () {
            //     result = Buffer.concat(chunks);
            //     res.send('data:application/pdf;base64,' + result.toString('base64'));
            // });
            // pdfDoc.end();


            // res.setHeader('Content-Length', stat.size);
            console.log("pdfDoc.keys", pdfDoc.keys);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
            pdfDoc.pipe(res);
            pdfDoc.end();
        } catch(err){
            console.log("err", err);
        }
    }

}

class PDFTable {
    constructor(params){
        this.headerRows = params.headerRows || 1;
        this.widths = params.widths || [];
        this.body = params.body || [];
        this.docs = params.docs || [];
        this.headers = params.headers || [];
    }

    setHeaders(headers){
        this.body.unshift(headers);
        return this
    }
    setWidths(widths, fillValue, noColumns){
        if(widths){
            this.widths = widths;
        } else {
            let array = new Array(noColumns);
            array.fill(fillValue, 0, noColumns);
            console.log("array", array);
            this.widths = array;
        }
        return this;
    }

    transformDocs(props){
        console.log("this.docs", this.docs);
        let values = [];
        if(Array.isArray(this.docs)){
            this.docs.forEach((item, index)=>{
                values = [];
                props.forEach((prop)=>{
                    values.push(item[prop]);
                });
                this.body.push(values);
            });
        } else {
            props.forEach((prop)=>{
                values.push(this.docs[prop]);
            });
            this.body.push(values);
        }

        console.log("values", values);

        return this;
    }
}

module.exports = {
    PDFTable,
    PDFExporter
};