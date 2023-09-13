const express = require('express')
const app = express()
const port = 4000
const mongodb = require('./db')

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');
        next()
})

app.use(express.json());
app.use('/api', require("./Routes/createUser"))
app.use('/api', require("./Routes/displayData"))
app.use('/api', require("./Routes/orderData"))
app.use('/api', require("./Routes/getlocation"))


app.get('/', (req,res)=>{
    res.send('Hello world')
})
app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})