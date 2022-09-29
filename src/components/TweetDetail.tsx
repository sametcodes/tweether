import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useContract } from '../context/Contract';
import { Tweet, TweetLoading, TweetBox, TweetList, PendingTweet } from '../components';

export const TweetDetail = ({ tweetId }: ITweetDetail) => {
    const { contract, account: { address, disconnect } } = useContract();
    const [tweet, setTweet] = useState<ITweetData | undefined>();
    const [pendingTweets, setPendingTweets] = useState<ITweetData[]>([]);

    const getTweet = useCallback(async () => {
        const [id, owner, replies, likes, likedByMe, text, createdAt]: TweetType = await contract.getTweet(tweetId);
        setTweet({ id: Number(id), owner, replies, likes: Number(likes), likedByMe, text, createdAt: Number(createdAt) });
    }, [tweetId]);

    useEffect(() => {
        getTweet();

        return () => {
            setTweet(undefined);
        }
    }, [tweetId]);

    return <div className="detail-tweet">
        <h2>Detail</h2>
        {!tweet && Array.from({ length: 10 }, (_, index) => index + 1).reverse().map(id => <TweetLoading key={id} />)}
        {tweet && <Tweet data={tweet} />}
        {address && tweet && <TweetBox
            replyTo={tweet.id} address={address} disconnect={disconnect} setPendingTweets={setPendingTweets} />}
        
        {/* TODO: pending tweets show up twice */}
        {pendingTweets.map((pendingTweet, key) => <PendingTweet key={`pending_${key}`} tweet={pendingTweet} />)}
        {
            tweet && <TweetList
                lists={tweet.replies.map(Number)}
                pendingTweets={pendingTweets}
                setPendingTweets={setPendingTweets} />
        }

    </div>
}