const crud = require('./crud');

async function salvarDado(){
    const savedData = await crud.save("pessoas", "FbI8reVMAb90RveeTfVb",
    {nome: "Bruno", sobrenome: "Carvalho", idade: 123})
    console.log(savedData)
}
salvarDado()