/**
 * @description Small JavaScript Blockchain and Cryptocurrency
 * @author Scott Hansford
 * @version 1.0
 * @version 11/16/2020
 */

const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('3aad3564e803828cc78b9833fdc979d3b365134406178f98c720466ecae9ba24');
const myWalletAddress = myKey.getPublic('hex');

let turdCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'PUBLIC KEY GOES HERE', 10);
tx1.signTransaction(myKey);

turdCoin.addTransaction(tx1);

console.log("\nStarting the miner...");
turdCoin.mindPendingTransactions(myWalletAddress);

console.log("\nBalance of your wallet is : ", turdCoin.getBalanceOfAddress(myWalletAddress));

//tamper with chain
turdCoin.chain[1].transactions[0].amount = 1; //returns false

console.log('Is chain valid?', turdCoin.isChainValid());