import { useRef, useState, useEffect } from 'react';
import { useContract } from '../context/Contract';

import { Tweet, PendingTweet, TweetLoading } from '../components'

export const TweetList = ({ pendingTweets, setPendingTweets }: ITweetList) => {
    const { contract } = useContract();

    const LIMIT_PER_PAGE = 10;
    const refOffset = useRef(0);
    const total = useRef(0);

    const [lastElement, setLastElement] = useState(null);

    const [tweets, setTweets] = useState<ITweetData[]>([]);
    const [loading, setLoading] = useState(true);

    const observer = useRef(new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                setLoading(true);
                getTweets();
            }
        })
    );

    useEffect(() => {
        const currentElement = lastElement;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [lastElement]);

    const getTweet = async (tweetId: number): Promise<ITweetData> => {
        const tweet = await contract.getTweet(tweetId);
        const [id, owner, replies, likes, likedByMe, text, createdAt]: TweetType = tweet;
        return { id: Number(id), owner, replies, likes: Number(likes), likedByMe, text, createdAt: Number(createdAt) };
    }

    const getTweets = async () => {
        const tweetIds = Array.from({ length: LIMIT_PER_PAGE },
            (_, index) => index + total.current - LIMIT_PER_PAGE - refOffset.current)
            .filter(id => id >= 0).reverse();
        refOffset.current += LIMIT_PER_PAGE;

        const tweetsData = await Promise.all(tweetIds.map(getTweet));
        setTweets(tweet => ([...tweet, ...tweetsData]));
        setLoading(false);
    }

    const getTotalTweet = async () => {
        const response = await contract.getTotalTweet();
        total.current = Number(response);
        getTweets();
    }

    useEffect(() => {
        getTotalTweet();
    }, []);

    contract.on('CreateTweet', async (tweetId: number, owner: string, text: string) => {
        if (pendingTweets.find(tweet => tweet.owner.toLowerCase() === owner.toLocaleLowerCase() && tweet.text === text)) {
            setPendingTweets(pendingTweets => pendingTweets.filter(tweet => tweet.owner.toLowerCase() !== owner.toLowerCase() && tweet.text !== text));

            const response = await getTweet(tweetId);
            setTweets([response, ...tweets]);
        }
    });

    return <div className="tweets">
        {pendingTweets.map((pendingTweet, key) => <PendingTweet key={`pending_${key}`} tweet={pendingTweet} />)}
        {tweets.map(tweet => <Tweet key={`tweet_${tweet.id}`} data={tweet} />)}

        {loading === true && Array.from({ length: LIMIT_PER_PAGE }, (_, index) => index + 1)
            .reverse().map(id => <TweetLoading key={id} />)}

        <span ref={setLastElement as any}></span>

        {loading === false && tweets.length === total.current && <div className="no-more">End of tweeths</div>}
    </div>
}