const express = require('express');
const router = express.Router();
const connection = require('../config/database');

// Criar um pedido
router.post('/', (req, res) => {
  const { id_cliente, id_produto, quantidade, valor_total } = req.body;
  connection.query(
    `INSERT INTO pedidos
    (id_cliente, id_produto, quantidade, valor_total, data_pedido) VALUES
    (?, ?, ?, ?, NOW())`,
    [id_cliente, id_produto, quantidade, valor_total],
    (err, result) => {
      if (err) {
        console.error('Erro ao inserir pedido: ', err);
        res.status(500).send('Erro ao inserir pedido');
        return;
      }
      res.status(201).send('pedido cadastrado com sucesso!');
    }
  );
});

// Listar todos os pedidos
router.get('/', (req, res) => {
  connection.query('SELECT * FROM pedidos', (err, result) => {
    if (err) {
      console.error('Erro ao buscar pedidos: ', err);
      res.status(500).send('Erro ao buscar pedidos');
      return;
    }
    res.json(result);
  });
});

// Editar um pedido
router.put('/:id', (req, res) => {
  const { quantidade, valor_total } = req.body;
  const { id } = req.params;
  connection.query(
    'UPDATE pedidos SET quantidade = ?, valor_total = ? WHERE id_pedido = ?',
    [quantidade, valor_total, id],
    (err, result) => {
      if (err) {
        console.error('Erro ao editar pedido: ', err);
        res.status(500).send('Erro ao editar pedido');
        return;
      }
      res.send('pedido editado com sucesso!');
    }
  );
});

// Deletar um pedido
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  connection.query(
    'DELETE FROM pedidos WHERE id_pedido = ?',
    [id],
    (err, result) => {
      if (err) {
        console.error('Erro ao deletar pedido: ', err);
        res.status(500).send('Erro ao deletar pedido');
        return;
      }
      res.send('pedido deletado com sucesso!');
    }
  );
});

module.exports = router;
