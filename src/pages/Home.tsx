import { useState } from 'react';
import { Header, TweetList } from '../components';

export const Home = () => {
  const [pendingTweets, setPendingTweets] = useState<ITweetData[]>([]);

    return <>
      <Header setPendingTweets={setPendingTweets} />
      <TweetList pendingTweets={pendingTweets} setPendingTweets={setPendingTweets} />
    </>
}