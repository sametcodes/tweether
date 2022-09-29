import { useParams } from 'react-router-dom';
import { TweetDetail } from '../components';

export const Detail = () => {
    const { tweetId } = useParams();

    return <div className="detail-tweet">
        <TweetDetail tweetId={Number(tweetId)} />
    </div>
}