const express = require('express');
const router = express.Router();
const connection = require('../config/database');

// Criar um cliente
router.post('/', (req, res) => {
  const { nome, email } = req.body;
  connection.query(
    'INSERT INTO clientes (nome, email) VALUES (?, ?)',
    [nome, email],
    (err, result) => {
      if (err) {
        console.error('Erro ao inserir cliente: ', err);
        res.status(500).send('Erro ao inserir cliente');
        return;
      }
      res.status(201).send('Cliente cadastrado com sucesso!');
    }
  );
});

// Listar todos os clientes
router.get('/', (req, res) => {
  connection.query('SELECT * FROM clientes', (err, result) => {
    if (err) {
      console.error('Erro ao buscar clientes: ', err);
      res.status(500).send('Erro ao buscar clientes');
      return;
    }
    res.json(result);
  });
});

// Editar um cliente
router.put('/:id', (req, res) => {
  const { nome, email } = req.body;
  const { id } = req.params;
  connection.query(
    'UPDATE clientes SET nome = ?, email = ? WHERE id_cliente = ?',
    [nome, email, id],
    (err, result) => {
      if (err) {
        console.error('Erro ao editar cliente: ', err);
        res.status(500).send('Erro ao editar cliente');
        return;
      }
      res.send('Cliente editado com sucesso!');
    }
  );
});

// Deletar um cliente
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  connection.query(
    'DELETE FROM clientes WHERE id_cliente = ?',
    [id],
    (err, result) => {
      if (err) {
        console.error('Erro ao deletar cliente: ', err);
        res.status(500).send('Erro ao deletar cliente');
        return;
      }
      res.send('Cliente deletado com sucesso!');
    }
  );
});

module.exports = router;
