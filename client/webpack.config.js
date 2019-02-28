const path = require('path');
const webpack = require('webpack');

const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = (env, argv) => ({
    mode: argv && argv.mode || 'development',
    devtool: (argv && argv.mode || 'development') === 'production' ? 'source-map' : 'eval',

    entry: {
        app: './src/app.js',
        vendors: './dependencies/vendors.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },

    node: false,

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // {
            //     test: require.resolve("./../../public/javascripts/dist/vendors.min.js"),
            //     use: 'imports-loader?$=jquery,jquery=jquery'
            // },
            {
                test: /\.js$/,
                // loader: 'babel-loader'
                use: [
                    // 'imports-loader?$=jquery,jquery=jquery,Popper=popper.js',
                    'babel-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    // 'vue-style-loader',
                    'style-loader',
                    'css-loader'
                ],
                exclude: /\.module\.css$/
            },
            {
                test: /\.(jpg|png|svg)(\?.*)?$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(jpg|png|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },

    resolve: {
        extensions: [
            '.js',
            '.vue',
            '.json'
        ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, 'src')
        }
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        // new webpack.ProvidePlugin({
        //     '$': 'jquery',
        //     'jquery': 'jquery',
        //     'jQuery': 'jquery'
        // }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'static', 'index.html'),
            inject: true
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'static'),
            to: path.resolve(__dirname, 'dist'),
            toType: 'dir'
        }]),
        new SWPrecacheWebpackPlugin({
            cacheId: 'my-pwa-vue-app',
            filename: 'service-worker-cache.js',
            staticFileGlobs: ['dist/**/*.{js,css}', '/'],
            minify: true,
            stripPrefix: 'dist/',
            dontCacheBustUrlsMatching: /\.\w{6}\./
        }),
    ],

    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}`
        },
        mangleWasmImports: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true
    },

    devServer: {
        compress: true,
        host: 'localhost',
        // https: true,
        https: false,
        open: true,
        overlay: true,
        port: 9000
    }
});
