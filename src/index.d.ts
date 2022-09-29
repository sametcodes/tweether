interface Window {
    ethereum: import('ethers').providers.ExternalProvider;
}

interface ITweetBox {
    address: string;
    disconnect: () => void;
    setPendingTweets: React.Dispatch<React.SetStateAction<ITweetData[]>>;
}

interface ITweet {
    data: ITweetData;
}

interface ITweetData {
    id: number;
    owner: string;
    replies: number[];
    likes: number;
    likedByMe: boolean;
    text: string;
    createdAt: number;
}

type TweetType = [string, string, number[], number, boolean, string, number];

interface IContractContext {
    account: {
        address: string | null;
        connect: () => void;
        disconnect: () => void;
    },
    contract: Contract,
}

interface ITweetList{
    pendingTweets: ITweetData[];
    setPendingTweets: React.Dispatch<React.SetStateAction<ITweetData[]>>;
}

interface IHeader{
    setPendingTweets: React.Dispatch<React.SetStateAction<ITweetData[]>>;
}