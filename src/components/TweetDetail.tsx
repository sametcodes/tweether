import { useEffect, useState, useCallback } from 'react';
import { useContract } from '../context/Contract';
import { Tweet, TweetLoading, TweetBox, TweetList } from '../components';
import { useNavigate } from 'react-router-dom';

export const TweetDetail = ({ tweetId }: ITweetDetail) => {
    const navigate = useNavigate();

    const { contract, account: { address, changeAccount } } = useContract();
    const [tweet, setTweet] = useState<ITweetData | undefined>();
    const [pendingTweets, setPendingTweets] = useState<ITweetData[]>([]);

    const getTweet = useCallback(async () => {
        try {
            const [id, owner, replies, likes, likedByMe, text, createdAt, reply, repliedTo] = await contract.getTweet(tweetId);
            setTweet({ id: Number(id), owner, replies, likes: Number(likes), likedByMe, text, createdAt: Number(createdAt), reply, repliedTo });
        } catch (err) {
            if (err instanceof Error) {
                navigate("/404");
                console.error(err.message);
            }
        }
    }, [contract, tweetId, navigate]);

    useEffect(() => {
        getTweet();

        return () => {
            setTweet(undefined);
        }
    }, [getTweet, tweetId]);

    return <div className="tweets detail-tweet">
        {!tweet && Array.from({ length: 10 }, (_, index) => index + 1).reverse().map(id => <TweetLoading key={id} />)}
        {tweet && <Tweet data={tweet} />}
        {address && tweet && <TweetBox
            replyTo={tweet.id} address={address} changeAccount={changeAccount} setPendingTweets={setPendingTweets} />}

        {
            tweet && <TweetList
                lists={tweet.replies.map(Number)}
                pendingTweets={pendingTweets}
                setPendingTweets={setPendingTweets} />
        }

    </div>
}