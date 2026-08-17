import Block from './Block.js';

// Fortsätter mining instant i tester, riktig difficulty i produktion
const DIFFICULTY = process.env.NODE_ENV === 'test' ? 1 : 3;

export default class Blockchain {
  constructor() {
    this.difficulty = DIFFICULTY;
    this.pendingTransactions = [];
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, '0', []);
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
    return transaction;
  }

  minePendingTransactions() {
    const block = new Block(
      this.chain.length,
      this.getLatestBlock().hash,
      this.pendingTransactions
    );

    block.mineBlock(this.difficulty);

    this.chain.push(block);
    this.pendingTransactions = [];
    return block;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}
