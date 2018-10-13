require('./index.scss');
var laypage = require('util/laypage.js');
var table = require('mods/table');

module.exports = {
    init: function(size,page) {
        var flag = false;
        laypage({
            cont: 'pagination-main',
            pages: page,
            prev:'Previous',
            next:'Next',
            jump: function(obj) {
            	// console.log(obj.curr-1)
                table.init(size,obj.curr-1,flag);
                flag=true;
                // document.getElementById('biuuu_city_list').innerHTML = thisDate(obj.curr);
            }
        })
        console.log(flag)

    },
    render: function() {

    }
}