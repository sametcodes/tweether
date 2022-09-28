import React, { useContext, useEffect, useState } from 'react';
import { ABI, CONTRACT_ADDRESS } from '../contract';
import { ethers, Contract } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider.getSigner())

interface IContractContext {
    account: {
        address: string | null;
        connect: () => void;
        disconnect: () => void;
    },
    contract: Contract,
}

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

    useEffect(() => {
        connect();
    }, [])

    const connect = async () => {
        const [account] = await provider.send("eth_requestAccounts", []);
        contract.attach(account);
        setWalletAddress(account);
    }

    const disconnect = () => {
        setWalletAddress(null);
    }

    return <Context.Provider value={{ account: { address: walletAddress, connect, disconnect }, contract }}>
        {children}
    </Context.Provider>
}

export const useContract = () => useContext(Context);

export default ContractContext;