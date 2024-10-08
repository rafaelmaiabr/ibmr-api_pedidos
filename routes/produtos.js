const express = require('express');
const router = express.Router();
const connection = require('../config/database');

// Criar um produto
router.post('/', (req, res) => {
  const { nome_produto, preco, estoque } = req.body;
  connection.query(
    'INSERT INTO produtos (nome_produto, preco, estoque) VALUES (?, ?, ?)',
    [nome_produto, preco, estoque],
    (err, result) => {
      if (err) {
        console.error('Erro ao inserir produto: ', err);
        res.status(500).send('Erro ao inserir produto');
        return;
      }
      res.status(201).send('produto cadastrado com sucesso!');
    }
  );
});

// Listar todos os produtos
router.get('/', (req, res) => {
  connection.query('SELECT * FROM produtos', (err, result) => {
    if (err) {
      console.error('Erro ao buscar produtos: ', err);
      res.status(500).send('Erro ao buscar produtos');
      return;
    }
    res.json(result);
  });
});

// Editar um produto
router.put('/:id', (req, res) => {
  const { nome_produto, preco, estoque } = req.body;
  const { id } = req.params;
  connection.query(
    'UPDATE produtos SET nome_produto = ?, preco = ?, estoque = ? WHERE id_produto = ?',
    [nome_produto, preco, estoque, id],
    (err, result) => {
      if (err) {
        console.error('Erro ao editar produto: ', err);
        res.status(500).send('Erro ao editar produto');
        return;
      }
      res.send('produto editado com sucesso!');
    }
  );
});

// Deletar um produto
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  connection.query(
    'DELETE FROM produtos WHERE id_produto = ?',
    [id],
    (err, result) => {
      if (err) {
        console.error('Erro ao deletar produto: ', err);
        res.status(500).send('Erro ao deletar produto');
        return;
      }
      res.send('produto deletado com sucesso!');
    }
  );
});

module.exports = router;
