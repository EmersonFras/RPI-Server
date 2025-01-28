const app = require('./app')
require('dotenv').config()

const PORT = process.env.PORT || 3001

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error)
    }
)   