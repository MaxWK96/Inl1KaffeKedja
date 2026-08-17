import { describe, it, expect } from 'vitest';
import Block from '../src/Block.js';

describe('Block', () => {
  it('räknar ut en SHA-256 hash från sitt innehåll', () => {
    const block = new Block(0, '0', []);
    const hash = block.calculateHash();

    expect(typeof hash).toBe('string');
    expect(hash).toHaveLength(64); // SHA-256 hex = 64 chars
  });

  it('producerar en annan hash om transaktioner ändras', () => {
    const block1 = new Block(0, '0', [{ sender: 'Sara', recipient: 'Nils', batchId: 1, weightKg: 10 }]);
    const block2 = new Block(0, '0', [{ sender: 'Sara', recipient: 'Nils', batchId: 1, weightKg: 10 }]);

    expect(block1.calculateHash()).not.toBe(block2.calculateHash());
  });

  it('minar en hash som börjar med "difficulty" antal nollor', () => {
    const block = new Block(0, '0', []);
    block.mineBlock(2);

    expect(block.hash.substring(0, 2)).toBe('00');
  });
});
