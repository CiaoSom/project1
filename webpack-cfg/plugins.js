/**
 * Author: zhiyou
 * Date: 2018/3/28
 */
'use strict';
const fs = require("fs");
const path = require("path");
const Webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const spritePlugins = require('./sprite-plugins-config.js');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const config = require('../config.js');
// const tinyPngWebpackPlugin = require('tinypng-webpack-plugin');
const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const postcssOpacity = require('postcss-opacity');
const colorRgbaFallback = require("postcss-color-rgba-fallback");

module.exports = (mode, htmlPlugins, cssPlugin) => {
    let list = [new Webpack.LoaderOptionsPlugin({
                    debug: false,
                    minimize: true,
                    options: {
                        postcss: [
                            //为ie浏览器添加opactity filter
                            postcssOpacity(),
                            autoprefixer({
                                browsers: ['>1%']
                            }),
                            //将rgba转化成对应ie浏览器也能解析的filter
                            colorRgbaFallback({
                                oldie: true
                            }),
                            precss
                        ]
                    }
                }),
                new Webpack.NoEmitOnErrorsPlugin(),
                cssPlugin,
                ].concat(htmlPlugins).concat(spritePlugins);

    if (mode === 'development') {
        var curPort = config.port || 80;
        const portPath = path.join(__dirname, '..', 'server', 'port.tmp');

        if (fs.existsSync(portPath)) {
            curPort = fs.readFileSync(portPath, 'utf8').split(',')[0];
        }

        fs.writeFileSync(portPath, curPort+',success', 'utf8');

        list = list.concat([
            new Webpack.HotModuleReplacementPlugin(),
            new OpenBrowserPlugin({
                url: config.publicPath + ':' + curPort + '/'
            }),
            new DashboardPlugin({
                port: 9003
            })
        ]);
    } else if (mode === 'production') {
        list = list.concat([
            new UglifyJsPlugin({
                include: /\/src/,
                exclude: /\/node_modules/,
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    ecma: 8,
                    parse: {
                        html5_comments: true
                    },
                    compress: {
                        collapse_vars: true,
                        drop_console: true,
                        drop_debugger: true,
                        inline: false,
                        typeofs: false,
                        warnings: false
                    },
                    mangle: {
                        keep_classnames: false,
                        keep_fnames: false,
                        reserved: ['$', 'module', 'exports', 'require']
                    },
                    output: {
                        comments: false
                    },
                    ie8: true,
                    safari10: true
                }
            }),
            new CleanWebpackPlugin(['assets'], {
                root: path.resolve(__dirname, '..'),
                verbose: true
            }),
            // new tinyPngWebpackPlugin({
            //     key: config.tinyPngKeys,
            //     relativePath: "./img/"
            // })
        ]);
    }
    return list;
};
