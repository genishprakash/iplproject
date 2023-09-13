const express=require('express')
const app=express()

const PORT=process.env.PORT || 5001

app.use('/json',express.static('./src/public'));

app.listen(PORT,()=>{
    console.log(`Sever listening on port :${PORT}`)
})

