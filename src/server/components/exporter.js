const Excel = require('exceljs');
const moment = require('moment');

class Exporter {
    constructor() {
        this.fileName = 'informacion-monitor-karewa';
        this.title = '';
        this.docNameSingular = 'Registro';
        this.docNamePlural = 'Registros';
        this.date = new Date();
    }
    
    setFileName(fileName) {
        this.fileName = fileName;
        return this;
    }
    
    setTitle(title) {
        this.title = title;
        return this;
    }
    
    setDocName(singular, plural) {
        this.title = title;
        return this;
    }

    getParams() {
        return {
            title: this.title,
            date: this.date,
            docNameSingular: this.docNameSingular,
            docNamePlural: this.docNamePlural,
        }
    }
}

class ExcelExporter extends Exporter {
    constructor(test) {
        super(test);
        
        this.propInfoArray = [];
        this.docs = [];
        this.filters = [];
        this.numberOfSheets = 1;
        
        this.rowIndexes = {
            INFO: 1,
            HEADERS: 2,
            CONTENT_START: 2
        }
    }
    
    getParams() {
        return {
            ...super.getParams(),
            propInfoArray: this.propInfoArray,
            docs: this.docs,
            fileName: this.fileName
        }
    }
    
    setPropInfoArray(propInfoArray) {
        this.propInfoArray = propInfoArray;
        return this;
    }

    setFilters(filters){
        this.filters = filters;
        return this;
    }
    
    setDocs(docs) {
        this.docs = docs;
        return this;
    }

    setNumberOfSheets(sheets) {
        this.numberOfSheets = sheets;
        return this;
    }

    exportToFileExtraSheets(req, res, excelInfo){
        let params = this.getParams();
        let workbook = new Excel.Workbook();

        let sheetTotal = workbook.addWorksheet(params.docNamePlural + '-totales');
        let sheetDetail = workbook.addWorksheet(params.docNamePlural + '-detalle');
        let formattedDate = moment(params.date).format('MM/DD/YYYY');

        let cellIndexByHeader = {};
        let cellIndexByPropName = {};
        let formatByPropName = {};
        let optionsByPropName = {};


        for(let item in excelInfo){
            excelInfo[item].propInfoArray = params.propInfoArray.filter(info => info.sheet == excelInfo[item].sheetNumber);
            excelInfo[item].sheet = excelInfo[item].sheetNumber == 1 ? sheetTotal : sheetDetail;

            cellIndexByHeader = {};
            cellIndexByPropName = {};
            formatByPropName = {};
            optionsByPropName = {};

            excelInfo[item].sheet.getRow(this.rowIndexes.INFO).getCell(1).value = params.title;
            excelInfo[item].sheet.getRow(this.rowIndexes.INFO).getCell(2).value = `Fecha de consulta: ${formattedDate}`;
            excelInfo[item].sheet.getRow(this.rowIndexes.INFO).getCell(3).value = `Consultado en Monitor Karewa`;
            if(this.filters && this.filters.length){
                sheetTotal.getRow(this.rowIndexes.INFO).getCell(5).value = this.filters.reduce(function(value,item){
                    if(item.key && item.values){
                        value += `${item.key} : ${item.values}`
                    }
                    return value
                },"Filtrado por :");
            }



            excelInfo[item].propInfoArray.forEach((propInfo, index) => {
                let cellIndex = index + 1; //base 1

                excelInfo[item].sheet.getRow(this.rowIndexes.HEADERS).getCell(cellIndex).value = propInfo.header;

                cellIndexByHeader[propInfo.header] = cellIndex;
                cellIndexByPropName[propInfo.propName] = cellIndex;
                formatByPropName[propInfo.propName] = propInfo.format;
                optionsByPropName[propInfo.propName] = {
                    childPropName : propInfo.childPropName,
                    i18n : propInfo.i18n
                }
            });
            excelInfo[item].docs.forEach((doc, index) => {

                let rowIndex = this.rowIndexes.CONTENT_START + index + 1; //base 1, offset from content start
                let propNames = Object.keys(doc);

                propNames.forEach((propName) => {
                    let cellIndex = cellIndexByPropName[propName];

                    if (cellIndex) {

                        let format = formatByPropName[propName] || 'string';
                        let options = optionsByPropName[propName];
                        let value = options.childPropName ? doc[propName][options.childPropName] : doc[propName];
                        value = options.i18n && value ? req.__(value) : value;


                        switch(format) {
                            case 'currency':
                                excelInfo[item].sheet.getRow(rowIndex).getCell(cellIndex).numFmt = '"$"#,##0.00;[Red]\-"$"#,##0.00';
                                excelInfo[item].sheet.getRow(rowIndex).getCell(cellIndex).value = value;
                                break;
                            case 'date':
                                excelInfo[item].sheet.getRow(rowIndex).getCell(cellIndex).value = moment(value).format('DD/MM/YYYY');
                                break;
                            case 'string':

                            default:
                                excelInfo[item].sheet.getRow(rowIndex).getCell(cellIndex).value = value;
                        }
                    }
                });

            });
        }

        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" + `${params.fileName}-${formattedDate}.xlsx`);

        workbook.xlsx.write(res)
            .then(function(){
                res.end();
            });
    }

    exportToFile(req, res) {
        let params = this.getParams();

        let workbook = new Excel.Workbook();
        let sheet = workbook.addWorksheet(params.docNamePlural);

        let formattedDate = moment(params.date).format('MM/DD/YYYY');
        
        sheet.getRow(this.rowIndexes.INFO).getCell(1).value = params.title;
        sheet.getRow(this.rowIndexes.INFO).getCell(2).value = `Fecha de consulta: ${formattedDate}`;
        sheet.getRow(this.rowIndexes.INFO).getCell(3).value = `Consultado en Monitor Karewa`;
        if(this.filters && this.filters.length){
            sheet.getRow(this.rowIndexes.INFO).getCell(4).value = this.filters.reduce(function(value,item){
                if(item.key && item.values){
                    value += `${item.key} : ${item.values}`
                }
                return value
            },"Filtrado por :");
        }
        
        let cellIndexByHeader = {};
        let cellIndexByPropName = {};
        let formatByPropName = {};
        let optionsByPropName = {};


        params.propInfoArray.forEach((propInfo, index) => {
            let cellIndex = index + 1; //base 1
            
            sheet.getRow(this.rowIndexes.HEADERS).getCell(cellIndex).value = propInfo.header;

            cellIndexByHeader[propInfo.header] = cellIndex;
            cellIndexByPropName[propInfo.propName] = cellIndex;
            formatByPropName[propInfo.propName] = propInfo.format;
            optionsByPropName[propInfo.propName] = {
                childPropName : propInfo.childPropName,
                i18n : propInfo.childPropName
            }
        });

        params.docs.forEach((doc, index) => {

            let rowIndex = this.rowIndexes.CONTENT_START + index + 1; //base 1, offset from content start
            
            let propNames = Object.keys(doc);

            propNames.forEach((propName) => {
                let cellIndex = cellIndexByPropName[propName];
    
                if (cellIndex) {

                    let format = formatByPropName[propName] || 'string';
                    let options = optionsByPropName[propName];
                    let value = options.childPropName ? doc[propName][options.childPropName] : doc[propName];
                    value = options.i18n && value ? req.__(value) : value;


                    switch(format) {
                        case 'currency':
                            sheet.getRow(rowIndex).getCell(cellIndex).numFmt = '"$"#,##0.00;[Red]\-"$"#,##0.00';
                            sheet.getRow(rowIndex).getCell(cellIndex).value = value;
                            break;
                        case 'date':
                            sheet.getRow(rowIndex).getCell(cellIndex).value = moment(value).format('DD/MM/YYYY');
                            break;
                        case 'string':

                        default:
                            sheet.getRow(rowIndex).getCell(cellIndex).value = value;
                    }
                }
            });
            
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" + `${params.fileName}-${formattedDate}.xlsx`);

        workbook.xlsx.write(res)
            .then(function(){
                res.end();
            });
        
    }
}

module.exports = {
    ExcelExporter,
    Exporter
};