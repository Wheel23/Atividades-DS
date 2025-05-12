const express = require('express')
const dbConnection = require('./db')


const app = express()
app.use(express.json())

const db = await dbConnection()
app.get('./usuarios', async(req,res) => {
    const {nome, email} = req.body
    try{
        const result = await db.run('INSERT INTO usuarios (nome, email) VALUES(?,?)', [nome,email]

        )
        res.status(201).json({msg: "Criado com sucesso"})
    }catch(err){
        res.status(500).json({msg:"Deu erro"})
    }
})


dbConnection().then(() => {
app.listen(8000, () => {console.log("SERVIDOR RODANDO")})
})