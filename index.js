const express = require('express')
const dbConnection = require('./db')
const { criarUsuario } = require('./teste')
const { setgroups } = require('process')


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

app.post('/usuarios', async (req,res) => {
try{
    const {nome, email} = req.body
    await criarUsuario(
        'INSERT INTO usuarios (nome, email) VALUES (?,?)', 
        [nome,email]
    )
    res.status(201).json({msg: "Criado com success"})
}catch(err){
    let msg_erro = "internal Server Error"
    let cod_erro = 500
    console.log(err)
    if(err.erro = 19){
        msg_erro = "Email já existe"
        cod_erro = 400
    }
    res.status(cod_erro).json({err:msg_erro})
}
})

app.patch('/usuarios', async (req,res) => {
    const userId = parseInt(req.params.id);
    const user = setup.find(u => u.id === userId);
  
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
  
   
    const { name, email } = req.body;
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
  
    res.json(user);
})

app.delete('/usuarios', async (req,res) => {
    const userId = parseInt(req.params.id);
    const index = setup.findIndex(u => u.id === userId);
  
    if (index === -1) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
  
    // Remove o usuário
    const deletedUser = users.splice(index, 1);
    res.json({ message: 'Usuário removido com sucesso', user: deletedUser[0] });
})

dbConnection().then(() => {
app.listen(8000, () => {console.log("SERVIDOR RODANDO")})
})