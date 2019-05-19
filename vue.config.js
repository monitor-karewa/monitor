// vue.config.js
const configureAPI = require('./server.config');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    devServer: {
        before: configureAPI,
        host: 'localhost'
    },
    configureWebpack: {
        plugins: [
            // new MyAwesomeWebpackPlugin()
            // new webpack.ProvidePlugin({
            //     $: 'jquery',
            //     jquery: 'jquery',
            //     'window.jQuery': 'jquery',
            //     jQuery: 'jquery'
            // })
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, 'src/')
            }
        }
    }/*,
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                // modify the options...
                return options
            })
    }*/
}
