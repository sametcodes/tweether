import { useRef, useState } from 'react';
import Blockies from 'react-blockies';
import { shortenAddress } from '../utils';
import { useContract } from '../context/Contract';

export const TweetBox = ({ address, changeAccount, setPendingTweets, replyTo}: ITweetBox) => {
    const { contract } = useContract();
    const [ pending, setPending ] = useState(false);

    const preventEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(event.key === "Enter") event.preventDefault();
    };

    const inputRef = useRef<HTMLTextAreaElement>(null);

    const sendTweet = async (event: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
        event.preventDefault();
        if(!(inputRef.current instanceof HTMLTextAreaElement)) return;

        setPending(true);
        const tweet = inputRef.current.value;
        if (typeof tweet !== "string") return;

        const isReplyTweet = replyTo !== undefined ? true : false;
        const replyTweetId = replyTo !== undefined ? replyTo : 0;
        const response = await contract.createTweet(tweet, isReplyTweet, replyTweetId);
        setPendingTweets(pendingTweets => [{
            id: Number(response.value),
            owner: address,
            replies: [],
            likes: 0,
            likedByMe: false,
            text: tweet,
            createdAt: Date.now(),
            reply: isReplyTweet,
            repliedTo: replyTweetId
        }, ...pendingTweets]);

        response.wait().then(() => {
            if(!(inputRef.current instanceof HTMLTextAreaElement)) return;
            setPending(false);
            inputRef.current.value = "";
        })
    }

    return (
        <div className="tweet tweet-box">
            <Blockies seed={address.toLowerCase()} size={10} scale={5} className="avatar" />
            <div className="content">
                <span className="author">
                    <span className="name">{shortenAddress(address)}</span>
                    <button onClick={changeAccount} disabled={pending}>Switch Account</button>
                </span>

                <div className="tweet-controls">
                    <textarea ref={inputRef} onKeyPress={preventEnter} disabled={pending} className="tweet-input" />
                    <button className="tweet-send" onClick={sendTweet} disabled={pending}>Send</button>
                </div>
            </div>
        </div>
    );
}