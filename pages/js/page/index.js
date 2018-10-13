'use strict';
require('css/base.css');
require('scss/index.scss');
// require('lib/jquery-1.11.1.min.js');
require('zepto');
var pagination = require('mods/loadpage');
var data= require('const/data.js').data;
$("select#size").change(function(){
     var size = $(this).val();
     var page = Math.ceil(data.length / size); 
     $('.pages').html(page)
     pagination.init(size,page);
});
pagination.init(20,Math.ceil(data.length / 20));
//head头
var head = require('./head/index.js');
new head($('.head'));

// var right = require('./right/index.js');
// new right($('.main') , 'type1');


