const SHA256 = require("crypto-js/sha256");

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

class Block {
  constructor(timestamp, transactions, previousHash = "") {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce
    ).toString();
  }
  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block Mined ", this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransaction = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block("02/02/2020", "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  minePendingTransaction() {}

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];

      if (currBlock.hash !== currBlock.calculateHash()) {
        return false;
      }

      if (currBlock.previousHash !== prevBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

let pratapBlock = new Blockchain();
console.log("Mining Block 1...");
pratapBlock.addBlock(new Block(1, "02/02/2020", { amount: 10 }));
console.log("Mining Block 2...");
pratapBlock.addBlock(new Block(2, "02/02/2020", { amount: 4 }));

// //console.log(JSON.stringify(pratapBlock, null, 4));

// console.log("Is blockchain valid ", pratapBlock.isChainValid());

// pratapBlock.chain[1].data = { amount: 16 };
// console.log("Is blockchain valid ", pratapBlock.isChainValid());
