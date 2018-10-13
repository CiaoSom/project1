/*
* @Author: jinsong5@
* @Date:   2018-05-17 11:18:13
* @Last Modified by:   jinsong5@
* @Last Modified time: 2018-05-17 11:30:39
*/
/**
 * 多域名加载图片资源，减轻并行下载负担
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getNewDomain(url) {
    const domainHead = ['','0','1','2','3']
    const newHead = `n${domainHead[getRandom(0,4)]}`
    if (!url) return console.log('url 为空 !')
    if (url.indexOf('n.sinaimg') == -1) return url
    if (url.indexOf('http:') != -1) {
        return url.replace('http:', '').replace('n.sinaimg', `${newHead}.sinaimg`)
    } else {
        return url.replace('n.sinaimg', `${newHead}.sinaimg`)
    }
}
/**
 * 返回指定数值之间的随机数
 * @param  {[type]} Min [description]
 * @param  {[type]} Max [description]
 * @return {[type]}     [description]
 */
function getRandom(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range);
    return num;
}

module.exports =  getNewDomain