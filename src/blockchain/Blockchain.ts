import * as _ from "lodash";
import {Block} from "./Block";
import * as crypto from "crypto-js";

export class Blockchain {
    private _blockchain: [Block];
    protected difficulty = 3;

    constructor() {
        this._blockchain = [Block.genesis()];
    }

    get blockchain(): [Block] {
        return this._blockchain;
    }

    get latestBlock(): Block {
        return _.last(this._blockchain);
    }

    /*
     * When adding a new block to the blockchain, the new block needs to meet these requirements.
     * Block index one greater than latest block index.
     * Block previous hash equal to latest block hash.
     * Block hash meets difficulty requirement.
     * Block hash is correctly calculated.
     */
    isValidNextBlock(nextBlock: Block, previousBlock: Block): boolean {
        // why the server must calculate hash. Because it's will be same as client. Take a lot of resource.
        const nextBlockHash = this.calculateHashForBlock(nextBlock);

        if (previousBlock.index + 1 !== nextBlock.index) {
            return false;
        }

        if (this.calculateHashForBlock(nextBlock)!== nextBlockHash) {
            return false;
        }

        if (previousBlock.hash !== nextBlock.previousHash) {
            return false;
        }

        if (!this.isValidHashDifficulty(nextBlock.hash)) {
            return false;
        }

        return true;
    }


    isValidHashDifficulty(hash) {
        for (var i = 0; i < hash.length; i++) {
            if (hash[i] !== "0") {
                break;
            }
            ;
        }
        return i >= this.difficulty;
    }

    /*
    * Mining is the process of finding a valid hash.
    * If the hash is invalid, click on the button to mine the genesis block!
    */
    mine(data) {
        const newBlock = this.generateNextBlock(data);

        try {
            this.addBlock(newBlock);
        } catch (err) {
            throw err;
        }
    }

    /*
     * The nonce is the number used to find a valid hash.
     * The nonce iterates from 0 until a valid hash is found. This uses processing power!
     */
    protected generateNextBlock(data: string): Block {
        const nextIndex    = this.latestBlock.index + 1;
        const previousHash = this.latestBlock.hash;
        let timestamp      = new Date().getTime();
        let nonce          = 0;

        let nextHash = this._calculateHash(
            nextIndex,
            previousHash,
            timestamp,
            data,
            nonce
        );

        while (!this.isValidHashDifficulty(nextHash)) {
            nonce     = nonce + 1;
            timestamp = new Date().getTime();
            nextHash  = this._calculateHash(
                nextIndex,
                previousHash,
                timestamp,
                data,
                nonce
            );
        }

        const nextBlock = new Block(
            nextIndex,
            previousHash,
            timestamp,
            data,
            nextHash,
            nonce
        );

        return nextBlock;
    }

    calculateHashForBlock(block: Block): string {
        return this._calculateHash(block.index, block.previousHash, block.timestamp, block.data, block.nonce);
    }

    protected _calculateHash(index: number, previousHash: string, timestamp: number, data: string, nonce: number): string {
        return crypto.SHA256(index + previousHash + timestamp + data + nonce)
                     .toString(crypto.enc.Hex)
    }

    protected addBlock(nextBlock: Block) {
        if (this.isValidNextBlock(nextBlock, this.latestBlock)) {
            this._blockchain.push(nextBlock);
        } else {
            throw "Error: Invalid block";
        }
    }
}