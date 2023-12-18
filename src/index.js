
const connection  = require('./database.js');
const app = require('./server.js')
require('dotenv').config()

connection()
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})