import { Routes, Route } from 'react-router-dom';
import { Detail, Home } from './pages';

const App = () => {

  // TODO: adding a new field in the Tweet struct as replyTweet (boolean)

  return <div className="container">
    <Routes>
      <Route path="/tweet/:tweetId" element={<Detail />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </div>
    ;
}

export default App;
