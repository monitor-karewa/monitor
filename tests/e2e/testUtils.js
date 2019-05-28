module.exports = {
    
    middlewares: {
        before: function(browser) {
            browser
            // .url(browser.launchUrl)
            // .pause(1000)
                .useXpath();
            // .waitForElementVisible('//a[text()="Administrar"]', 1000)
            // .click('//a[text()="Administrar"]')
            // .pause(500);
        },
        
        beforeEach: function(browser) {
            browser
                .url(browser.launchUrl)
                .pause(1000)

            // ----------- LOGIN --------------
                 .assert.containsText("/html[1]/body[1]", "Bienvenido a")

                 .waitForElementVisible('//a[text()="Administrar"]', 1000)
                 .click('//a[text()="Administrar"]')
                 .pause(500)

                 .assert.visible("//label[contains(text(),'Usuario')]")
                 .assert.visible("//label[contains(text(),'Contraseña')]")
                 .assert.visible("//button[contains(text(),'INICIAR SESIÓN')]")

                 .setValue("//input[@id='username']", "admin@app.admin")
                 .setValue("//input[@id='password']", "admin")
                 .click('//button[contains(text(), "INICIAR SESIÓN")]')

                 //should login correctly
                 .pause(500)
                 // --------------- LOGIN ---------

                 .assert.containsText('/html[1]/body[1]', 'Por favor selecciona una Organización para continuar.')

                 .click('//a[text()="Seleccionar"]')
                 .assert.visible("//ul[@class='main-menu']")
                 .pause(500);

                    
                // .useXpath()
                // .waitForElementVisible('//a[text()="Administrar"]', 1000)
                // .click('//a[text()="Administrar"]')
                // .pause(500);
        }
    },
    
    xpath: {
        body: function () {
            return "/html[1]/body[1]";
        },
        elementWithText: function (element, text) {
            return `//${element}[contains(text(),"${text}")]`;
        },
        elementWithId: function (element, id) {
            return `//${element}[@id="${id}"]`;
        },
        elementWithClass: function (element, clase) {
            return `//${element}[@class="${clase}"]`;
        },
        elementWithPlaceholder: function (element, text) {
            return `//${element}[@placeholder="${text}"]`;
        },
        elementWithTitle: function (element, title) {
            return `//${element}[@title="${title}"]`;
        }
    }
};