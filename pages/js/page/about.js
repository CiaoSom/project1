require('css/base.css');
require('scss/about.scss');
require('zepto');
var AJAX = require('util/request');

$('.up').on('click', function() {
	console.log('升级固件');
    AJAX.request({
        url: '',
        dataType: 'json',
        type: 'GET'
    }, function(data, status, xhr) {
       console.log('---')
    });

})