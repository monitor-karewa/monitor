const utils = require('./../testUtils');


module.exports = {
    before: utils.middlewares.before,
    beforeEach: utils.middlewares.beforeEach,


    'Providers': function (browser) {

        browser

            .click('//a[contains(text(), "Proveedores")]')
            .assert.containsText(utils.xpath.body(), "Catálogo de Proveedores")

            // --------------- NEW ---------------------
            .assert.containsText(utils.xpath.body(), "NUEVO(A) PROVEEDOR")

            .waitForElementVisible('//a[text()=" Nuevo(a) Proveedor"]', 1000)
            .pause(1000)
            .execute(function(){
                //obtiene todos los botones
                let buttonsIndex = document.querySelectorAll('a.btn-raised.xs.button-accent')
                //Click para crear uno nuevo , se encuentra en la posicion 1
                buttonsIndex[1].click()
            })
            .pause(500)

            .assert.visible(utils.xpath.elementWithText("label", "Nombre o razón social"))
            .assert.visible(utils.xpath.elementWithText("label", "RFC"))
            .assert.visible(utils.xpath.elementWithText("label", "Notas adicionales"))
            .assert.visible(utils.xpath.elementWithText("button", " Guardar "))

            .setValue(utils.xpath.elementWithPlaceholder("input","Introduce el nombre o razón social"), "BLACK LABS")
            .setValue(utils.xpath.elementWithPlaceholder("input","Introduce el RFC"), "SAOK790530QZ2")
            .setValue(utils.xpath.elementWithPlaceholder("input","Introduce notas adicionales"), "En Black Labs nos inspiramos por la creatividad de las personas, nos motiva la idea de cambiar el mundo a través de la tecnología.")
            .click('//button[contains(text(), " Guardar ")]')

            .assert.containsText(utils.xpath.body(), "El proveedor fue creado correctamente") //falla al momento de que un proveedor esta repetido
            .pause(1000)
           // -------------- EDIT --------------------

            // Editar mediante el boton de la tabla
            .assert.visible(utils.xpath.elementWithText("button", "Editar"))
            .execute(function(){
                //obtiene todos los botones
                let buttonsTable = document.querySelectorAll('.btn-stroke.button-accent')
                //Click para editar , se encuentra en la posicion 0
                buttonsTable[0].click()
            })

            .pause(1000)
            .setValue(utils.xpath.elementWithPlaceholder("input","BLACK LABS")," COMPANY")
            .pause(1000)
            //.setValue(utils.xpath.elementWithPlaceholder("input","SAOK790530QZ2"),"SAOK790530QZ3" )
            //.setValue(utils.xpath.elementWithPlaceholder("input","En Black Labs nos inspiramos por la creatividad de las personas, nos motiva la idea de cambiar el mundo a través de la tecnología."), "Nos Motiva la idea de cambiar el mundo a través de la tecnología.")
            .assert.visible(utils.xpath.elementWithText("button", "Guardar"))

            .execute(function(){
                //obtiene todos los botones
                let buttonsTable = document.querySelectorAll('.btn-stroke.button-accent')
                //Click para guardar , se encuentra en la posicion 1
                buttonsTable[1].click()
            })
            .pause(2000)
            .assert.visible(utils.xpath.elementWithText("button", "Guardar"))

            .execute(function(){
                //obtiene todos los botones
                let buttonsConfirm = document.querySelectorAll('.btn-raised.button-accent.m-l-15')
                //Click para guardar , se encuentra en la posicion 1
                buttonsConfirm[1].click()
            })
            .pause(2000)

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
            .assert.visible(utils.xpath.elementWithText("label", "Nombre o razón social"))
            .assert.visible(utils.xpath.elementWithText("label", "RFC"))
            .assert.visible(utils.xpath.elementWithText("label", "Notas adicionales"))
            .assert.visible(utils.xpath.elementWithText("button", " Guardar "))

            .clearValue(utils.xpath.elementWithPlaceholder("input","Introduce el nombre o razón social"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Introduce el nombre o razón social"), "DESARROLLO BLACK LABS")
            .clearValue(utils.xpath.elementWithPlaceholder("input", "Introduce notas adicionales"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Introduce notas adicionales"), "Campos editados desde el modal")
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
            .assert.containsText(utils.xpath.body(), "El proveedor fue eliminado correctamente")



            .pause(5000)
            .end();
    }



};