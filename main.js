/**
 * @description Small JavaScript Blockchain
 * @author Scott Hansford
 * @version 1.0
 * @version 11/16/2020
 */

const { Blockchain, Transaction } = require('./blockchain');
let turdCoin = new Blockchain();

turdCoin.createTransaction(new Transaction('address1', 'address2', 100));
turdCoin.createTransaction(new Transaction('address2', 'address1', 60));


console.log("\nStarting the miner...");
turdCoin.mindPendingTransactions("zenwattages address");

console.log("\nBalance of your wallet is : ", turdCoin.getBalanceOfAddress("zenwattages address"));


console.log("\nStarting the miner...");
turdCoin.mindPendingTransactions("zenwattages address");

console.log("\nBalance of your wallet is : ", turdCoin.getBalanceOfAddress("zenwattages address"));