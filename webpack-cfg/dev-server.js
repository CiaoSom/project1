/**
 * Author: jilong5
 * Date: 2016/11/29
 * Modify: zhiyou@2018/3/30 支持动态配置端口
 */
'use strict';
let path = require("path");

module.exports = (isDev) => {
    return !isDev ? {} : {
        contentBase: path.resolve(__dirname, '..', 'pages', 'js', 'page'),
        filename: "js/[name].js",
        inline: false,
        historyApiFallback: false,
        lazy: false,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        host: '127.0.0.1',
        publicPath: '/',
        headers: {
            "X-Custom-Header": "yes"
        },
        stats: {
            colors: true
        },
        quiet: false
    };
}
