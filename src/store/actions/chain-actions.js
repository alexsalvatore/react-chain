import { Block, Blockchain, Transaction } from "@asalvatore/microchain";
import {
  wsGetAll,
  wsPostBlock,
  wsPostTX,
  dbSaveBlocks,
  dbFetchBlocks,
} from "../../services";

export const CHAIN_ADD_BLOCK = "CHAIN_ADD_BLOCK";
export const CHAIN_IS_MINING = "CHAIN_IS_MINING";
export const CHAIN_ADD_PENDING_TX = "CHAIN_ADD_PENDING_TX";

/*
const saveChain = () => {
  const blocks = Blockchain.getInstance().chain;
  localforage.setItem("chain", JSON.stringify(blocks));
};*/

export const initChain = () => {
  // Try to fetch the chain
  return (dispatch) => {
    // We fech the block from the local DB
    dbFetchBlocks((blocksDB) => {
      wsGetAll().then((data) => {
        let blocks = data.result.chain ? data.result.chain : [];
        blocks = [...blocks, ...blocksDB];
        const pendingTX = data.result.pendingTX ? data.result.pendingTX : [];

        const blockchain = Blockchain.init(
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
              ts: 0,
              nonce: 7441,
            },
            FOUNDERS:
              "04820be6a65e928d52e92b8bfe7827de7a09d3afa1356ef81f6f8528b44ba84393d32b44e4590fa9ca6b9576a6d7f2f0467af33d8f68f83e1359a8e4981f4ed5f6",
          },
          blocks.length !== 0 ? blocks : null
        );

        // Add genesis
        const genesis = blockchain.lastBlock;

        if (blocks.length === 0) {
          wsPostBlock(genesis).then((data) => console.log(data));
        }
        //dispatch({ type: CHAIN_ADD_BLOCK, payload: { block: genesis } });

        blockchain.longestBlockchain.forEach((block) =>
          dispatch({ type: CHAIN_ADD_BLOCK, payload: { block } })
        );

        pendingTX.forEach((tx) =>
          dispatch({ type: CHAIN_ADD_PENDING_TX, payload: { tx } })
        );

        // console.log(blockchain.longestBlockchain);
        // console.log(blockchain.chain);
        dbSaveBlocks(blockchain.longestBlockchain);
      });
    });
  };
};

export const addBlock = (block) => {
  return (dispatch) => {
    const blockObj = new Block(block);
    const lastTs = Blockchain.getInstance().lastBlock.ts;
    const result = Blockchain.getInstance().addBlock(blockObj);
    if (!result) return;
    dispatch({ type: CHAIN_ADD_BLOCK, payload: { block } });

    wsPostBlock(block, lastTs).then((data) => {
      const blocks = data.result.chain ? data.result.chain : [];
      const pendingTX = data.result.pendingTX ? data.result.pendingTX : [];

      // Ajout des nouveaux block
      blocks.forEach((newBlock) => {
        const newblockObj = new Block(newBlock);
        const blockExist = Blockchain.getInstance().getParent(newblockObj.hash);
        if (!blockExist) {
          const result = Blockchain.getInstance().addBlock(newblockObj);
          if (result) {
            dispatch({
              type: CHAIN_ADD_BLOCK,
              payload: { block: newblockObj },
            });
          }
        }
      });
      //Ajout des pending
      const bank = Blockchain.getInstance().getBank();
      pendingTX.forEach((tx) => {
        const txObj = new Transaction(tx);
        const index = bank.txPool.findIndex((tpool) => tpool === txObj.hash);
        if (index < 0)
          dispatch({ type: CHAIN_ADD_PENDING_TX, payload: { tx } });
      });

      dbSaveBlocks(Blockchain.longestBlockchain);
    });
  };
};

export const addPendingTX = (tx) => {
  return (dispatch) => {
    wsPostTX(tx).then((data) => console.log(data));
    dispatch({ type: CHAIN_ADD_PENDING_TX, payload: { tx } });
  };
};
