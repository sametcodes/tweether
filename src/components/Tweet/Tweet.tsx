import { useState, useRef, LegacyRef } from 'react';
import { useContract } from '../../context/Contract';
import { shortenAddress, getRelativeTime } from '../../utils';
import { Link, useNavigate } from 'react-router-dom';
import Blockies from 'react-blockies';

import { TweetLoading } from '../index';

export const Tweet = ({ data }: ITweet) => {
    const navigate = useNavigate();

    const { contract } = useContract();
    const [tweet, setTweet] = useState<ITweetData>(data);
    const [processing, setProcessing] = useState(false);

    const likeButtonRef = useRef<HTMLSpanElement>(null);
    const replyButtonRef = useRef<HTMLAnchorElement>(null);
    const repliedToRef = useRef<HTMLAnchorElement>(null);
    const timeLinkRef = useRef<HTMLSpanElement>(null);

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

    const onClickTweet = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        const refs = [likeButtonRef, replyButtonRef, timeLinkRef, repliedToRef];
        if (refs.find(ref => ref.current?.contains(event.target as Node))) return;

        navigate(`/tweet/${tweet.id}`);
    }

    if (tweet === null) {
        return <TweetLoading />
    }

    return (
        <div className={`tweet ${processing ? "pending" : ""}`} onClick={onClickTweet}>
            <Blockies seed={tweet.owner.toLowerCase()} size={10} scale={5} className="avatar" />
            <div className="content">
                <div className="content-header">
                    <span className="author">
                        <span className="name">{shortenAddress(tweet.owner)}</span>
                    </span>

                    <span className="time" ref={timeLinkRef}>{processing
                        ? "processing..."
                        : <Link to={`/tweet/${tweet.id}`}>{getRelativeTime(new Date(tweet.createdAt * 1000))}</Link>
                    }</span>
                </div>
                {tweet.reply && <Link to={`/tweet/${tweet.repliedTo.toString()}`} ref={repliedToRef}>
                    <p className="replied-to">
                        <i className="fa fa-reply" />
                        <span>replied to #{tweet.repliedTo.toString()}</span>
                    </p>
                </Link>
                }
                <div className="message">{tweet.text}</div>
                <div className="buttons">
                    <Link to={`/tweet/${tweet.id}`} ref={replyButtonRef}>
                        <span className="button">
                            {tweet.replies.length}
                            <i className="fa fa-reply reply-button" />
                        </span>
                    </Link>
                    {/* <i className="fa fa-retweet retweet-button" /> */}
                    <span className="button" ref={likeButtonRef} onClick={likeTweet} >
                        {Number(tweet.likes)}
                        <i className={`fa fa-heart ${tweet.likedByMe ? "liked-by-me" : "like-button "}`} />
                    </span>
                    <i className="fa fa-ellipsis-h more-options-button" />
                </div>
            </div>
        </div>
    );
}