(function() {
    var app = new Vue({
        el: '#vue_login',
        data: {
            email: '',
            password: ''
        },
        methods: {
            login: function () {
                var data = {
                    email: this.email,
                    password: this.password
                };
                Vue.http.post('/security/login', data).then(function (response) {
                    return response.json();
                }).then(function (response) {
                    if (!response || response.error) {
                        //TODO: Show error
                    } else {
                        window.location = response.data.redirectTo;
                    }
                });
            }
        }
    });
})();

