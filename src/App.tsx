import { useState } from 'react';
import { Header, TweetList } from './components';

const App = () => {
  const [pendingTweets, setPendingTweets] = useState<ITweetData[]>([]);

  return (
    <div className="App">
      <h2>Tweether</h2>
      <Header setPendingTweets={setPendingTweets} />
      <TweetList pendingTweets={pendingTweets} setPendingTweets={setPendingTweets} />
    </div>
  );
}

export default App;
