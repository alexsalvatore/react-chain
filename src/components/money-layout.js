import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Blockchain } from "@asalvatore/microchain";

const MoneyLayout = (props) => {
  const [money, setMoney] = useState(0);

  const keys = useSelector((state) => state.walletReducer);
  const chain = useSelector((state) => state.chainReducer);

  useEffect(() => {
    if (!keys.publicKey || !Blockchain.getInstance()) return;
    const bank = Blockchain.getInstance().getBank();
    setMoney(bank.getMoneyForSender(keys.publicKey));
  }, [keys, chain]);

  return (
    <div>
      {keys.publicKey && (
        <div>
          <div>
            You are <b>{keys.publicKey.slice(0, 30)}...</b>
          </div>
          <div>
            You have <b>💴 {money}$ </b>{" "}
          </div>
        </div>
      )}
      {!keys.publicKey && (
        <div>💳 Create a Wallet before being able to post or mine!</div>
      )}
    </div>
  );
};

export default MoneyLayout;
