import {Blockchain} from "./blockchain/Blockchain";

const blockChain = new Blockchain();

var mine = () => {
    blockChain.mine(Math.random());

    console.log(blockChain.blockchain);
};

mine();