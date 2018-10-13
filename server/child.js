require('colors');
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const wpConfig = path.join(__dirname, '..', 'webpack.config.js');
const port = process.argv[process.argv.length-1];
const devCmd = 'cross-env NODE_ENV=development webpack-dev-server'
             + ' --public test.sina.cn'
             + ' --config ' + wpConfig
             + ' --port ' + port;

fs.writeFileSync(path.join(__dirname, 'port.tmp'), port, 'utf8');

console.log(`正在 ${port} 端口启动服务...`.green);

let subp = cp.exec(devCmd, (err, stdout, stderr) => {
    // if (err) {
    //     process.send(stderr);
    // }
});

let errData = '';
subp.stderr.on('data', (chunk) => {
    errData += chunk;
});

subp.stderr.on('end', () => {
    process.send(errData);
    errData = '';
});

process.on('message', (msg) => {
    if (Object.prototype.toString.call(msg) === "[object String]" && 'kill_subp' === msg) {
        if (process.platform === "win32") {
            cp.execSync('taskkill /pid ' + subp.pid + ' /T /F');
        } else {
            subp.kill('SIGINT');
        }

        process.send('subp_exit');
    }
});
