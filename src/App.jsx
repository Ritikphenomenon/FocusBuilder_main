
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import "./index.css";  // Ensure you are importing your Tailwind CSS

import Home from './Home/Home';
import Chatgpt from './Chatgpt/Chatgpt';
import Notes from './Notes/Notes';
import Todo from './Todos/Todo';
import Signup from './pages/Signup';
import BirdGame from './Games/Bird';
import Login from './pages/Login';
import Music from './Music/music';
function App() {
  return (
    <Router>
<Routes>
<Route  path="/"  element={<Signup/>} />
<Route  path="/login"  element={<Login/>} />
<Route  path="/home"  element={<Home/>} />
<Route  path="/notes"  element={<Notes/>} />
<Route  path="/todos"  element={<Todo/>} />
<Route  path="/chatgpt"  element={<Chatgpt/>} />
<Route  path="/game"  element={<BirdGame/>} />
<Route  path="/music"  element={<Music/>} />
      </Routes>
    </Router>
  );
}

export default App;
