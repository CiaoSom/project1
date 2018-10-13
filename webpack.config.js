/**
 * Author: zhiyou
 * Date: 2018/3/28
 */
"use strict";
let fs = require("fs");
let path = require("path");
let srcDir = path.resolve(process.cwd(), 'pages');
let assets = path.resolve(process.cwd(), 'assets');
let testDir = path.resolve(process.cwd(), 'test');
let ieTestDir = path.resolve(process.cwd(), 'test-ie');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let entryHandler = require('./webpack-cfg/entry-handler.js');
let htmlPluginHandler = require('./webpack-cfg/html-plugins-handler.js');
let getDevServerConfig = require('./webpack-cfg/dev-server.js');
const dev = 'development';
const prod = 'production';
const ieDev = 'developmentIE';
const testDev = 'developmentTest';
const config = require('./config.js');
let mode = process.env.NODE_ENV.trim();
let entryObj = entryHandler.scanEntry(srcDir);
let htmlPlugins = htmlPluginHandler(srcDir, entryObj);
let getPlugins = require('./webpack-cfg/plugins.js');

let cssName = config.md5 && config.isHashCss && mode === prod ? 'css/[name]-[hash:6].css' : 'css/[name].css';
let moduleConfig = require('./webpack-cfg/module.js');
let cssExtractTextPlugin = new ExtractTextPlugin(cssName, {
    disable: false,
    allChunks: false //不将所有的文件都打包到一起
});
//雪碧图生成的快捷路径
let spriteAlias = (() => {
    let obj = {};
    config.sprites.forEach((item) => {
        obj[item.name] = path.join(__dirname, 'pages', 'img', item.name + '-sprite.png')
    });
    return obj;
})();

let buildPath = '';

if(mode === ieDev){
    buildPath = ieTestDir;
}else if(mode === testDev){
    buildPath = testDir;
}else{
    buildPath = assets;
}

let curPort = config.port || 80;
const portPath = path.join(__dirname, 'server', 'port.tmp');
if (fs.existsSync(portPath)) {
    curPort = fs.readFileSync(portPath, 'utf8').split(',')[0];
}

let publicPathValue = '';
if(mode === prod){
    publicPathValue = config.onLinePublicPath;
}else if(mode === testDev){
    publicPathValue = config.onLinePublicPath;
}else{
    publicPathValue = config.publicPath + ':' + curPort + '/';
}

module.exports = {
    devtool: dev === mode ? '#source-map' : false,
    context: path.join(__dirname, 'pages', 'js', 'page'),
    entry: Object.assign(entryHandler.transform(dev === mode, entryObj), {
        'vender': ['es5-shim']
    }),
    output: {
        path: buildPath,
        publicPath: publicPathValue,
        chunkFilename: config.md5 && config.isHashJs && mode === prod ? "js/[name]-chunk-[" + config.md5 + ":6].js" : "js/[name]-chunk.js",
        filename: config.md5 && config.isHashJs && mode === prod ? "js/[name]-[" + config.md5 + ":6].js" : "js/[name].js"
    },
    resolve: {
        extensions: ['.js', '.tpl', '.art', '.css', '.scss'],
        modules: ['tpl', 'css', 'components', 'scss', 'node_modules','lib','mods','pages'],
        alias: Object.assign({
            'css': path.join(__dirname, 'pages', 'css'),
            'scss': path.join(__dirname, 'pages', 'scss'),
            'img': path.join(__dirname, 'pages', 'img'),
            'mods': path.join(__dirname, 'pages', 'js', 'mods'),
            'const': path.join(__dirname, 'pages', 'js', 'const'),
            'util': path.join(__dirname, 'pages', 'js', 'util'),
            'lib': path.join(__dirname, 'pages', 'js', 'lib'),
            'zepto': path.join(__dirname, 'pages', 'js', 'lib', 'zepto.1.2.0.min.js'),
            'es5-shim': path.join(__dirname, 'node_modules', 'es5-shim', 'es5-shim.min.js'),
            'es5-sham': path.join(__dirname, 'node_modules', 'es5-shim', 'es5-sham.min.js')
        }, spriteAlias)
    },
    module: moduleConfig(mode === prod, cssExtractTextPlugin),
    devServer: getDevServerConfig(mode === dev),
    plugins: getPlugins(mode, htmlPlugins, cssExtractTextPlugin)
};
