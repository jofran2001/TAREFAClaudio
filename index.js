const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let tarefas = [];
let idCounter = 1;

app.get('/tarefas', (req, res) => {
  const { status } = req.query;

  if (status !== undefined) {
    const filtradas = tarefas.filter(t => String(t.status) === status);
    return res.json(filtradas);
  }

  res.json(tarefas);
});

app.post('/tarefas', (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ error: 'O nome da tarefa é obrigatório.' });
  }

  const tarefaExistente = tarefas.find(t => t.nome === nome);
  if (tarefaExistente) {
    return res.status(400).json({ error: 'Uma tarefa com esse nome já existe.' });
  }

  const novaTarefa = { id: idCounter++, nome, status: false };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

app.put('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  const { nome, status } = req.body;
  const tarefa = tarefas.find(t => t.id == id);

  if (!tarefa) {
    return res.status(404).json({ error: 'Tarefa não encontrada.' });
  }

  if (nome) {
    const tarefaExistente = tarefas.find(t => t.nome === nome && t.id != id);
    if (tarefaExistente) {
      return res.status(400).json({ error: 'Uma tarefa com esse nome já existe.' });
    }
    tarefa.nome = nome;
  }

  if (typeof status !== 'undefined') {
    tarefa.status = status;
  }

  res.json(tarefa);
});

app.delete('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  const index = tarefas.findIndex(t => t.id == id);

  if (index === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada.' });
  }

  tarefas.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Rodando em http://localhost:${port}`);
});
