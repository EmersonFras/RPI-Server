const { spawn } = require('child_process')

class ScriptManager {
    constructor() {
        this.scriptProcess = null
    }

    isRunning() {
        return !!this.scriptProcess
    }

    async stopScript() {
        if (this.isRunning()) {
            console.log("Killing Process:", this.scriptProcess.pid)

            // Make sure the script is killed before resetting the state
            return new Promise((resolve, reject) => {
                this.scriptProcess.kill('SIGTERM')

                // Wait for the process to close
                this.scriptProcess.on('close', (code) => {
                    console.log(`Child process exited with code ${code}`)
                    this.scriptProcess = null
                    resolve()
                })

                this.scriptProcess.on('error', (err) => {
                    console.error("Error while stopping script:", err)
                    this.scriptProcess = null
                    reject(err)
                })
            })
        } else {
            throw new Error('No script is running')
        }
    }

    getRunningScript() {
        if (this.isRunning()) {
            return this.scriptProcess.spawnargs[1] // This returns the script path
        }
        return null // No script is running
    }

    async startScript(scriptPath, args = []) {
        if (this.isRunning()) {
            console.log('A script is already running, stopping the current script...')
            await this.stopScript() // Wait until the previous script is fully stopped
        }

        console.log('Starting new script:', scriptPath)
        this.scriptProcess = spawn('sudo', [scriptPath, ...args], {
            stdio: 'inherit',
        })

        // Reset state when the new script closes
        this.scriptProcess.on('close', (code) => {
            console.log(`Child process exited with code ${code}`)
            this.scriptProcess = null
        })
    }
}

module.exports = new ScriptManager()
