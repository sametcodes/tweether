import { useState, useEffect } from 'react';
import { useContract } from '../context/Contract';
import { shortenAddress } from '../utils';

import TweetLoading from './TweetLoading';
import './style.css';

const Tweet = ({ tweetId }: ITweet) => {
    const { contract } = useContract();
    const [tweet, setTweet] = useState<ITweetData | null>(null);
    const [processing, setProcessing] = useState(false);

    const getTweet = async () => {
        const tweet = await contract.getTweet(tweetId);
        const [id, owner, replies, likes, likedByMe, text, createdAt]: TweetType = tweet;
        setTweet({ id: Number(id), owner, replies, likes: Number(likes), likedByMe, text, createdAt: Number(createdAt) });
        setProcessing(false);
    }

    useEffect(() => {
        getTweet();
    }, []);

    const likeTweet = async () => {
        if(processing) return;

        const data = await contract.likeTweet(tweetId);
        setProcessing(true);
        await data.wait().then(() => getTweet());
    }

    if(tweet === null){
        return <TweetLoading />
    }

    return (
        <div className={`tweet ${processing ? "pending": ""}`}>
            {/* <img src="https://avatar.tonies.de/static/stage/01.png" className="avatar" alt="avatar" /> */}
            <div className="content">
                <span className="author">
                    <span className="name">{shortenAddress(tweet.owner)}</span>
                </span>

                 {/* TODO: implement x time ago text  */}
                <span className="time">{processing ? "processing..." : "3h ago"}</span>
                <div className="message">{tweet.text}</div>
                <div className="buttons">
                    <span className="button">
                        <i className="fa fa-reply reply-button" />
                    </span>
                    {/* <i className="fa fa-retweet retweet-button" /> */}
                    <span className="button">
                        {Number(tweet.likes)}
                        <i className={`fa fa-heart ${tweet.likedByMe ? "liked-by-me": "like-button "}`} onClick={likeTweet} />
                    </span>
                    <i className="fa fa-ellipsis-h more-options-button" />
                </div>
            </div>
        </div>
    );
}

export default Tweet;