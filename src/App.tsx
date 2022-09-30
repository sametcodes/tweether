import { Routes, Route } from 'react-router-dom';
import { Detail, Home } from './pages';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const App = () => {
  return <div className="container">
    <Link to="/"><h2>tweether</h2></Link>
    <Routes>
      <Route path="/tweet/:tweetId" element={<Detail />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </div>
    ;
}

export default App;
