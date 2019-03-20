// vue.config.js
const webpack = require('webpack');
const path = require('path');

module.exports = {
    devServer: {
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
