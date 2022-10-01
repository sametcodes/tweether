declare module 'solc';

interface Window {
    ethereum: import('ethers').providers.ExternalProvider;
}

interface ITweetBox {
    address: string;
    disconnect: () => void;
    setPendingTweets: React.Dispatch<React.SetStateAction<ITweetData[]>>;
    replyTo?: number;
}

interface ITweet {
    data: ITweetData;
}

interface ITweetData {
    id: BigNumber;
    owner: string;
    replies: BigNumber[];
    likes: BigNumber;
    likedByMe: boolean;
    text: string;
    createdAt: BigNumber;
    reply: boolean;
    repliedTo: BigNumber;
}

type TweetType = [BigNumber, string, BigNumber[], BigNumber, boolean, string, BigNumber, boolean, BigNumber];

interface IContractContext {
    account: {
        address: string | null;
        connect: () => void;
        disconnect: () => void;
    },
    contract: import('./contract/types/Tweether').Tweether
}

interface ITweetList{
    pendingTweets: ITweetData[];
    setPendingTweets: React.Dispatch<React.SetStateAction<ITweetData[]>>;
    lists?: number[];
}

interface IHeader{
    setPendingTweets: React.Dispatch<React.SetStateAction<ITweetData[]>>;
}

interface ITweetDetail{
    tweetId: number;
}