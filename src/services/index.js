const SERVER_URL = "http://localhost:8888/freemarket/";

export const wsGetAll = () => {
  const formData = new FormData();
  formData.append("action", "getAll");
  return fetch(SERVER_URL, {
    method: "POST",
    body: formData,
  }).then((response) => response.json());
};

export const wsPostBlock = (block) => {
  const formData = new FormData();
  formData.append("action", "addBlock");
  formData.append("block", JSON.stringify(block));
  return fetch(SERVER_URL, {
    method: "POST",
    body: formData,
  }).then((response) => response.json());
};

export const wsPostTX = (tx) => {
  const formData = new FormData();
  formData.append("action", "addTX");
  formData.append("tx", JSON.stringify(tx));
  return fetch(SERVER_URL, {
    method: "POST",
    body: formData,
  }).then((response) => response.json());
};
