import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import AddPage from './views/AddPage';
import EditPage from './views/EditPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/add" element={<AddPage/>} />
        <Route path="/edit/:id" element={<EditPage/>} />
      </Routes>
    </div>
  );
}

export default App;
