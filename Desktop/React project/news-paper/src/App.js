import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<News category="general" />} />
          <Route exact path="/business" element={<News category="business" />} />
          <Route exact path="/entertainment" element={<News category="entertainment" />} />
          <Route exact path="/health" element={<News category="health" />} />
          <Route exact path="/science" element={<News category="science" />} />
          <Route exact path="/sports" element={<News category="sports" />} />
          <Route exact path="/technology" element={<News category="technology" />} />
          <Route exact path="/about" element={<About/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
