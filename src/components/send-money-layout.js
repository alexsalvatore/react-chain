import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import PublicKeyLayout from "./public-key-layout";
import { Blockchain } from "@asalvatore/microchain";

const SendMoneyLayout = (props) => {
  const [tx, setTx] = useState({
    amount: 0,
    receiver: "",
  });

  const [money, setMoney] = useState(0);
  const keys = useSelector((state) => state.walletReducer);
  const chain = useSelector((state) => state.chainReducer);

  useEffect(() => {
    if (!keys.publicKey || !Blockchain.getInstance()) return;
    const bank = Blockchain.getInstance().getBank();
    setMoney(bank.getMoneyForSender(keys.publicKey));
  }, [keys, chain]);

  const onChange = (e) => {
    setTx({ ...tx, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div>
        Amount of $:{" "}
        <input
          name="amount"
          type="number"
          value={tx.amount}
          onChange={onChange}
        ></input>
        <div>You have ${money}</div>
      </div>
      <div>
        Receiver:{" "}
        <input name="receiver" value={tx.receiver} onChange={onChange}></input>
        <div>
          You are <PublicKeyLayout publicKey={keys.publicKey}></PublicKeyLayout>
        </div>
      </div>
      <Button disabled={!tx.receiver || !tx.amount || tx.amount > money}>
        Send Transaction!
      </Button>
    </div>
  );
};

export default SendMoneyLayout;
