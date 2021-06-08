import { Block, Blockchain, Transaction } from "@asalvatore/microchain";
import { wsGetAll, wsPostBlock, wsPostTX } from "../../services";
import localforage from "localforage";

export const CHAIN_ADD_BLOCK = "CHAIN_ADD_BLOCK";
export const CHAIN_IS_MINING = "CHAIN_IS_MINING";
export const CHAIN_ADD_PENDING_TX = "CHAIN_ADD_PENDING_TX";

const saveChain = () => {
  const blocks = Blockchain.getInstance().chain;
  localforage.setItem("chain", JSON.stringify(blocks));
};

export const initChain = () => {
  // Try to fetch the chain
  return (dispatch) => {
    wsGetAll().then((data) => {
      const blocks = data.result.chain;
      const pendingTX = data.result.pendingTX;

      Blockchain.init({
        BLOCK_HASH_METHOD: "MD5",
        BLOCK_MIN_DIFFICULTY: 3,
        BLOCK_MAX_DIFFICULTY: 3,
        TX_CONTENT_EXPIRATION_HOURS: 12,
        MONEY_BY_BLOCK: 15,
        MONEY_BY_KO: 1.2,
        TX_CONTENT_MAX_SIZE_KO: 200,
        GENESIS_BLOCK: {
          publisher:
            "04820be6a65e928d52e92b8bfe7827de7a09d3afa1356ef81f6f8528b44ba84393d32b44e4590fa9ca6b9576a6d7f2f0467af33d8f68f83e1359a8e4981f4ed5f6",
        },
        FOUNDERS:
          "04820be6a65e928d52e92b8bfe7827de7a09d3afa1356ef81f6f8528b44ba84393d32b44e4590fa9ca6b9576a6d7f2f0467af33d8f68f83e1359a8e4981f4ed5f6",
      });

      // If blockmem == NULL we generated the genensis block
      // if (!blocksMem) saveChain();

      // Add genesis
      const genesis = Blockchain.getInstance().lastBlock;
      console.log(genesis);
      if (blocks.length === 0) {
        wsPostBlock(genesis).then((data) => console.log(data));
      }
      dispatch({ type: CHAIN_ADD_BLOCK, payload: { block: genesis } });

      const txHash = [];
      blocks.forEach((block) => {
        const blockObj = new Block(block);
        const result = Blockchain.getInstance().addBlock(blockObj);
        if (result && blockObj.transactions) {
          JSON.parse(blockObj.transactions).forEach((tx) => {
            const txObj = new Transaction(tx);
            txHash.push(txObj.hash);
          });
          dispatch({ type: CHAIN_ADD_BLOCK, payload: { block } });
        }
      });

      pendingTX.forEach((tx) => {
        const txObj = new Transaction(tx);
        if (txHash.findIndex((hash) => hash === txObj.hash) >= 0) return;
        dispatch({ type: CHAIN_ADD_PENDING_TX, payload: { tx } });
      });
    });

    //localforage.getItem("chain", (err, value) => {
    /*const blocksMem = !err && value ? JSON.parse(value) : null;

      Blockchain.init(
        {
          BLOCK_HASH_METHOD: "MD5",
          BLOCK_MIN_DIFFICULTY: 3,
          BLOCK_MAX_DIFFICULTY: 3,
          TX_CONTENT_EXPIRATION_HOURS: 12,
          MONEY_BY_BLOCK: 15,
          MONEY_BY_KO: 1.2,
          TX_CONTENT_MAX_SIZE_KO: 200,
          GENESIS_BLOCK: {
            publisher:
              "04820be6a65e928d52e92b8bfe7827de7a09d3afa1356ef81f6f8528b44ba84393d32b44e4590fa9ca6b9576a6d7f2f0467af33d8f68f83e1359a8e4981f4ed5f6",
          },
          FOUNDERS:
            "04820be6a65e928d52e92b8bfe7827de7a09d3afa1356ef81f6f8528b44ba84393d32b44e4590fa9ca6b9576a6d7f2f0467af33d8f68f83e1359a8e4981f4ed5f6",
        },
        blocksMem
      );

      const blocks = Blockchain.getInstance().chain;
      // If blockmem == NULL we generated the genensis block
      if (!blocksMem) saveChain();

      blocks.forEach((block) => {
        dispatch({ type: CHAIN_ADD_BLOCK, payload: { block } });
      });*/
    // });
  };
};

export const addBlock = (block) => {
  return (dispatch) => {
    const result = Blockchain.getInstance().addBlock(block);
    if (!result) return;
    //saveChain();
    wsPostBlock(block).then((data) => console.log(data));
    dispatch({ type: CHAIN_ADD_BLOCK, payload: { block } });
  };
};

export const addPendingTX = (tx) => {
  return (dispatch) => {
    wsPostTX().then((data) => console.log(data));
    dispatch({ type: CHAIN_ADD_PENDING_TX, payload: { tx } });
  };
};
