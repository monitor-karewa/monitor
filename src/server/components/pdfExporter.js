let PdfPrinter = require('pdfmake');
let Exporter = require('./exporter').Exporter;
let fs = require('fs');
const moment = require('moment');

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
        margin:[0,40,0,0]
    },
    header:{
        fontSize:14,
        alignment:"center",
        font:'Courier',
        margin:[0,10,10,0]
    },
    headerFilters:{
        fontSize:10,
        alignment:"left",
        font:'Courier',
        margin:[0,10,10,0]
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
        alignment:'center',
        margin: [0, 30, 0, 30]
    },
    statsExample: {
        alignment:'center',
        margin: [50, 30, 0, 0]
    },
    headerExample:{
        margin: [15, 5]

    },
    pagination:{
        fontSize:'12',
        alignment:'right',
        margin: [0, 0, 30, 0]
    },
    headerStyle:{
        fontSize:12,
        bold:true,
        alignment:'center',
        font:'Times',
        margin:5
    },
    rowStyle:{
        fontSize:10,
        alignment:'center',
        font:'Courier',
        margin:[0,10,0,10]
    },
    rowCurrencyStyle:{
        fontSize:9,
        alignment:'left',
        font:'Courier',
        margin:[0,10,0,10]
    },
    rowNumberStyle:{
        fontSize:12,
        alignment:'center',
        font:'Courier',
        margin:[0,10,0,10]
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
            pageMargins:[40,120,40,40],
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
        return this;
    }

    setPageMargins(margins){
        this.docDefinition.pageMargins = margins;
        return this;
    }

    setPageOrientation(orientation){
        this.docDefinition.pageOrientation = orientation;
        return this;
    }

    setOptions(options) {
        this.options = options;
        return this;
    }

    addHeadersToPDF(headers){
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
            let pdfDoc = printer.createPdfKitDocument(this.docDefinition,this.options);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
            pdfDoc.pipe(res);
            pdfDoc.end();
        } catch(err){
            return res.json({error:true, message:req.__('download.report.pdf')});
        }
    }

}

class PDFTable {
    constructor(params){
        this.headerRows = params.headerRows || 1;
        this.widths = params.widths || [];
        this.body = params.body || [];
        this.docs = params.docs || [];
        this.tableMetadata = params.tableMetadata || [];
    }

    setTableMetadata(metadata){
        this.tableMetadata = metadata;
        return this;
    }

    setHeaders(){
        let headers = [];
        this.tableMetadata.forEach((meta) => {
            let newEntry = { text: meta.header, style:'defaultStyle' };
            if(meta.headerStyle){
                newEntry.style = meta.headerStyle
            }
            headers.push(newEntry);
        });
        this.body.unshift(headers);
        return this
    }
    setWidths(widths, fillValue){
        if(widths){
            if(widths.length !== this.tableMetadata.length){
                throw new Error("El numero de valores en el campo 'widths' no corresponde con el número de columnas que se definieron")
            }
            this.widths = widths;
        } else {
            let array = new Array(this.tableMetadata.length);
            array.fill(fillValue, 0, this.tableMetadata.length);
            this.widths = array;
        }
        return this;
    }

    transformDocs(req){
        let values = [];
        if(Array.isArray(this.docs)){
            this.docs.forEach((item, index)=>{
                values = [];
                this.tableMetadata.forEach((meta)=>{
                    let value = meta.childPropName ? item[meta.propName][meta.childPropName] : item[meta.propName];
                    value = meta.i18n ? req.__(value) : value
                    values.push({text:this._formatValue(value, meta.format), style:meta.rowStyle});
                });
                this.body.push(values);
            });
        } else {
            this.tableMetadata.forEach((meta)=>{
                let value = meta.childPropName ? this.docs[meta.propName][meta.childPropName] : this.docs[meta.propName];
                value = meta.i18n ? req.__(value) : value
                values.push({text:this._formatValue(value, meta.format), style:meta.rowStyle});
            });
            this.body.push(values);
        }

        return this;
    }

    _formatValue(value, format){
        switch(format){
            case 'currency':
                    if(isNaN(value)){
                        value = 0
                    }
                return Number(value).toLocaleString('es-MX', { style: 'currency', currency:'MXN'});
                break;
            case 'date':
                return moment(value).format('MM/DD/YYYY')
                break;
            default:
                return value;
        }
    }
}

module.exports = {
    PDFTable,
    PDFExporter
};