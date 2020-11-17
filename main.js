/**
 * @description Small JavaScript Blockchain
 * @author Scott Hansford
 * @version 1.0
 * @version 11/16/2020
 */


const SHA256 = require('crypto-js/sha256');


class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

/**
 * @description Block constructor
 */
class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    /**
     * @description Run properties of the block through a SHA256 hash function * and return hash
     * 
     */
    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}


/**
 * @description Chain of blocks
 */
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock() {
        return new Block("01/01/2020", "Genesis block", "0000");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];

    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        //newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash != currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash != previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}



let turdCoin = new Blockchain();

console.log("Mining block 1....");
turdCoin.addBlock(new Block(1, "10/07/2020", { amount: 4 }));

console.log("Mining block 2....");
turdCoin.addBlock(new Block(2, "11/01/2020", { amount: 12 }));

// console.log('Is blockchain valid? ' + turdCoin.isChainValid()); //true

// //console.log(JSON.stringify(turdCoin, null, 4));


// //trying to change block 2
// //give ourselves 100 coins
// turdCoin.chain[1].data = { amount: 100 };
// turdCoin.chain[1].hash = turdCoin.chain[1].calculateHash();

// console.log('Is blockchain valid? ' + turdCoin.isChainValid()); //false
