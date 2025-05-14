const sqlite = require('sqlite3')
const {open} = require('sqlite')

let db = null

async function conectar() {
    db = await open({
        filename: './teste.db',
        driver: sqlite.Database
    })
    setup()
}

function setup(db){
    db.exec(`CREATE TABLE usuarios (
   id INTEGER PRIMARY KEY AUTOINCREMENT, 
   nome TEXT NOT NULL,
   email TEXT NOT NULL UNIQUE
    )`)

    db.exec(`CREATE TABLE IF NOT EXISTs tarefas ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        titulo TEXT NOT NULL,
        descricao TEXT NOT NULL UNIQUE,
        usuarios_id INTEGER,
        FOREIGN KEY (usuarios_id) REFERENCES usuarios(id)
         )`)
}

async function criarUsuario(query, valores) {
    try{
        await db.run(query, valores)
    }catch (err){
        console.log(err)
    }
}


module.exports = {conectar,criarUsuario}