/**
 * Author: zhiyou
 * Date: 2018/3/28
 */
'use strict';
const config = require('../config.js');
const path = require("path");
const nodeModulesPath = path.join(__dirname, '..', 'node_modules');

module.exports = (isProdMode, cssExtractTextPlugin) => {
    return {
        rules: [
            {
                test: /\.js(x)?$/i,
                 use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env',{
                            targets: {
                                browsers: ['> 1%', 'last 2 versions']
                            }
                        }]
                    ]
                }
            },
                exclude: nodeModulesPath
            },
            {
                test: /\.(css|scss)$/i,
                use: cssExtractTextPlugin.extract({
                    fallback: [{
                        loader: 'style-loader',
                    }],
                    use: [
                        {
                            loader: 'css-loader', options: {importLoaders: 2}  //2代表css-loader后还需要几个loader

                        }, 
                        {
                            loader: 'postcss-loader', options:{plugins:[require("autoprefixer")("last 100 versions")]}
                        },
                        {
                            loader: 'sass-loader',
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpeg|jpg|gif)$/i,
                use: !isProdMode ? [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1,
                            name: 'img/[name].[ext]'
                        }
                    }
                ] : [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1,
                            name: config.md5 && config.isHashImg ? 'img/[name]-[hash:6].[ext]' : 'img/[name].[ext]'
                        }
                    }, 
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            optipng: {
                                optimizationLevel: 7,
                            },
                            mozjpeg: {
                                quality: 65,
                                progressive: true
                            },
                            gifsicle: {
                                interlaced: true,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(tpl|art)$/i,
                loader: 'tmodjs-loader'
            },
            {
                test: /\.html$/i,
                loader: 'html-loader?minimize=false&interpolate=true'
            }
        ],
        noParse: [/zepto\.main\.js/, /es5-shim\.min\.js/, /es5-sham\.min\.js/]
    };
};
