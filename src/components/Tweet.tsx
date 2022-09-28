import { useState, useEffect } from 'react';
import { useContract } from '../context/Contract';
import { shortenAddress } from '../utils';

import TweetLoading from './TweetLoading';
import './style.css';

const Tweet = ({data, refetch}: ITweet) => {
    const { contract } = useContract();
    const [tweet, setTweet] = useState<ITweetData>(data);
    const [processing, setProcessing] = useState(false);

    const getTweet = async (tweetId: number) => {
        const response = await contract.getTweet(tweetId);
        const [id, owner, replies, likes, likedByMe, text, createdAt]: TweetType = response;
        setTweet({ ...tweet, replies, likes: Number(likes), likedByMe });
        setProcessing(false);
    }

    const likeTweet = async () => {
        if(processing) return;

        const response = await contract.likeTweet(tweet.id);
        setProcessing(true);
        response.wait().then(() => getTweet(Number(data.id)));
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