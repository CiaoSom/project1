require('./index.scss');
var tpl1 = require('./index1.tpl');
var tpl2 = require('./index2.tpl');
var tpl3 = require('./index3.tpl');

function right(dom , type) {
    this.init(dom , type);
}
right.prototype = {
    init : function(dom , type){
       if(type== 'type1') {
            dom.append(tpl1());
       }else if(type == 'type2'){
            dom.append(tpl2());
       }else {
            dom.append(tpl3());
       }
    }
}
module.exports = right;