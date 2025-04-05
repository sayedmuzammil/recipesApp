import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import ValidateOTP from './Components/ValidateOTP';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/validateOTP" element={<ValidateOTP />} />
      </Routes>
    </Router>
  );
}

export default App;
