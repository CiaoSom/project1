require('colors');
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const config = require('../config.js');
const portPath = path.join(__dirname, 'port.tmp');
let curPort = parseInt(config.port);
let child = null;

function startServer(port) {
    child = cp.fork(path.join(__dirname, 'child.js'), [port]);

    child.on('message', (msg) => {
        if (Object.prototype.toString.call(msg) === "[object String]") {
            if (msg.includes('EADDRINUSE')) {
                if (curPort < 8000) {
                    curPort = 8000;
                } else {
                    curPort++;
                }

                console.log(`警告：服务启动中发生 EADDRINUSE 错误，将在新端口 ${curPort} 重启服务。`.yellow);
                startServer(curPort);
            } else if (msg === 'subp_exit') {
                process.exit();
            } else {
                console.log(msg.red);
            }
        }
    });
}

startServer(config.port || 80);

if (!fs.existsSync(portPath)) {
    fs.writeFileSync(portPath, curPort, 'utf8');
}

fs.watchFile(portPath, (current, prev) => {
    fs.readFile(portPath, 'utf8', (err, data) => {
        if (err) throw err;

        const port = data.split(',')[0];
        const status = String(data.split(',')[1]).trim();
        if (status === 'success') {
            console.log(`服务已在 ${port} 端口成功启动。`.green);

            fs.unwatchFile(portPath);
        }
    });
});

// Windows下无法监听到ctrl-c发出的SIGINT，需特殊处理
if (process.platform === "win32") {
    var rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on("SIGINT", () => {
        process.emit("SIGINT");
    });
}

process.on("SIGINT", (code) => {
    child.send('kill_subp');
    if (fs.existsSync(portPath)) {
        fs.unlinkSync(portPath);
    }
});
