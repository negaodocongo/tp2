const { error } = require('console');
const express = require('express');
const app = express()
const fs = require("fs")
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs');
app.set('views', './views')
app.use(express.static("public"));
app.get('/', (req, res) => {
    res.render('cadastro');
});
app.post('/', (req, res) => {
    const dados  = JSON.stringify(req.body)
    const nomeArq = req.body.email+".Json"
    fs.writeFileSync(nomeArq, dados)
    res.render('sucesso');
})


app.post('/listinha', (req,res)=>{
  fs.readdir(__dirname, (err, files)=>{
     if (err) console.log(err);
     var newfiles =  files.filter(data => data.includes('.Json') )
     console.log(newfiles);
      res.render('listinha', {files: newfiles})
  })
})
app.get('/delete/:email', (req,res)=>{
    var dados = req.params.email
    fs.unlinkSync(dados)
    res.send("dados apagados!")
})

app.listen(8080)
console.log("servidor rodando...")