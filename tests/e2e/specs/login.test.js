const utils = require('./../testUtils');

module.exports = {
    before: utils.middlewares.before,
    beforeEach: utils.middlewares.beforeEach,


    'Login': function (browser) {

        //console.log(browser.globals);
        // {
        //   "myGlobalVar" : "some value",
        //   "otherGlobal" : "some other value"
        // }

        browser
            // .url(browser.launchUrl)
            // .pause(1000)
            // .useXpath()
                
            //wait for load
            // .waitForElementVisible('//a[text()="Administrar"]', 1000)
            // .click('//a[text()="Administrar"]')
            // .pause(500)
            
            //login
            // .assert.containsText('/html[1]/body[1]', 'Bienvenido Administrador')
            
            // .assert.visible('//label[contains(text(),"Usuario")]')
            // .assert.visible('//label[contains(text(),"Contraseña")]')
            // .assert.visible('//a[contains(text(), "INICIAR SESIÓN")]')
            
        /*
            .assert.containsText(utils.xpath.body(), "Bienvenido a")

            .waitForElementVisible('//a[text()="Administrar"]', 1000)
            .click('//a[text()="Administrar"]')
            .pause(500)
            
            .assert.visible(utils.xpath.elementWithText("label", "Usuario"))
            .assert.visible(utils.xpath.elementWithText("label", "Contraseña"))
            .assert.visible(utils.xpath.elementWithText("button", "INICIAR SESIÓN"))

            //submit form
            // .setValue('//input[@id="username"]', 'admin123')
            // .setValue('//input[@id="password"]', '123')
            // .click('//a[contains(text(), "INICIAR SESIÓN")]')
                
            .setValue(utils.xpath.elementWithId("input", "username"), "admin@app.admin")
            .setValue(utils.xpath.elementWithId("input", "password"), "admin")
            .click('//button[contains(text(), "INICIAR SESIÓN")]')
            // .useXpath()
            // .click("#password")
            // .click(utils.xpath.elementWithText("button", "INICIAR SESIÓN"))

            //should login correctly
            .pause(500)
            .assert.containsText('/html[1]/body[1]', 'Por favor selecciona una Organización para continuar.')
        
            .end();

         */
    }
};