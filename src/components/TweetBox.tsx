import { shortenAddress } from '../utils';
import { useRef, useState } from 'react';
import { useContract } from '../context/Contract';
import './style.css';

const TweetBox = ({ address, disconnect, setPendingTweets }: ITweetBox) => {
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

        const data = await contract.createTweet(tweet, false, 0);
        setPendingTweets(pendingTweets => [{
            id: Number(data.value),
            owner: address,
            replies: [],
            likes: 0,
            likedByMe: false,
            text: tweet,
            createdAt: Date.now()
        }, ...pendingTweets]);

        data.wait().then(() => {
            if(!(inputRef.current instanceof HTMLTextAreaElement)) return;
            setPending(false);
            inputRef.current.value = "";
        })
    }

    return (
        <div className="tweet">
            {/* <img src="https://avatar.tonies.de/static/stage/01.png" className="avatar" alt="avatar" /> */}
            <div className="content">
                <span className="author">
                    <span className="name">{shortenAddress(address)} ― <button onClick={disconnect} disabled={pending}>Disconnect</button></span>
                </span>

                <div className="tweet-controls">
                    <textarea ref={inputRef} onKeyPress={preventEnter} disabled={pending} className="tweet-input" />
                    <button className="tweet-send" onClick={sendTweet} disabled={pending}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default TweetBox;