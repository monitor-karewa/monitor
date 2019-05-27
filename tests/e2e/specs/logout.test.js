const utils = require('./../testUtils');


module.exports = {
    before: utils.middlewares.before,
    beforeEach: utils.middlewares.beforeEach,


    'Logout': function (browser) {

        browser



        // ----------- LOGIN --------------
            .assert.containsText(utils.xpath.body(), "Bienvenido a")

            .waitForElementVisible('//a[text()="Administrar"]', 1000)
            .click('//a[text()="Administrar"]')
            .pause(500)

            .assert.visible(utils.xpath.elementWithText("label", "Usuario"))
            .assert.visible(utils.xpath.elementWithText("label", "Contraseña"))
            .assert.visible(utils.xpath.elementWithText("button", "INICIAR SESIÓN"))

            .setValue(utils.xpath.elementWithId("input", "username"), "admin@app.admin")
            .setValue(utils.xpath.elementWithId("input", "password"), "admin")
            .click('//button[contains(text(), "INICIAR SESIÓN")]')

            //should login correctly
            .pause(500)

            .assert.containsText('/html[1]/body[1]', 'Por favor selecciona una Organización para continuar.')

        // -------------- LOGOUT ---------------------

            .assert.visible(utils.xpath.elementWithId("button", "dropdownUserMenu"))
            .click(utils.xpath.elementWithId("button", "dropdownUserMenu"))

            .waitForElementVisible('//a[text()="Cerrar sesión"]', 1000)
            .pause(1000)
            .execute(function(){

                document.querySelectorAll('a.dropdown-item.c-pointer')[1].click()

            })

            .pause(1000)
            .end();
    }



};