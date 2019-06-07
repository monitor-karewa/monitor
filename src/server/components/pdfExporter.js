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
        margin:[30,10,10,0]
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
    table4Col: {
        alignment:'center',
        margin: [50, 30, 0, 30]
    },
    statsExample: {
        alignment:'center',
        margin: [50, 30, 0, 0]
    },
    statsA2Example: {
        alignment:'center',
        margin: [175, 30, 0, 0]
    },
    statsCurrency4Col: {
        alignment:'center',
        margin: [0, 30, 0, 0]
    },
    statsCurrency3Col: {
        alignment:'center',
        margin: [60, 50, 0, 10]
    },
    headerExample:{
        margin: [15, 5]

    },
    pagination:{
        fontSize:'12',
        alignment:'right',
        margin: [0, 20, 30, 0]
    },
    headerStyle:{
        fontSize:12,
        bold:true,
        alignment:'center',
        font:'Times',
        margin:5
    },
    headerA2Style:{
        fontSize:15,
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
    rowCurrencyStyleBig:{
        fontSize:11,
        alignment:'right',
        font:'Courier',
        margin:[0,10,0,10]
    },
    rowNumberStyle:{
        fontSize:11,
        alignment:'center',
        font:'Courier',
        margin:[0,10,0,10]
    },
    rowNumberA2Style:{
        fontSize:14,
        alignment:'center',
        font:'Courier',
        margin:[0,10,0,10]
    },
    subTitle:{
        fontSize:13,
        bold:true,
        font:'Times',
        alignment:"left",
        margin:[0,40,0,0]
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
            pageMargins:[40,120,40,100],
            pageOrientation: 'portrait',
            // pageSize: 'A4',//TODO:Realizar método sePageSize y colocarle A3 al reporte de contratos

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

    setPageSize(pageSize){
        this.docDefinition.pageSize = pageSize;
        return this;
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

    setDocs(docs){
        this.docs = docs;
        return this;
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
                        if(item[meta.propName]){
                            let value = meta.childPropName ? item[meta.propName][meta.childPropName] : item[meta.propName];
                            value = meta.i18n ? req.__(value) : value;
                            values.push({text:this._formatValue(value, meta.format), style:meta.rowStyle});
                        } else {
                            values.push({text:"", style:meta.rowStyle});
                        }
                    });
                    this.body.push(values);
                });
            } else {
                this.tableMetadata.forEach((meta)=>{
                    if(this.docs[meta.propName]){
                        let value = meta.childPropName ? this.docs[meta.propName][meta.childPropName] : this.docs[meta.propName];
                        value = meta.i18n ? req.__(value) : value;
                        values.push({text:this._formatValue(value, meta.format), style:meta.rowStyle});
                    } else {
                        values.push({text:this._formatValue(null, meta.format), style:meta.rowStyle});
                    }
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
                return value ? '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : "$0.00";
                break;
            case 'date':
                return moment(value).format('DD/MM/YYYY');
                break;
            default:
                return value;
        }
    }
}

class PDFTableList {
    constructor(params){
        this.widths = params.widths || [];
        this.body = params.body || [];
        this.docs = params.docs || [];
        this.headers = params.headers || [];
        this.labelsColumn = params.labelsColumn || [];
        this.tableStructure = params.tableStructure || {};
    }

    setTableHeaders(headers){
        this.headers = headers;

        let arrayHeaders = [];
        this.headers.forEach((meta) => {
            let newEntry = { text: meta.title, style: meta.headerStyle };
            arrayHeaders.push(newEntry);
        });
        this.body.unshift(arrayHeaders);
        return this
    }

    setLabelsColumn(labelsColumn=[],columnStyle){
        this.labelsColumn = labelsColumn;
        let tempTableStructure = {};
        this.labelsColumn.forEach(function(column){
            let prop = column.propName;
            tempTableStructure[prop] = {};
            tempTableStructure[prop].values = [];
            tempTableStructure[prop].label = column.label;
            tempTableStructure[prop].headerStyle = columnStyle;
            tempTableStructure[prop].type = column.type;
        });

        this.tableStructure = tempTableStructure;
        return this;
    }

    setDocs(docs){
        this.docs = docs;
        let self = this;
        if(Array.isArray(this.docs)){
            this.docs.forEach(function(doc){
               for(let item in self.tableStructure){
                   if(doc[item] !== null && doc[item] !== undefined){
                       self.tableStructure[item].values.push(doc[item]);
                   }
               }
            });
        } else {
            for(let item in this.tableStructure){
                if(this.docs[item] !== null && this.docs[item] !== undefined){
                    this.tableStructure[item].values.push(this.docs[item]);
                }
            }
        }
        return this
    }

    setWidths(widths, fillValue){
        if(widths){
            if(widths.length !== this.headers.length){
                throw new Error("El numero de valores en el campo 'widths' no corresponde con el número de columnas que se definieron")
            }
            this.widths = widths;
        } else {
            let array = new Array(this.headers.length);
            array.fill(fillValue, 0, this.headers.length);
            this.widths = array;
        }
        return this;
    }

    transformDocs(){
        let values = [];
        let self = this;
        for(let item in this.tableStructure){
            values = [];
            values.push({text:this.tableStructure[item].label, style:this.tableStructure[item].headerStyle});
            this.tableStructure[item].values.forEach(function(value){
               values.push({text:self._formatValue(value, self.tableStructure[item].type), style: self._getStyleFormat(self.tableStructure[item].type)})
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
                return value ? '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : "$0.00";
                break;
            case 'date':
                return moment(value).format('DD/MM/YYYY');
                break;
            default:
                return value;
        }
    }

    _getStyleFormat(format){
        return format == 'currency' ? 'rowCurrencyStyleBig' : 'rowNumberStyle';
    }

}

module.exports = {
    PDFTable,
    PDFExporter,
    PDFTableList
};