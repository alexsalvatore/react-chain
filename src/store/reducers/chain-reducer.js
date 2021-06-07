import { typeofTX, TX_TYPE_CONTENT } from "../../helpers";
import {
  CHAIN_ADD_BLOCK,
  CHAIN_ADD_CHAIN,
  CHAIN_IS_MINING,
  CHAIN_ADD_PENDING_TX,
} from "../actions/chain-actions";

const initialState = {
  blocks: [],
  contentTX: [],
  pendingTX: [],
  isMining: false,
};

export const chainReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAIN_ADD_BLOCK:
      // Is there some content transaction?
      const newBlock = action.payload.block;
      const contentFound = [];
      if (newBlock.transactions) {
        const txs = JSON.parse(newBlock.transactions);
        txs.forEach((tx) => {
          if (typeofTX(tx) === TX_TYPE_CONTENT) contentFound.push(tx);
        });
      }

      console.log(contentFound);

      return {
        ...state,
        contentTX: [...state.contentTX, ...contentFound],
        blocks: [...state.blocks, action.payload.block],
        isMining: false,
      };

    case CHAIN_ADD_CHAIN:
      const contentFoundInChain = [];
      action.payload.blocks.forEach((newBlock) => {
        if (newBlock.transactions) {
          const txs = JSON.parse(newBlock.transactions);
          txs.forEach((tx) => {
            if (typeofTX(tx) === TX_TYPE_CONTENT) contentFoundInChain.push(tx);
          });
        }
      });

      return {
        ...state,
        blocks: [...state.blocks, ...action.payload.blocks],
        contentTX: [...state.contentTX, ...contentFoundInChain],
      };

    case CHAIN_ADD_PENDING_TX:
      return { ...state, pendingTX: [...state.pendingTX, action.payload.tx] };

    case CHAIN_IS_MINING:
      return { ...state, isMining: true };

    default:
      return state;
  }
};
