class Variable {
    constructor(variableObj){
        this.name = variableObj.name;
        this.description = variableObj.description;
        this.abbreviation = variableObj.abbreviation;
        this.query = variableObj.query || {};
        this.filter = variableObj.filter || {};
        this.result = variableObj.result || 0;
        this.complexFn = variableObj.complexFn;
    }

    static makeVariable(variableObj){
        return new this(variableObj);
    }
}

module.exports = Variable;

