import express from 'express';
import Blockchain from './Blockchain.js';

export function createApp() {
  const app = express();
  app.use(express.json());

  const coffeeChain = new Blockchain();

  app.get('/blockchain', (req, res) => {
    res.status(200).json(coffeeChain);
  });

  app.post('/transactions', (req, res) => {
    const { sender, recipient, batchId, weightKg } = req.body;

    if (!sender || !recipient || !batchId || !weightKg) {
      return res.status(400).json({ error: 'sender, recipient, batchId and weightKg are required' });
    }

    const transaction = coffeeChain.addTransaction({ sender, recipient, batchId, weightKg });
    res.status(201).json(transaction);
  });

  app.post('/mine', (req, res) => {
    if (coffeeChain.pendingTransactions.length === 0) {
      return res.status(400).json({ error: 'No pending transactions to mine' });
    }

    const block = coffeeChain.minePendingTransactions();
    res.status(201).json(block);
  });

  return app;
}
