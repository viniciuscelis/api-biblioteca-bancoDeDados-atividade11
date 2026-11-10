// fazendo os imports das bibliotecas
const express = require('express');
const {MongoClient,ObjectId} = require('mongodb')

// Criando o nosso APP
const app = express();
app.use(express.json());

// Criando a conexão com o banco
const client = new MongoClient(process.env.MONGO_URI);
const livros = client.db('biblioteca').collection('livros');

// Criando os métodos HTTP
app.post('/livros',async (req,res)=>{
    const novo_livro = await livros.insertOne(req.body);
    res.status(201).json(novo_livro);
});

app.get('/livros',async (req,res)=>{
    const lista = await livros.find().toArray();
    res.json(lista);
});

app.get('/livros/:id',async (req,res)=>{
    const livro_especifico = await livros.findOne({_id: new ObjectId(req.params.id)});
    res.json(livro_especifico);
});

app.put('/livros/:id',async (req,res)=>{
    const livro_atualizado = await livros.updateOne({_id: new ObjectId(req.params.id)},{$set: req.body});
    res.json(livro_atualizado);
});

app.delete('/livros/:id',async (req,res)=>{
    livro_excluido = await livros.deleteOne({_id: new ObjectId(req.params.id)});
    res.json(livro_excluido)
})

client.connect()
    .then(()=>{
        console.log('CONECTADO AO MONGODB COM SUCESSO!');
        app.listen(3000,()=>console.log('API RODANDO NA PORTA 3000'));
    })
    .catch((erro)=>console.log('ERRO:',erro.message));