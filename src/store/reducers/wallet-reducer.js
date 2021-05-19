import { WALLET_EDIT, WALLET_CLEAR, WALLET_CREATE} from '../actions/wallet-actions';
import { Wallet } from '@asalvatore/microchain';

const initialState = {
    publicKey: '',
    privateKey: '',
    isOk: false,
};

export const walletReducer = (state = initialState, action) =>{
    switch(action.type){
        case WALLET_EDIT:

            const newState =  {...state, ...action.payload };
            // Is the keys pair valid???
            const wallet0 = new Wallet(newState.publicKey,newState.privateKey);
            const testMessage = 'test';
            const signature = wallet0.sign(testMessage);
            const isOk = Wallet.verifySignature(testMessage, signature,newState.publicKey);

            return {...newState, isOk };
        
        case WALLET_CREATE:
            const wallet1 = new Wallet();
            return {...state, publicKey: wallet1.publicKey, privateKey: wallet1.privateKey, isOk: true};

        case WALLET_CLEAR:
            return initialState;
        
        default:
            return state;
    }
}