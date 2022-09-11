import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';

function App() {
  const { token } = useSelector(state => state.auth)

  return (
    <div className="app">
      <div className="container">
        <Navbar />

        <Routes>
          <Route path="/" element={token ? <Home /> : <Navigate to={'/login'} />} />
          <Route path="/login" element={!token ? <Login /> : <Navigate to={'/'} />} />
          <Route path="/register" element={!token ? <Register /> : <Navigate to={'/'} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
