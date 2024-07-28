import express from 'express'

const app= express()

app.get('/',(req,res)=>{
    res.send("Testing server")
})

const port=process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})