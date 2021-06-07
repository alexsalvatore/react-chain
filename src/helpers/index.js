export const TX_TYPE_NONE = 0;
export const TX_TYPE_MONEY = 1;
export const TX_TYPE_OWNERSHIP = 2;
export const TX_TYPE_CONTENT = 3;

export const typeofTX = (tx) => {
  if (tx.ownership) {
    return TX_TYPE_OWNERSHIP;
  } else if (tx.contentHash) {
    return TX_TYPE_CONTENT;
  } else if (tx.amount && tx.sender && tx.receiver) {
    return TX_TYPE_MONEY;
  }
  return TX_TYPE_NONE;
};
