var tr = require('./tr.tpl');
var th = require('./th.tpl');
var chunk = require('lodash').chunk;
require('./index.scss');
var data = require('const/data.js').data;
var header = ['', "姓名", "编号", "楼号", "单元号", "高低区", "类别", "操作", "删除"];
var AJAX = require('util/request');
var right = require('../right/index.js');
module.exports = {
    init: function(size, page,status) {
        // console.log(data)
        const chunkArray = chunk(data, size);
        // console.log(chunk(data, size))
        $('tbody,thead').empty();
        $('tbody').append(tr({
            data: chunkArray[page],
            type:0,
        }));
        $('thead').append(th({
            header: header
        }));
        if(!status){
            this.methods();
        }
        
    },
    methods: function() {
        const _this = this;
        $('tbody').on('click', 'div', function(e) {
            const ele = e.target;
            if ($(ele).hasClass('checkbox')) {
                $(this).removeClass('checkbox').addClass('checkboxed')
            } else if ($(ele).hasClass('checkboxed')) {
                $(this).removeClass('checkboxed').addClass('checkbox')
            }
        })
        $('tbody').on('click', 'a', function(e) {
            const ele = e.target;
            const id = ele.getAttribute('data-id');
            const currInnerHTMl = ele.innerHTML;

            switch (currInnerHTMl) {
                case "挂载":
                    _this.goMount(id);
                    ele.innerHTML = '卸载'
                    break;
                case "卸载":
                    _this.goUninstall(id);
                    ele.innerHTML = '挂载';
                    break;
                case "解析协议":
                    _this.analysis(id);
                    break;
                case "修改":
                    _this.modify(id);
                    break;
                case "批量调试":
                    _this.debugAll(id);
                    break;
                case "删除":
                    _this.delete(id);
                    break;

            }


        })

        // 删除所选设备
        $('.delete-select-img').on('click',function(){
        	// const id = ele.getAttribute('data-id');
        	var deleteArray = [];
        	var doms = $('.checkboxed')
        	var length = doms.length;
        	for(var i=0;i<length;i++){
        		deleteArray.push(doms[i].getAttribute('data-id'))
        	}
        	console.log('已删除编号为'+deleteArray.join(',')+'的机器')
        })
    },
    modify: function(id) {
        console.log('修改编号为-->>', id, '的机器')
    },
    debugAll: function(id) {
        console.log('调试编号为-->>', id, '的机器')
        new right($('.main') , 'type2',id);
    },
    delete: function(id) {
        console.log('删除编号为-->>', id, '的机器')
    },
    analysis: function(id) {
        console.log('解析编号为-->>', id, '的机器')
        new right($('.main') , 'type1',id);
    },
    goUninstall: function(id) {
        console.log('卸载编号为-->>', id, '的机器')
    },
    goMount: function(id) {
        console.log('挂载编号为-->>', id, '的机器')
    },
    getData: function(url, cb) {
        AJAX.request({
            url: url,
            dataType: 'json',
            type: 'GET'
        }, function(data, status, xhr) {
            cb && cb(data)
        });

    }
}