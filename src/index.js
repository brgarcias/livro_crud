//importa os módulos http e express
const http = require('http');
const express = require('express');
//constrói um objeto express
const app = express();
//importa o body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//configura a porta do servidor e o coloca em execução.
const porta = 3000;
app.set('port', porta);

let contador = 3; // logo após as instruções require

const livros = [
    {
        id: 1,
        titulo: 'Livro 1',
        descricao: 'Descrição Livro 1',
        edicao: 'Edicao Livro 1',
        autor: 'Autor Livro 1'
    },
    {
        id: 2,
        titulo: 'Livro 2',
        descricao: 'Descrição Livro 2',
        edicao: 'Edicao Livro 2',
        autor: 'Autor Livro 2'
    }
]

app.get('/livros', (req, res, next) => {
    res.status(200).json(livros);
});



// Adiciona Livros
app.post('/livros', (req, res, next) => {
    const livro = req.body;
    livros.push({id: contador += 1, titulo: livro.titulo, descricao: livro.descricao, edicao: livro.edicao, autor: livro.autor});
    res.status(201).json(livros);
})

//Atualiza
app.put('/livros/:id', (req, res, next) => {
    const { id } = req.params;
    var index = livros.findIndex(x => x.id == id)
    if(index == -1)
        res.status(204).json({message: 'Livro não encontrado'});

    livros[index] = {id: parseInt(id), titulo: req.body.titulo, descricao: req.body.descricao, edicao: req.body.edicao, autor: req.body.autor}
    res.status(200).json(livros);
})

//Remove
app.delete('/livros/:id', (req, res, next) => {
    const { id } = req.params;
    var index = livros.findIndex(x => x.id == id)
    if(index == -1)
        res.status(204).json({message: 'Livro não encontrado'});

    livros.splice(index, 1);
    res.status(200).json(livros);
})



const server = http.createServer(app);
server.listen(3000);
console.log('Servidor OK')
