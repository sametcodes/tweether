import { useState, useEffect, useRef, Fragment, useCallback, useMemo } from 'react';

import Tweet from './components/Tweet';
import PendingTweet from './components/PendingTweet';
import TweetBox from './components/TweetBox';
import TweetLoading from './components/TweetLoading';
import { useContract } from './context/Contract';

function App() {
  const LIMIT_PER_PAGE = 10;
  const { account: { address, connect, disconnect }, contract } = useContract();
  const refOffset = useRef(0);
  const total = useRef(0);

  const [lastElement, setLastElement] = useState(null);

  const [pendingTweets, setPendingTweets] = useState<ITweetData[]>([]);
  const [tweets, setTweets] = useState<ITweetData[]>([]);
  const [loading, setLoading] = useState(true);

  const observer = useRef(new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
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


  const getTotalTweet = async () => {
    const response = await contract.getTotalTweet();
    total.current = Number(response);
    getTweets();
  }

  const getTweet = async (tweetId: number): Promise<ITweetData> => {
    const tweet = await contract.getTweet(tweetId);
    const [id, owner, replies, likes, likedByMe, text, createdAt]: TweetType = tweet;
    return { id: Number(id), owner, replies, likes: Number(likes), likedByMe, text, createdAt: Number(createdAt) };
  }

  const getTweets = async () => {
    const tweetIds = Array.from({ length: LIMIT_PER_PAGE },
      (_, index) => index + total.current - LIMIT_PER_PAGE - refOffset.current)
      .filter(id => id >= 0).reverse();

    const tweetsData = await Promise.all(tweetIds.map(getTweet));
    setTweets(tweet => ([...tweet, ...tweetsData]));
    refOffset.current += LIMIT_PER_PAGE;
    setLoading(false);
  }

  contract.on('CreateTweet', async (tweetId: number, owner: string, text: string) => {
    if (pendingTweets.find(tweet => tweet.owner.toLowerCase() === owner.toLocaleLowerCase() && tweet.text === text)) {
      setPendingTweets(pendingTweets => pendingTweets.filter(tweet => tweet.owner.toLowerCase() !== owner.toLowerCase() && tweet.text !== text));

      const response = await getTweet(tweetId);
      setTweets([response, ...tweets]);
    }
  });

  useEffect(() => {
    getTotalTweet();
  }, []);

  return (
    <div className="App">
      <h2>Tweether</h2>
      <div className="header">
        {address
          ? <TweetBox address={address} disconnect={disconnect}
            setPendingTweets={setPendingTweets} />
          : <div style={{ margin: "10px 0px" }}>
            <button onClick={() => connect()}>Connect</button>
          </div>}
      </div>
      <div className="tweets">
        {pendingTweets.map((pendingTweet, key) => <PendingTweet key={`pending_${key}`} tweet={pendingTweet} />)}
        {loading
          ? Array.from({ length: LIMIT_PER_PAGE }, (_, index) => index + 1).reverse().map(id => <TweetLoading key={id} />)
          : tweets.map((tweet, index, arr) => {
            return <Tweet key={`tweet_${tweet.id}`} data={tweet} />
          })
        }
        <span ref={setLastElement as any}></span>
      </div>

      { loading === false && tweets.length === total.current && <div className="no-more">End of tweeths</div> }
    </div>
  );
}

export default App;
