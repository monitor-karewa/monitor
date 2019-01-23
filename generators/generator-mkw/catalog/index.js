var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    async prompting() {
        this.answers = await this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Catalog name (camelCase, e.g. userAccount)' 
        }]);
    }
    
    writing() {
        let name = this.answers.name;
        
        //PascalCase
        let modelName = name.charAt(0).toUpperCase() + name.substr(1);
        
        this.fs.copyTpl(
            this.templatePath('models/model.template.js'),
            this.destinationPath(`app/models/${name}.model.js`),
            {
                modelName: modelName
            }
        );
        
        this.fs.copyTpl(
            this.templatePath('controllers/controller.template.js'),
            this.destinationPath(`app/controllers/${name}.controller.js`),
            {
                name: name,
                modelName: modelName
            }
        );
        
        this.fs.copyTpl(
            this.templatePath('routes/route.template.js'),
            this.destinationPath(`app/routes/${name}.routes.js`),
            {
                name: name,
                modelName: modelName
            }
        );
    }
};