require('./index.scss');
var tpl = require('./index.tpl');

function head(dom) {
    this.init(dom);
}
head.prototype = {
    init : function(dom){
        dom.append(tpl());
        var that = this;
        $('.all .checkBox').on('click' , function() {
            if(!$(this).hasClass('selected')) {
                $(this).addClass('selected');
                $('.list .checkBox').removeClass('selected');
                that.updateCheckBox();
            }
        });
        $('.list .checkBox').on('click' , function(){
            if(!$(this).hasClass('selected')){
                $(this).addClass('selected');
                $('.all .checkBox').removeClass('selected');
            }else {
                $(this).removeClass('selected');
                $(this).parent().find('.name').text($(this).parent().find('li').eq(0).text());
                $(this).parent().find('li').removeClass('selected');
                $(this).parent().find('li').eq(0).addClass('selected');
            }
        })
        $('.list .tag').on('click' , function(e){
            e.stopPropagation();
            var checkBox = $(this).parent().find('.checkBox');
            var column = $(this).parent().find('.column');
            if(checkBox.hasClass('selected')) {
                if(column.hasClass('hide')) {
                    column.removeClass('hide');
                }else {
                    column.addClass('hide');
                }
            }
        })
        $('.column li').on('click' , function(e) {
            e.stopPropagation();
            var value = $(this).text();
            var that = this;
            $(this).parent().parent().find('.name').text(value);
            $(this).siblings().forEach(function(el ,index) {
                $(el).removeClass('selected');
                $(that).addClass('selected');
            })
            $('.column').addClass('hide');
        })
        $(document).on('click' , function(e){
            $('.column').addClass('hide');
        })
    },
    updateCheckBox : function() {
        var names =  $('.list .name');
        var columns = $('.list .column');
        names.forEach( function(el , index){
            $(el).text(columns.eq(index).find('li').eq(0).text());
        })
    }
}
module.exports = head;