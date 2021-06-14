import { Blockchain } from "@asalvatore/microchain";
import React, { useEffect, useState } from "react";
import PublicKeyLayout from "./public-key-layout";
import { useSelector } from "react-redux";
import SendMoneyLayout from "./send-money-layout";

const ProfileHeader = (props) => {
  const [money, setMoney] = useState(0);
  const chain = useSelector((state) => state.chainReducer);

  useEffect(() => {
    const blockchain = Blockchain.getInstance();
    if (!blockchain?.getBank()) {
      return setMoney(0);
    }

    const bank = blockchain.getBank();
    setMoney(bank.getMoneyForSender(props.userId));
  }, [props.userId, chain]);

  return (
    <div className={"text-center container"}>
      <PublicKeyLayout publicKey={props.userId}></PublicKeyLayout>
      <div>
        Own{" "}
        <b>
          $ <span>{money}</span>
        </b>
      </div>
      <SendMoneyLayout></SendMoneyLayout>
    </div>
  );
};

export default ProfileHeader;
