import React, { useEffect, useState } from "react";
import localforage from "localforage";
import { useSelector } from "react-redux";
import { Blockchain, Transaction, Wallet } from "@asalvatore/microchain";
import { addPendingTX } from "../store/actions/chain-actions";
import store from "../store/store";

const PostingLayout = (props) => {
  const keys = useSelector((state) => state.walletReducer);

  const [postData, setPost] = useState({
    title: "",
    text: "",
    channel: "",
    image: "",
    author: "",
  });
  const [postMoney, setPostMoney] = useState(0);

  useEffect(() => {
    localforage.getItem("postDraft", (err, value) => {
      if (err || !value) return;
      setPost({ ...postData, ...JSON.parse(value) });
    });
  }, []);

  const onChange = (e) => {
    setPost({ ...postData, [e.target.name]: e.target.value });
    updateValue({ ...postData, [e.target.name]: e.target.value });
    localforage.setItem(
      "postDraft",
      JSON.stringify({ ...postData, [e.target.name]: e.target.value })
    );
  };

  const updateValue = (data) => {
    const content = JSON.stringify(data);
    const tx = new Transaction({ content });
    const postValue = Blockchain.getInstance().getTransactionCost(tx);
    setPostMoney(postValue);
  };

  const postTransaction = () => {
    const myWallet = new Wallet(keys.publicKey, keys.privateKey);
    const tx = myWallet.createTransaction({
      sender: myWallet.publicKey,
      content: JSON.stringify(postData),
    });
    store.dispatch(addPendingTX(tx));

    const blankPost = {
      ...postData,
      title: "",
      text: "",
      image: "",
    };
    setPost(blankPost);

    localforage.setItem("postDraft", JSON.stringify(blankPost));
  };

  return (
    <div>
      <h2>Posting</h2>
      <div>
        Cost {postMoney}$ ({JSON.stringify(postData).length / 1000}Ko)
      </div>
      <div>
        <input
          value={postData.title}
          name="title"
          placeholder="title"
          onChange={onChange}
        ></input>{" "}
        <br />
        <input
          value={postData.author}
          name="author"
          placeholder="author"
          onChange={onChange}
        ></input>{" "}
        <br />
        <input
          value={postData.image}
          name="image"
          placeholder="image"
          onChange={onChange}
        ></input>{" "}
        <br />
        <input
          value={postData.channel}
          name="channel"
          placeholder="channel"
          onChange={onChange}
        ></input>{" "}
        <br />
        <textarea
          value={postData.text}
          name="text"
          rows="5"
          cols="60"
          onChange={onChange}
        ></textarea>
        <br />
      </div>
      <button
        disabled={!postData.text && !postData.image}
        onClick={postTransaction}
      >
        Post as Transaction
      </button>
    </div>
  );
};

export default PostingLayout;
