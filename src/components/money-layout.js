import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import {Blockchain} from '@asalvatore/microchain';

const MoneyLayout = (props) =>{

    const [money, setMoney] = useState(0);

    const keys = useSelector(state => state.walletReducer);
    const chain = useSelector(state => state.chainReducer);

    useEffect( ()=>{
        if(!keys.publicKey) return;
        const bank = Blockchain.getInstance().getBank();
        setMoney(bank.getMoneyForSender(keys.publicKey));
    },[keys, chain]);

    return <div>You own {money}$</div>
}

export default MoneyLayout;