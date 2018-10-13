require('css/base.css');
require('scss/page.scss');
require('zepto');
var pagination = require('mods/loadpage');
var data= require('const/data.js').data;
$("select#size").change(function(){
     var size = $(this).val();
     var page = Math.ceil(data.length / size); 
     $('.pages').html(page)
     pagination.init(size,page,1);
});
pagination.init(20,Math.ceil(data.length / 20),1);