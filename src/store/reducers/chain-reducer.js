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
  isMining: false,
};

export const chainReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAIN_ADD_BLOCK:
      // Is there some content transaction?
      const newBlock = action.payload.block;

      const contentFound = [];
      let newPendingTX = state.pendingTX;

      if (newBlock.transactions) {
        const txs = JSON.parse(newBlock.transactions);

        txs.forEach((tx) => {
          if (typeofTX(tx) === TX_TYPE_CONTENT) contentFound.push(tx);

          const comingTransaction = new Transaction(tx);

          //Does this TX is pending?
          const indexToSupp = newPendingTX.findIndex((tx) => {
            const pendingTransaction = new Transaction(tx);
            return pendingTransaction.hash === comingTransaction.hash;
          });
          newPendingTX.splice(indexToSupp, 1);
        });
      }
      console.log(contentFound);
      return {
        ...state,
        pendingTX: newPendingTX,
        contentTX: [...contentFound, ...state.contentTX],
        blocks: [action.payload.block, ...state.blocks],
        isMining: false,
      };

    case CHAIN_ADD_PENDING_TX:
      return { ...state, pendingTX: [...state.pendingTX, action.payload.tx] };

    case CHAIN_IS_MINING:
      return { ...state, isMining: true };

    default:
      return state;
  }
};
