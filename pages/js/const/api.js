const Mock = require('mockjs');
const API_PREFIX = 'http://mock.sina.cn/api/';
const MOCK_API_1 = API_PREFIX + '1';

// MOCK_API_1的Mock响应模板，详细用法参见：https://github.com/nuysoft/Mock/wiki
// var obj = {'aa':'11', 'bb':'22', 'cc':'33', 'dd':'44'};
Mock.mock(MOCK_API_1, 'get', {
    "data|100": [{   // 随机生成1到3个数组元素
        'name': '@cname',  // 中文名称
        'id|+1': 88,    // 属性值自动加 1，初始值为88
        'select0|1': ['1号楼', '2号楼','3号楼'], 
        'select1|1': ['1单元', '2单元','3单元'], 
        'select2|1': ['高区', '中区','低区'], 
        'select3|1': ['类型1', '类型2','类型3'], 
    }]
});

module.exports = {
    MOCK_1: MOCK_API_1
};
