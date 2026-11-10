# API de Livros (Não Relacional)

API REST simples para gerenciamento de livros, construída com **Node.js**, **Express** e **MongoDB**.

## Deploy

A API está publicada no Render:

🔗 **https://api-livros-naorelacionavel.onrender.com/livros**

> Como o serviço está no plano gratuito do Render, a primeira requisição pode demorar alguns segundos enquanto a instância "acorda".

Para usar a versão em produção nos exemplos abaixo, troque `http://localhost:3000` por `https://api-livros-naorelacionavel.onrender.com`.

## Tecnologias

- [Node.js](https://nodejs.org/) (v20.6+ recomendado, para suporte a `--env-file`)
- [Express](https://expressjs.com/) 5
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/) 7

## Estrutura do projeto

```
api-livros-naorelacional/
├── index.js          # Servidor Express e rotas da API
├── package.json
├── .env              # Variáveis de ambiente (não versionado)
└── .gitignore
```

## Pré-requisitos

- Node.js instalado
- Uma instância do MongoDB (local ou [MongoDB Atlas](https://www.mongodb.com/atlas))

## Instalação

```bash
git clone <url-do-repositorio>
cd api-livros-naorelacional
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com a string de conexão do MongoDB:

```env
MONGO_URI=mongodb://localhost:27017
```

> A API utiliza o banco `biblioteca` e a coleção `livros`, que são criados automaticamente pelo MongoDB na primeira inserção.

## Executando

```bash
node --env-file=.env index.js
```

Se tudo estiver correto, você verá:

```
CONECTADO AO MONGODB COM SUCESSO!
API RODANDO NA PORTA 3000
```

A API ficará disponível em `http://localhost:3000`.

## Endpoints

| Método   | Rota             | Descrição                         |
| -------- | ---------------- | --------------------------------- |
| `POST`   | `/livros`        | Cria um novo livro                |
| `GET`    | `/livros`        | Lista todos os livros             |
| `GET`    | `/livros/:id`    | Busca um livro pelo ID            |
| `PUT`    | `/livros/:id`    | Atualiza um livro pelo ID         |
| `DELETE` | `/livros/:id`    | Remove um livro pelo ID           |

> O parâmetro `:id` deve ser um `ObjectId` válido do MongoDB (24 caracteres hexadecimais).

### Exemplos

**Criar livro**

```bash
curl -X POST http://localhost:3000/livros \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Dom Casmurro", "autor": "Machado de Assis", "paginas": 256}'
```

Resposta (`201 Created`):

```json
{ "acknowledged": true, "insertedId": "6543a1b2c3d4e5f678901234" }
```

**Listar livros**

```bash
curl http://localhost:3000/livros
```

**Buscar livro por ID**

```bash
curl http://localhost:3000/livros/6543a1b2c3d4e5f678901234
```

**Atualizar livro**

```bash
curl -X PUT http://localhost:3000/livros/6543a1b2c3d4e5f678901234 \
  -H "Content-Type: application/json" \
  -d '{"paginas": 280}'
```

> A atualização usa `$set`, ou seja, apenas os campos enviados são alterados.

**Remover livro**

```bash
curl -X DELETE http://localhost:3000/livros/6543a1b2c3d4e5f678901234
```

## Licença

ISC

