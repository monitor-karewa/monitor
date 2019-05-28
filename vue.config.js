// vue.config.js
// const configureAPI = require('./server.config');
const webpack = require('webpack');
const path = require('path');

let devServer = {
    host: 'localhost'
};

if (process.env.NODE_ENV === 'production') {
    devServer.before = require('./server.config')
}

module.exports = {
    devServer: devServer,
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
        },
        entry: {
            app: './src/main.js',
            //Dummy entry to allow hotreloading of server
            // server: './server.config.js'
        }
        // rules: [
        //     {
        //         exclude: [
        //             // './server.js'
        //             path.resolve(__dirname, 'server.js')
        //         ]
        //
        //     }
        // ]
        // exclude: [
        //     /\\src\\server\\.*\.js$/,
        // ]
    },
    chainWebpack: config => {
        // config.plugin('copy').tap((args) => [[{
        //     from :'src/server/',
        //     to: 'build',
        //     toType: 'dir',
        //     ignore: [
        //         '*.js',
        //     ],
        // }]]);
        // config.module
        //     .rule('vue')
        //     .use('vue-loader')
        //     .loader('vue-loader')
        //     .tap(options => {
        //         // modify the options...
        //         return options
        //     })
    }
}
