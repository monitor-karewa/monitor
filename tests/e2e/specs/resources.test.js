const utils = require('./../testUtils');


module.exports = {
    before: utils.middlewares.before,
    beforeEach: utils.middlewares.beforeEach,


    'Providers': function (browser) {

        browser

            .click('//a[contains(text(), " Recursos ")]')
            .assert.containsText(utils.xpath.body(), "Catálogo de Recursos")

        // --------------- NEW ---------------------
            .assert.containsText(utils.xpath.body(), "NUEVO(A) RECURSO")

            .waitForElementVisible('//a[text()=" Nuevo(a) Recurso"]', 1000)
            .pause(1000)
            .execute(function(){
                //obtiene todos los botones
                let buttonsIndex = document.querySelectorAll('a.btn-raised.xs.button-accent')
                //Click para crear uno nuevo , se encuentra en la posicion 1
                buttonsIndex[1].click()
            })
            .pause(500)

            .assert.visible(utils.xpath.elementWithText("label", "Título del recurso"))
            .assert.visible(utils.xpath.elementWithText("label", "URL"))
            .assert.visible(utils.xpath.elementWithText("label", "Clasificación"))
            .assert.visible(utils.xpath.elementWithText("button", " Guardar "))

            .setValue(utils.xpath.elementWithPlaceholder("input","Introduce el título"), "Recurso forestal")
            .setValue(utils.xpath.elementWithPlaceholder("input","Introduce la url"), "http://docs.google.com/veryimportantdoc")
            .click(utils.xpath.elementWithTitle('button',"Selecciona clasificación"))
            .pause(500)
            .keys(browser.Keys.TAB)
            .keys(browser.Keys.ENTER)
            .click('//button[contains(text(), " Guardar ")]')

            .assert.containsText(utils.xpath.body(), "El recurso fue creado correctamente!")
            .pause(1000)


            //----- EDITAR MEDIANTE LOS BOTONES DE CADA REGISTRO -------------
            .moveToElement(utils.xpath.elementWithClass("div","table-buttons-hover"),5,5)

            .assert.visible(utils.xpath.elementWithClass("div","table-buttons-hover"))
            .execute(function(){
                //obtiene todos los botones
                let buttonsRow = document.querySelectorAll('.table-buttons-hover')
                //Click para editar , el primer elemento del registro es el ultimo ingresado
                buttonsRow[0].firstElementChild.click()
            })
            .pause(500)
            .assert.visible(utils.xpath.elementWithText("label", "Título del recurso"))
            .assert.visible(utils.xpath.elementWithText("label", "URL"))
            .assert.visible(utils.xpath.elementWithText("label", "Clasificación"))
            .assert.visible(utils.xpath.elementWithText("button", " Guardar "))

            .clearValue(utils.xpath.elementWithPlaceholder("input","Introduce el título"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Introduce el título"), "Recurso forestal")
            .clearValue(utils.xpath.elementWithPlaceholder("input","Introduce la url"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Introduce la url"), "http://web.whatsapp.com")
            .pause(1000)
            .click('//button[contains(text(), " Guardar ")]')


            //----- ELIMINAR MEDIANTE LOS BOTONES DE CADA REGISTRO -------------
            .moveToElement(utils.xpath.elementWithClass("div","table-buttons-hover"),5,5)

            .assert.visible(utils.xpath.elementWithClass("div","table-buttons-hover"))
            .execute(function(){
                //obtiene todos los botones
                let buttonsRow = document.querySelectorAll('.table-buttons-hover')
                //Click para eliminar , el primer elemento del registro es el ultimo ingresado
                buttonsRow[0].lastElementChild.click()
            })
            .assert.visible(utils.xpath.elementWithText("button", "Eliminar"))
            .click('//button[contains(text(), "Eliminar")]')
            .pause(500)
            .assert.containsText(utils.xpath.body(), "El recurso fue eliminado correctamente")



            .pause(5000)
            .end();
    }



};