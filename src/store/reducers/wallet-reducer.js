import { WALLET_EDIT, WALLET_CLEAR} from '../actions/wallet-actions';
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
            const wallet = new Wallet(newState.publicKey,newState.privateKey);
            const testMessage = 'test';
            const signature = wallet.sign(testMessage);
            const isOk = Wallet.verifySignature(testMessage, signature,newState.publicKey);

            return {...newState, isOk };
        
        case WALLET_CLEAR:
            return initialState;
        
        default:
            return state;
    }
}