const config = require("./webpack.config.js");
const webpack = require("webpack");
const spawn = require("child_process").spawn;

let electronProcess;
let shouldKillDevProcess = true;

function logStats(proc, data) {
    let log = `┏ ${proc} Process ${new Array(19 - proc.length + 1).join(
        "-"
    )}\n\n`;
    if (typeof data === "object") {
        data
            .toString({
                colors: true,
                chunks: false,
            })
            .split(/\r?\n/)
            .forEach((line) => {
                log += ` ${line}\n`;
            });
    } else {
        log += `  ${data}\n`;
    }
    log += `\n┗ ${new Array(29).join("-")} \n`;
    console.log(log);
}

function startMain() {
    const mainConfig = config[0];
    return new Promise((resolve) => {
        const compiler = webpack(mainConfig);
        compiler.hooks.done.tap("done", (_stats) => {
            resolve();
        });
        compiler.watch({}, (err, stats) => {
            if (err) {
                console.log(err);
                return;
            }

            logStats("Main", stats);

            if (electronProcess && electronProcess.pid) {
                shouldKillDevProcess = false;

                process.kill(electronProcess.pid);
                electronProcess = null;
                startElectron();

                setTimeout(() => {
                    shouldKillDevProcess = true;
                }, 2000);
            }
        });
    });
}
function startRenderer() {
    const rendererConfig = config[1];
    return new Promise((resolve) => {
        const compiler = webpack(rendererConfig);
        compiler.hooks.done.tap("done", (_stats) => {
            resolve();
        });
        compiler.watch({}, (err, stats) => {
            if (err) {
                console.log(err);
                return;
            }
            logStats("Renderer", stats);
        });
    });
}

function startElectron() {
    electronProcess = spawn("yarn", ["start"], { shell: true });
    electronProcess.stdout.on("data", (data) => {
        console.log(data.toString().replace(/\r?\n|\r/g, ""));
    });
    electronProcess.stderr.on("data", (data) => {
        console.log(data.toString().replace(/\r?\n|\r/g, ""));
    });
    electronProcess.on("close", () => {
        if (shouldKillDevProcess) process.exit();
    });
}
function init() {
    Promise.all([startMain(), startRenderer()])
        .then(() => {
            startElectron();
        })
        .catch((err) => console.log(err));
}

init();
