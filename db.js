const sqlite = require('sqlite3')
const {open} = require('sqlite')
const { error } = require('console')

async function main() {
  try{
   const db = await open({
       filename: './banco.db',
       driver: sqlite.Database
   })
await db.exec(`CREATE TABLE usuarios (
   id INTEGER PRIMARY KEY AUTOINCREMENT, 
   nome TEXT NOT NULL,
   email TEXT NOT NULL UNIQUE
    )`)
   
    //await db.run(`
    //INSERT INTO usuarios(nome,email) 
    //VALUES(?,?)`,
    //[`Luiz, luiz_25@estudante.sesisenai.org.br`])

//const usuarios = await db.all(`SELECT * FROM usuarios`)
// console.log(usuarios)

  await db.close()
   }catch(err){
       console.log(err)
   }
}

main()