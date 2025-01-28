const { spawn } = require('child_process');

class ScriptManager {
    constructor() {
        this.scriptProcess = null
    }

    isRunning() {
        return !!this.scriptProcess
    }

    startScript(scriptPath, args = []) {
        if (this.isRunning()) {
            throw new Error('Script is already running')
        }

        this.scriptProcess = spawn('sudo', [scriptPath, ...args], {
            stdio: 'inherit',
        })

        this.scriptProcess.on('close', (code) => {
            console.log(`Child process exited with code ${code}`)
            this.scriptProcess = null;
        })
    }

    stopScript() {
        if (this.isRunning()) {
            this.scriptProcess.kill('SIGTERM');
            this.scriptProcess = null;
        } else {
            throw new Error('No script is running');
        }
    }
}

module.exports = new ScriptManager();
