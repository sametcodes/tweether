import { shortenAddress } from '../utils';
import './style.css';

const PendingTweet = ({ tweet }: { tweet: ITweetData }) => {
    return (
        <div className="tweet pending">
            {/* <img src="https://avatar.tonies.de/static/stage/01.png" className="avatar" alt="avatar" /> */}
            <div className="content">
                <span className="author">
                    <span className="name">{shortenAddress(tweet.owner)}</span>
                </span>

                 {/* TODO: implement x time ago text  */}
                <span className="time">pending...</span>
                <div className="message">{tweet.text}</div>
                <div className="buttons">
                    <span className="button">
                        <i className="fa fa-reply reply-button" />
                    </span>
                    {/* <i className="fa fa-retweet retweet-button" /> */}
                    <span className="button">
                        {Number(tweet.likes)}
                        <i className="fa fa-heart like-button" />
                    </span>
                    <i className="fa fa-ellipsis-h more-options-button" />
                </div>
            </div>
        </div>
    );
}

export default PendingTweet;