import { Transaction } from "@asalvatore/microchain";
import { typeofTX, TX_TYPE_CONTENT } from "../../helpers";
import {
  CHAIN_ADD_BLOCK,
  CHAIN_IS_MINING,
  CHAIN_ADD_PENDING_TX,
} from "../actions/chain-actions";

const initialState = {
  blocks: [],
  contentTX: [],
  pendingTX: [],
  validTX: [],
  isMining: false,
};

const sortByTs = (a, b) => {
  if (a.ts < b.ts) {
    return -1;
  }
  if (a.ts > b.ts) {
    return 1;
  }
  // a must be equal to b
  return 0;
};

export const chainReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAIN_ADD_BLOCK:
      // Is there some content transaction?
      const newBlock = action.payload.block;

      const contentFound = [];
      const txFound = [];

      let newPendingTX = state.pendingTX;

      if (newBlock.transactions) {
        const txs = JSON.parse(newBlock.transactions);
        txs.forEach((tx) => {
          if (typeofTX(tx) === TX_TYPE_CONTENT && tx.content)
            contentFound.push(tx);
          txFound.push(tx);

          //Does this TX is pending?
          const indexToSupp = newPendingTX.findIndex((pendingTx) => {
            return pendingTx.signature === tx.signature;
          });

          if (indexToSupp >= 0) newPendingTX.splice(indexToSupp, 1);
        });
      }

      return {
        ...state,
        pendingTX: newPendingTX,
        validTX: [...state.validTX, ...txFound],
        contentTX: [...contentFound, ...state.contentTX],
        blocks: [action.payload.block, ...state.blocks].sort(sortByTs),
        isMining: false,
      };

    case CHAIN_ADD_PENDING_TX:
      const result = state.validTX.findIndex(
        (tx) => tx.signature === action.payload.tx.signature
      );
      if (result >= 0) return state;

      return { ...state, pendingTX: [...state.pendingTX, action.payload.tx] };

    case CHAIN_IS_MINING:
      return { ...state, isMining: true };

    default:
      return state;
  }
};
