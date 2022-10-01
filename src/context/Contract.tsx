import React, { useContext, useEffect, useState } from 'react';
import { CONTRACT_ADDRESS } from '../contract';
import { ethers } from 'ethers';
import { Tweether__factory } from '../contract/types';

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
const contract = Tweether__factory.connect(CONTRACT_ADDRESS, provider.getSigner());

const Context = React.createContext<IContractContext>({
    account: {
        address: null,
        connect: () => { },
        disconnect: () => { },
    },
    contract,
});

const ContractContext = ({ children }: { children: React.ReactNode }) => {
    const [walletAddress, setWalletAddress] = useState(null);

    const connect = async () => {
        const [account] = await provider.send("eth_requestAccounts", []);
        contract.attach(account);
        setWalletAddress(account);
    }

    useEffect(() => {
        connect();
    }, [])

    const disconnect = () => {
        setWalletAddress(null);
    }

    return <Context.Provider value={{ account: { address: walletAddress, connect, disconnect }, contract }}>
        {children}
    </Context.Provider>
}

export const useContract = () => useContext(Context);

export default ContractContext;