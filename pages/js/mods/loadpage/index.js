require('./index.scss');
var laypage = require('util/laypage.js');
var table = require('mods/table');

module.exports = {
    init: function(size,page) {
        laypage({
            cont: 'pagination-main',
            pages: page,
            prev:'Previous',
            next:'Next',
            jump: function(obj) {
            	// console.log(obj.curr-1)
                table.init(size,obj.curr-1);
                // document.getElementById('biuuu_city_list').innerHTML = thisDate(obj.curr);
            }
        })

    },
    render: function() {

    }
}