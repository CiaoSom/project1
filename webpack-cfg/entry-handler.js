/**
 * Author: jilong5, zhiyou
 * Date: 2016/11/29
 */
'use strict';
let glob = require('glob');
let path = require("path");
let fs = require("fs");
const config = require('../config.js');

module.exports = {
    /**
     * 扫描入口文件
     * @param  {String} srcDir 扫描的地址
     * @return {Object}        返回扫描结果对象key值为入口文件的名字，value值为当前文件的绝对地址
     */
    scanEntry: (srcDir) => {
        let jsDir = path.resolve(srcDir, 'js', 'page');
        let entryFiles = glob.sync(jsDir + '/*.js');
        let map = {};
        entryFiles.forEach((filePath) => {
            let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
            map[filename] = filePath
        });
        return map;
    },
    transform: (isDev, entryObj) => {
        if (!isDev) {
            return entryObj;
        }

        let addr = '127.0.0.1';
        let curPort = config.port || 80;
        const portPath = path.join(__dirname, '..', 'server', 'port.tmp');
        if (fs.existsSync(portPath)) {
            curPort = fs.readFileSync(portPath, 'utf8').split(',')[0];
        }

        // 添加 webpack监听属性
        Object.keys(entryObj).forEach((key) => {
            let val = entryObj[key];
            if (Object.prototype.toString.call(val) === '[object String]') {
                entryObj[key] = [
                    'webpack/hot/dev-server',
                    'webpack-dev-server/client?http://' + addr + ':' + curPort,
                    val
                ];
            } else if(Object.prototype.toString.call(val) === '[object Array]'){
                entryObj[key].unshift('webpack/hot/dev-server',
                'webpack-dev-server/client?http://' + addr + ':' + curPort);
            }
        });

        return entryObj;
    }
}
