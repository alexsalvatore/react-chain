import * as localforage from "localforage";
const SERVER_URL = "http://localhost:8888/freemarket/";
const MONEY = "";

export const dbSaveBlocks = (blocks) => {
  return localforage.setItem("chain", JSON.stringify(blocks));
};

export const dbFetchBlocks = (callback) => {
  return localforage.getItem("chain", (err, data) => {
    if (err || !data) return callback([]);

    callback(JSON.parse(data));
  });
};

export const wsGetAll = () => {
  const formData = new FormData();
  formData.append("money", MONEY);
  formData.append("action", "getAll");
  return fetch(SERVER_URL, {
    method: "POST",
    body: formData,
  }).then((response) => response.json());
};

export const wsPostBlock = (block, ts) => {
  const formData = new FormData();
  formData.append("money", MONEY);
  formData.append("ts", ts);
  formData.append("action", "addBlock");
  formData.append("block", JSON.stringify(block));
  return fetch(SERVER_URL, {
    method: "POST",
    body: formData,
  }).then((response) => response.json());
};

export const wsPostTX = (tx) => {
  const formData = new FormData();
  formData.append("money", MONEY);
  formData.append("action", "addTX");
  formData.append("tx", JSON.stringify(tx));
  return fetch(SERVER_URL, {
    method: "POST",
    body: formData,
  }).then((response) => response.json());
};
