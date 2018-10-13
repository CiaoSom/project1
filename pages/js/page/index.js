'use strict';
require('css/base.css');
require('scss/index.scss');
require('zepto');

console.log('This is index page.');

// Mock.js 用法示例
var API = require('const/api');
var AJAX = require('util/request');

AJAX.request({
    url: API.MOCK_1,
    dataType: 'json',
    type: 'GET'
}, function(data, status, xhr) {
    console.log('以下是接口' + API.MOCK_1 + '的mock数据：\n');
    console.log(JSON.stringify(data, null, 4));
});
