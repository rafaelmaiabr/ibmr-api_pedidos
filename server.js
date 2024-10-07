const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Importando os módulos
const clientesRoutes = require('./routes/clientes');
const produtosRoutes = require('./routes/produtos');
const pedidosRoutes = require('./routes/pedidos');

// Usando as rotas
app.use('/clientes', clientesRoutes);
app.use('/produtos', produtosRoutes);
app.use('/pedidos', pedidosRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.send('API de Cadastro de Clientes, Produtos e Pedidos');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
