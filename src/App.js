import './App.css';
import LogIn from './pages/logIn/LogIn';
import Students from './pages/students/Students';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/students" element={<Students />} />
    </Routes>
  </Router>
  );
}

export default App;
