const utils = require('./../testUtils');


module.exports = {
    before: utils.middlewares.before,
    beforeEach: utils.middlewares.beforeEach,


    'Calculations': function (browser) {

        browser

            .click('//a[contains(text(), "Cálculos")]')
            .assert.containsText(utils.xpath.body(), "Catálogo de Cálculo")

        // --------------- NEW ---------------------
            .assert.containsText(utils.xpath.body(), "NUEVO(A) CÁLCULO")

            .waitForElementVisible('//a[text()=" Nuevo(a) Cálculo"]', 1000)
            .pause(1000)
            .execute(function(){
                //obtiene todos los botones
                let buttonsIndex = document.querySelectorAll('a.btn-raised.xs.button-accent')
                //Click para crear uno nuevo , se encuentra en la posicion 1
                buttonsIndex[1].click()
            })
            .pause(500)

            .assert.visible(utils.xpath.elementWithText("label", "Nombre del Cálculo"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Introduce el nombre del cálculo"), "Calculo único")
            .pause(500)
            .assert.visible(utils.xpath.elementWithText("label", "Descripción del cálculo"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Introduce la descripción"), "Calculo para las pruebas automatizadas")
            .pause(500)
            .assert.visible(utils.xpath.elementWithText("label", "Abreviación del cálculo"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Introduce la abreviación del cálculo"), "$$C12")
            .pause(500)
            .assert.visible(utils.xpath.elementWithText("span", "General"))
            .click(utils.xpath.elementWithId('input','one'))
            .pause(500)
            .click(utils.xpath.elementWithTitle('button',"Agregar variable"))
            .pause(500)
            .keys(browser.Keys.TAB)
            .keys(browser.Keys.ENTER)
            .pause(500)
            .execute(function(){
                //obtiene todos los botones
                let buttons = document.querySelectorAll('button.mini-btn.p-0')
                //Click para agregar el simbolo + , se encuentra en la posicion 0
                buttons[0].click()
            })
            .pause(500)
            .execute(function(){
                //obtiene todos los botones
                document.querySelector('button.btn.dropdown-toggle.btn-light').click()
                //Click para agregar el simbolo + , se encuentra en la posicion 0
                //buttonsIndex[0].click()
            })
            .keys(browser.Keys.TAB)
            .keys(browser.Keys.TAB)
            .keys(browser.Keys.ENTER)

            .click('//a[text()=" Verificar fórmula"]')
            .pause(500)
            .click('//button[contains(text(), "Agregar")]')

            .assert.containsText(utils.xpath.body(), "El cálculo fue creado correctamente")
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
            .assert.visible(utils.xpath.elementWithText("label", "Notas del cálculo"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Introduce las notas adicionales"), "Calculo editado mediante pruebas automatizadas")
            .pause(1000)
            .click('//button[contains(text(), "Actualizar")]')
            .pause(5000)

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
            .assert.containsText(utils.xpath.body(), "El cálculo fue eliminado correctamente")




            .pause(5000)
            .end();
    }



};