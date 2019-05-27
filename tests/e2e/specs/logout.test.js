const utils = require('./../testUtils');


module.exports = {
    before: utils.middlewares.before,
    beforeEach: utils.middlewares.beforeEach,


    'Logout': function (browser) {

        browser

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