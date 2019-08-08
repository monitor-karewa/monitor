const utils = require('./../testUtils');


module.exports = {
    before: utils.middlewares.before,
    beforeEach: utils.middlewares.beforeEach,


    'Contracts': function (browser) {

        browser


            .click('//a[contains(text(), "Contratos")]')
            .assert.containsText(utils.xpath.body(), "Catálogo de Contratos")

        // --------------- NEW ---------------------
            .assert.containsText(utils.xpath.body(), "NUEVO(A) CONTRATO")

            .waitForElementVisible('//a[text()=" Nuevo(a) Contrato"]', 1000)
            .pause(1000)
            .execute(function(){
                //obtiene todos los botones
                let buttonsIndex = document.querySelectorAll('a.btn-raised.xs.button-accent')
                //Click para crear uno nuevo , se encuentra en la posicion 1
                buttonsIndex[1].click()
            })
            .pause(500)


            .assert.visible(utils.xpath.elementWithText("label", "Tipo de Procedimiento"))
            .click(utils.xpath.elementWithTitle('button',"Selecciona el tipo de procedimiento"))
            .pause(500)
            .keys(browser.Keys.TAB)
            .keys(browser.Keys.ENTER)
            .assert.visible(utils.xpath.elementWithText("label", "Materia"))
            .pause(500)
            .click(utils.xpath.elementWithTitle('button',"Selecciona la materia"))
            .pause(500)
            .keys(browser.Keys.TAB)
            .keys(browser.Keys.ENTER)
            .pause(500)
            .clearValue(utils.xpath.elementWithPlaceholder("input","Ejemplo. 2017-2019"))
            .assert.visible(utils.xpath.elementWithText("label", "Administración"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Ejemplo. 2017-2019"),"2019-2020")
            .pause(500)
            .assert.visible(utils.xpath.elementWithText("label", "Ejercicio"))
            .clearValue(utils.xpath.elementWithPlaceholder("input","2009"))
            .setValue(utils.xpath.elementWithPlaceholder("input","2009"),"2019")
            .pause(500)
            .assert.visible(utils.xpath.elementWithText("label", "Periodo"))
            .clearValue(utils.xpath.elementWithPlaceholder("input","1o 2011"))
            .setValue(utils.xpath.elementWithPlaceholder("input","1o 2011"),"1o 2019")
            .pause(500)
            .assert.visible(utils.xpath.elementWithText("label", "ID"))
            .clearValue(utils.xpath.elementWithPlaceholder("input","XX000/00"))
            .setValue(utils.xpath.elementWithPlaceholder("input","XX000/00"),"BESTID123")
            .pause(500)
            .clearValue(utils.xpath.elementWithPlaceholder("input","Ejemplo. 'UNICA'"))
            .assert.visible(utils.xpath.elementWithText("label", "Partida"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Ejemplo. 'UNICA'"),"UNICA")
            .pause(500)
            .assert.visible(utils.xpath.elementWithText("label", "Estado del procedimiento"))
            .pause(500)
            .click(utils.xpath.elementWithTitle('button',"Selecciona el estado"))
            .pause(500)
            .keys(browser.Keys.TAB)
            .keys(browser.Keys.ENTER)
            .pause(500)
            .clearValue(utils.xpath.elementWithPlaceholder("input","Introduce la url de la convocatoria"))
            .assert.visible(utils.xpath.elementWithText("label", "Hipervínculo a la convocatoria"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Introduce la url de la convocatoria"),"www.anouncementURL.com")
            .pause(500)
            .clearValue(utils.xpath.elementWithPlaceholder("input","Selecciona la fecha de convocatoria"))
            .assert.visible(utils.xpath.elementWithText("label", "Fecha de convocatoria"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Selecciona la fecha de convocatoria"),"02/02/2020")
            .keys(browser.Keys.TAB)
            .pause(1000)
            .clearValue(utils.xpath.elementWithPlaceholder("input","Introduce la descripción"))
            .assert.visible(utils.xpath.elementWithText("label", "Descripción de obra"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Introduce la descripción"),"This is a good contract service")
            .pause(500)
            .clearValue(utils.xpath.elementWithPlaceholder("input","Selecciona la fecha"))
            .assert.visible(utils.xpath.elementWithText("label", "Fecha de junta de aclaraciones"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Selecciona la fecha"),"02/02/2020")
            .keys(browser.Keys.TAB)
            .pause(500)
            .clearValue(utils.xpath.elementWithPlaceholder("input","Introduce la dirección"))
            .assert.visible(utils.xpath.elementWithText("label", "Url de la Presentación de Propuestas"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Introduce la dirección"),"www.meetup.com")
            .pause(500)
            .clearValue(utils.xpath.elementWithPlaceholder("input","Introduce la url"))
            .assert.visible(utils.xpath.elementWithText("label", "Enlace a la presentación de la propuesta"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Introduce la url"),"http://docs.google.com/veryimportantdoc")
            .assert.visible(utils.xpath.elementWithText("label", "Proveedor"))
            .pause(500)
            .click(utils.xpath.elementWithTitle('button',"Selecciona el proveedor"))
            .pause(500)
            .keys(browser.Keys.TAB)
            .keys(browser.Keys.ENTER)
            .pause(500)
            .assert.visible(utils.xpath.elementWithText("label", "Unidad convocante"))
            .pause(500)
            .click(utils.xpath.elementWithTitle('button',"Selecciona la unidad"))
            .pause(500)
            .keys(browser.Keys.TAB)
            .keys(browser.Keys.ENTER)
            .pause(500)
            .assert.visible(utils.xpath.elementWithText("label", "Unidad administrativa solicitante"))
            .pause(500)
            .click(utils.xpath.elementWithTitle('button',"Indica la unidad administrativa convocante"))
            .pause(500)
            .keys(browser.Keys.TAB)
            .keys(browser.Keys.ENTER)
            .pause(500)
            .assert.visible(utils.xpath.elementWithText("label", "Tipo de Unidad administrativa"))
            .pause(500)
            .click(utils.xpath.elementWithTitle('button',"Selecciona el tipo de unidad"))
            .pause(500)
            .keys(browser.Keys.TAB)
            .keys(browser.Keys.ENTER)
            .pause(500)
            .assert.visible(utils.xpath.elementWithText("label", "Número de contrato"))
            .clearValue(utils.xpath.elementWithPlaceholder("input","Introduce el número de contrato"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Introduce el número de contrato"),"Number12312322222222")
            .assert.visible(utils.xpath.elementWithText("label", "Fecha de contrato"))
            .clearValue(utils.xpath.elementWithPlaceholder("input","Selecciona la fecha de contrato"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Selecciona la fecha de contrato"),"02/02/2019")
            .keys(browser.Keys.TAB)
            .assert.visible(utils.xpath.elementWithText("label", "Tipo de contrato"))
            .pause(500)
            .click(utils.xpath.elementWithTitle('button',"Selecciona el tipo"))
            .pause(500)
            .keys(browser.Keys.TAB)
            .keys(browser.Keys.ENTER)
            .pause(500)
            .assert.visible(utils.xpath.elementWithText("label", "Monto total c/impuestos"))
            .clearValue(utils.xpath.elementWithPlaceholder("input","Ingresa el monto con impuestos"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Ingresa el monto con impuestos"),"4000")
            .pause(500)
            .assert.visible(utils.xpath.elementWithText("label", "Monto mínimo"))
            .clearValue(utils.xpath.elementWithPlaceholder("input","Ingresa el monto mínimo"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Ingresa el monto mínimo"),"300")
            .assert.visible(utils.xpath.elementWithText("label", "Monto máximo"))
            .clearValue(utils.xpath.elementWithPlaceholder("input","Ingresa el monto máximo"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Ingresa el monto máximo"),"150200")
            .assert.visible(utils.xpath.elementWithText("label", "Monto total"))
            .clearValue(utils.xpath.elementWithPlaceholder("input","Ingresa el monto total"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Ingresa el monto total"),"150200")
            .assert.visible(utils.xpath.elementWithText("label", "Enlace a Contrato"))
            .clearValue(utils.xpath.elementWithPlaceholder("input","Ingresa la url"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Ingresa la url"),"http://web.whatsapp.com")
            .assert.visible(utils.xpath.elementWithText("label", "Área responsable de la información"))
            .pause(500)
            .setValue(utils.xpath.elementWithPlaceholder("input","Escribe el nombre del área responsable"),"Tecnología")
            // .click(utils.xpath.elementWithTitle('button',"Selecciona el área"))
            // .pause(500)
            // .keys(browser.Keys.TAB)
            // .keys(browser.Keys.ENTER)
            .pause(500)
            .assert.visible(utils.xpath.elementWithText("label", "Fecha de actualización"))
            .clearValue(utils.xpath.elementWithPlaceholder("input","Selecciona la fecha de actualización"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Selecciona la fecha de actualización"),"02/02/2020")
            .keys(browser.Keys.TAB)
            .assert.visible(utils.xpath.elementWithText("label", "Notas"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Ingresa las notas"),"Note-ice me senpai")
            .assert.visible(utils.xpath.elementWithText("label", "Notas Karewa"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Ingresa las notas Karewa"),"Notas karewaii")
            .assert.visible(utils.xpath.elementWithText("label", "Fecha de obtención de datos"))
            .clearValue(utils.xpath.elementWithPlaceholder("input","Selecciona la fecha de obtención"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Selecciona la fecha de obtención"),"02/02/2020")
            .keys(browser.Keys.TAB)
            .assert.visible(utils.xpath.elementWithText("button", " Guardar "))

            .click('//button[contains(text(), " Guardar ")]')
            .pause(1000)
            .assert.containsText(utils.xpath.body(), "Elemento Creado!")
            .pause(1000)


            //----- EDITAR MEDIANTE LOS BOTONES DE CADA REGISTRO -------------
           /* .moveToElement(utils.xpath.elementWithClass("div","table-buttons-hover"),5,5)

            .assert.visible(utils.xpath.elementWithClass("div","table-buttons-hover"))
            .execute(function(){
                //obtiene todos los botones
                let buttonsRow = document.querySelectorAll('.table-buttons-hover')
                //Click para editar , el primer elemento del registro es el ultimo ingresado
                buttonsRow[0].firstElementChild.click()
            })

            .pause(500)
            .assert.visible(utils.xpath.elementWithText("label", "Notas"))
            .clearValue(utils.xpath.elementWithPlaceholder("input","Ingresa las notas"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Ingresa las notas"),"Modificando el contrato desde el modal")
            .pause(1000)
            .click('//button[contains(text(), " Guardar ")]')
            .assert.containsText(utils.xpath.body(), "Elemento Actualizado!")
            .pause(1000)
*/

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
            .assert.containsText(utils.xpath.body(), "El contrato fue eliminado correctamente")



            .pause(7000)
            .end();
    }



};