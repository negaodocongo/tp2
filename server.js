const express = require('express');
const app = express()
const fs = require("fs")

app.use(express.json())
app.use(express.static("public"));


app.post('/', (req, res) => {
    const dados  = JSON.stringify(req.body)
    fs.writeFileSync(req.body.email+".Json", dados)
    res.send('sucesso');
})

app.post('/listinha', (req,res)=>{
  fs.readdir(__dirname, (err, files)=>{
     if (err) console.log(err);
     var newfiles =  files.filter(data => data.includes('.Json') )
     console.log(newfiles);
      res.send({files: newfiles})
  })
})
app.get('/delete/:email', (req,res)=>{
    fs.unlinkSync(req.params.email)
    res.send("dados apagados!")
})

app.listen(8080, ()=> console.log("servidor rodando..."))
