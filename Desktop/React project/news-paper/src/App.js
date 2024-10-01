import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteState from './context/Notes/NotesState';
import Login from './components/Login';
import Signup from './components/SignUp';


function App() {
  return (
    <>
    <NoteState>
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
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<Signup/>} />
        </Routes>
      </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
