import { describe, it, expect, beforeEach } from 'vitest';
import Blockchain from '../src/Blockchain.js';

describe('Blockchain', () => {
  let chain;

  beforeEach(() => {
    chain = new Blockchain();
  });

  it('Startar med ett genesis block', () => {
    expect(chain.chain).toHaveLength(1);
    expect(chain.chain[0].previousHash).toBe('0');
  });

  it('lägger till transaktioner till den väntande poolen', () => {
    chain.addTransaction({ sender: 'Bondgård A', recipient: 'Rosteri B', batchId: 1, weightKg: 20 });
    expect(chain.pendingTransactions).toHaveLength(1);
  });

  it('minar väntande transaktioner till en ny block och rensar poolen', () => {
    chain.addTransaction({ sender: 'Bondgård A', recipient: 'Rosteri B', batchId: 1, weightKg: 20 });
    const block = chain.minePendingTransactions();

    expect(chain.chain).toHaveLength(2);
    expect(block.previousHash).toBe(chain.chain[0].hash);
    expect(chain.pendingTransactions).toHaveLength(0);
  });

  it('validerar en korrekt kedja som giltig', () => {
    chain.addTransaction({ sender: 'Bondgård A', recipient: 'Rosteri B', batchId: 1, weightKg: 20 });
    chain.minePendingTransactions();

    expect(chain.isChainValid()).toBe(true);
  });

  it('Upptäcker om någon har manipulerat ett block', () => {
    chain.addTransaction({ sender: 'Bondgård A', recipient: 'Rosteri B', batchId: 1, weightKg: 20 });
    chain.minePendingTransactions();

    chain.chain[1].transactions[0].weightKg = 9999;
    expect(chain.isChainValid()).toBe(false);
  });
});
