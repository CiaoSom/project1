require('./index.scss');
var tpl = require('./index.tpl');

function head(dom) {
    this.init(dom);
}
head.prototype = {
    init : function(dom){
        dom.append(tpl());
    }
}
module.exports = head;