import React, { useContext, useEffect, useMemo, useState } from 'react';
import { CONTRACT_ADDRESS, CONTRACT_NETWORK_ID, CONTRACT_NETWORK_NAME } from '../contract';
import { ethers } from 'ethers';
import { Tweether__factory } from '../contract/types';
import { ExternalProvider } from '@ethersproject/providers';
import { useCallback } from 'react';

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
const contract = Tweether__factory.connect(CONTRACT_ADDRESS, provider);

const Context = React.createContext<IContractContext>({
    account: {
        address: null,
        connect: () => {},
        changeAccount: () => {}
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

    const contract = useMemo(() => Tweether__factory.connect(CONTRACT_ADDRESS, provider.getSigner()), [walletAddress]);

    (window.ethereum as EthersProvider).on('accountsChanged', (accounts: any) => {
        connect();
        contract.attach(accounts[0]);
        setWalletAddress(accounts[0]);
    });

    (window.ethereum as EthersProvider).on('networkChanged', (network, name) => {
        connect();
        setError("");
        setNetworkId(Number(network));
    });

    const connect = useCallback(async () => {
        const [account] = await provider.send("eth_requestAccounts", []);
        contract.attach(account);
        setWalletAddress(account);
    }, [])

    const getNetwork = useCallback(async () => {
        const network = await provider.getNetwork();
        if (network.chainId !== CONTRACT_NETWORK_ID) {
            setError(`Please switch to ${CONTRACT_NETWORK_NAME} network to use the application.`);
        } else {
            setError("");

            const [account] = await provider.send("eth_accounts", []);
            if (!account) return;
            contract.attach(account);
            setWalletAddress(account);
        }
        setNetworkId(network.chainId);
    }, [connect])

    useEffect(() => {
        getNetwork();
    }, []);

    const changeAccount = useCallback(async () => {
        await provider.send("wallet_requestPermissions", [{ eth_accounts: {} }])
    }, [])

    return <Context.Provider value={{ account: { address: walletAddress, changeAccount, connect }, contract, networkId, error }}>
        {children}
    </Context.Provider>
}

export const useContract = () => useContext(Context);

export default ContractContext;