import { useState } from 'react';
import { useContract } from '../../context/Contract';
import { shortenAddress, getRelativeTime } from '../../utils';
import { Link } from 'react-router-dom';

import { TweetLoading } from '../index';

export const Tweet = ({ data }: ITweet) => {
    const { contract } = useContract();
    const [tweet, setTweet] = useState<ITweetData>(data);
    const [processing, setProcessing] = useState(false);

    const getTweet = async (tweetId: number) => {
        const response = await contract.getTweet(tweetId);
        const [, , replies, likes, likedByMe, ,]: TweetType = response;
        setTweet({ ...tweet, replies, likes: Number(likes), likedByMe });
        setProcessing(false);
    }

    const likeTweet = async () => {
        if (processing) return;

        const response = await contract.likeTweet(tweet.id);
        setProcessing(true);
        response.wait().then(() => getTweet(Number(data.id)));
    }

    if (tweet === null) {
        return <TweetLoading />
    }

    return (
        <div className={`tweet ${processing ? "pending" : ""}`}>
            {/* <img src="https://avatar.tonies.de/static/stage/01.png" className="avatar" alt="avatar" /> */}
            <div className="content">
                <span className="author">
                    <span className="name">{shortenAddress(tweet.owner)}</span>
                </span>

                <span className="time">{processing
                    ? "processing..."
                    : <Link to={`/tweet/${tweet.id}`}>{getRelativeTime(new Date(tweet.createdAt * 1000))}</Link>
                }</span>
                <div className="message">{tweet.text}</div>
                <div className="buttons">
                    <Link to={`/tweet/${tweet.id}`}>
                        <span className="button">
                            {tweet.replies.length}
                            <i className="fa fa-reply reply-button" />
                        </span>
                    </Link>
                    {/* <i className="fa fa-retweet retweet-button" /> */}
                    <span className="button">
                        {Number(tweet.likes)}
                        <i className={`fa fa-heart ${tweet.likedByMe ? "liked-by-me" : "like-button "}`} onClick={likeTweet} />
                    </span>
                    <i className="fa fa-ellipsis-h more-options-button" />
                </div>
            </div>
        </div>
    );
}