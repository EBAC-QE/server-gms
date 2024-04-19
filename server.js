require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = new sqlite3.Database('./cadastros.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Conectado ao banco de dados.');
});

db.run(`
    CREATE TABLE IF NOT EXISTS cadastros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        sobrenome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        telefone TEXT,
        senha TEXT NOT NULL
    )
`);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/cadastro', (req, res) => {
    const { nome, sobrenome, email, telefone, senha } = req.body;
    if (!nome || !sobrenome || !email || !senha) {
        return res.status(400).send('Todos os campos obrigatórios devem ser preenchidos.');
    }

    if (!validarEmail(email)) {
        return res.status(400).send('O formato do email é inválido.');
    }

    db.get(`SELECT * FROM cadastros WHERE email = ?`, [email], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        if (row) {
            return res.status(400).send('Este email já está cadastrado.');
        }

        db.run(`INSERT INTO cadastros (nome, sobrenome, email, telefone, senha) VALUES (?, ?, ?, ?, ?)`,
            [nome, sobrenome, email, telefone, senha],
            (err) => {
                if (err) {
                    return console.error(err.message);
                }
                res.status(200).json({ message: 'Cadastro realizado com sucesso!' });

            }
        );
    });
});

app.listen(PORT, HOST, () => {
    console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});

function validarEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
