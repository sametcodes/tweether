import { shortenAddress } from '../../utils';
import Blockies from 'react-blockies';

export const PendingTweet = ({ tweet }: { tweet: ITweetData }) => {
    return (
        <div className="tweet pending">
            <Blockies seed={tweet.owner.toLowerCase()} size={10} scale={5} className="avatar" />
            <div className="content">
                <span className="author">
                    <span className="name">{shortenAddress(tweet.owner)}</span>
                </span>

                <span className="time">pending...</span>
                <div className="message">{tweet.text}</div>
                <div className="buttons">
                    <span className="button">
                        <i className="fa fa-reply reply-button" />
                    </span>
                    {/* <i className="fa fa-retweet retweet-button" /> */}
                    <span className="button">
                        {Number(tweet.likes)}
                        <i className="fa fa-heart" />
                    </span>
                    <i className="fa fa-ellipsis-h more-options-button" />
                </div>
            </div>
        </div>
    );
}