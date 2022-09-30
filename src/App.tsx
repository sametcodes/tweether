import { Routes, Route } from 'react-router-dom';
import { Detail, Home, NotFound } from './pages';
import { Link } from 'react-router-dom';

const App = () => {
  return <div className="container">
    <Link to="/"><h2>tweether</h2></Link>
    <Routes>
      <Route path="/tweet/:tweetId" element={<Detail />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </div>
    ;
}

export default App;
