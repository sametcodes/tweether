import React, { useContext, useEffect, useState } from 'react';
import { CONTRACT_ADDRESS, CONTRACT_NETWORK_ID, CONTRACT_NETWORK_NAME } from '../contract';
import { ethers } from 'ethers';
import { Tweether__factory } from '../contract/types';
import { ExternalProvider } from '@ethersproject/providers';
import { useCallback } from 'react';

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
const contract = Tweether__factory.connect(CONTRACT_ADDRESS, provider.getSigner());

const Context = React.createContext<IContractContext>({
    account: {
        address: null,
        connect: () => { },
        disconnect: () => { },
    },
    contract,
    error: "",
    networkId: undefined
});

type EthersProvider = ExternalProvider & ExtensionForProvider;

const ContractContext = ({ children }: { children: React.ReactNode }) => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [error, setError] = useState<string>("");
    const [networkId, setNetworkId] = useState<number>();

    (window.ethereum as EthersProvider).on('accountsChanged', (accounts) => {
        connect();
        setWalletAddress(accounts[0]);
    });

    (window.ethereum as EthersProvider).on('networkChanged', (network, name) => {
        connect();
        setError("");
        setNetworkId(Number(network));
    });

    const connect = useCallback(async () => {
        const [account] = await provider.send("eth_requestAccounts", []);
        contract.attach(account);
        setWalletAddress(account);
    }, [walletAddress])

    const getNetwork = useCallback(async () => {
        const network = await provider.getNetwork();
        if (network.chainId !== CONTRACT_NETWORK_ID) {
            setError(`Please switch to ${CONTRACT_NETWORK_NAME} network.`);
        } else {
            setError("");
        }
        setNetworkId(network.chainId);
    }, [connect])

    useEffect(() => {
        getNetwork();
    }, [walletAddress])

    const disconnect = () => {
        setWalletAddress(null);
    }

    return <Context.Provider value={{ account: { address: walletAddress, connect, disconnect }, contract, networkId, error }}>
        {children}
    </Context.Provider>
}

export const useContract = () => useContext(Context);

export default ContractContext;