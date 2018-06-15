export class Block {

    /*
     *  The index is the position of the block in the chain.
     *  The timestamp helps keep the blockchain in order.
     *  It is a numeric value that uniquely identifies data, or the "digital fingerprint" of data.
     *  A valid hash is a hash that meets a certain requirement. For this blockchain, three leading zeros infront of the hash is the requirement for a valid hash.
     *  The previous hash is the hash of the previous block.
     *  Since data is an input variable for the hash, changing the data will change the hash. The new hash will lose its three leading zeros, and becomes invalid.
     *  Mining is the process of finding a valid hash. If the hash is invalid, click on the button to mine the genesis block!
     *  The nonce is the number used to find a valid hash. The nonce iterates from 0 until a valid hash is found. This uses processing power!
     */
    constructor(public index: number,
                public previousHash: string,
                public timestamp: number,
                public data: string,
                public hash: string,
                public nonce: number) {
    }

    /*
    * A blockchain has a list of blocks.
    * It starts with a single block, called the genesis block.
     */
    static genesis(): Block {
        return new Block(0, "0", new Date().getTime(), "vjcspy", "", 0)
    }
}