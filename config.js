'use strict';
const ENV = process.env.NODE_ENV;
const _md5 = ENV == 'production'? true :false
//规则：除了生产环境，其他都需要添加md5,图片所有环境都需要加md5
module.exports = {
    port: 80,
    publicPath: 'http://test.sina.cn', //已http或者https开头的绝对地址，请勿以'/'结尾
    onLinePublicPath: '//simg.sinajs.cn/products/news/items/2018/foreign_ministry/', //线上静态资源地址
    md5: 'chunkhash', //false：不加md5值。hash：全部资源公用一个hash。chunkhash：单文件一个hash值。
    isHashJs: _md5,
    isHashCss:_md5,
    isHashImg: true,
    sprites: [{
        //生成雪碧图的文件名字，该文件夹在pages下生成，eg: pages/sprite/normal,
        //有必要的话可以生成多个雪碧图的文件夹,后续生成scss的雪碧图映射文件与name
        //是一致的，同时也会在 img文件夹下面生成对应名字的png文件
        name: 'normal'
    }],
    // tinyPngKeys:["Ohuy1PjI0uc6OtpOcKitwfaKTBRqbbb2", "bOcSekVhViyuHTmCgoCizNWPMieG7QPW", "MENRrUEXFrDlUwMkeBYNN-QJ8Ri3_mDN", "346gfotHJspgPYXmOuSAWhSl4CxlUox7"]
}
