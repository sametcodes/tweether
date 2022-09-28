import { useState, useEffect } from 'react';

import Tweet from './components/Tweet';
import PendingTweet from './components/PendingTweet';
import TweetBox from './components/TweetBox';
import TweetLoading from './components/TweetLoading';
import { useContract } from './context/Contract';

function App() {
  const LIMIT_PER_PAGE = 5;
  const { account: { address, connect, disconnect }, contract } = useContract();

  const [totalTweet, setTotalTweet] = useState(0);
  const [pendingTweets, setPendingTweets] = useState<ITweetData[]>([]);

  const getTotalTweet = async () => {
    const total = await contract.getTotalTweet();
    setTotalTweet(Number(total));
  }

  contract.on('CreateTweet', (tweetId: number, owner: string, text: string) => {
    if (pendingTweets.find(tweet => tweet.owner.toLowerCase() === owner.toLocaleLowerCase() && tweet.text === text)) {
      setPendingTweets(pendingTweets => pendingTweets.filter(tweet => tweet.owner.toLowerCase() !== owner.toLowerCase() && tweet.text !== text));
      getTotalTweet();
    }
  });

  useEffect(() => {
    getTotalTweet();
  });

  return (
    <div className="App">
      <h2>Tweether</h2>
      <div className="header">
        {address
          ? <TweetBox address={address} disconnect={disconnect}
            setPendingTweets={setPendingTweets} />
          : <div style={{margin: "10px 0px"}}>
            <button onClick={() => connect()}>Connect</button>
          </div>}
      </div>
      <div className="tweets">
        {pendingTweets.map((pendingTweet, key) => <PendingTweet key={`pending_${key}`} tweet={pendingTweet} />)}
        {totalTweet > 0
        ? Array.from({ length: LIMIT_PER_PAGE }, (_, index) => index + totalTweet - LIMIT_PER_PAGE).reverse()
          .map((tweetId) => <Tweet key={tweetId} tweetId={tweetId} />)
        : Array.from({ length: LIMIT_PER_PAGE }, (_, index) => index + 1).reverse()
          .map(id => <TweetLoading key={id} />)
        }
      </div>
    </div>
  );
}

export default App;
