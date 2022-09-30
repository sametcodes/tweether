import { useParams } from 'react-router-dom';
import { TweetDetail } from '../components';

export const Detail = () => {
    const { tweetId } = useParams();

    return <>
        <TweetDetail tweetId={Number(tweetId)} />
    </>
}