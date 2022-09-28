interface Window {
    ethereum: import('ethers').providers.ExternalProvider;
}

interface ITweetBox{
    address: string;
    disconnect: () => void;
    setPendingTweets: React.Dispatch<React.SetStateAction<ITweetData[]>>;
}

interface ITweet {
    data: ITweetData;
    refetch?: () => ITweetData;
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
