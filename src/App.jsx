import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ValidateOTP from './Pages/ValidateOTP';
import Home from './Pages/Home';
import DetailRecipe from './Pages/DetailRecipe';
import AddRecipe from './Pages/AddRecipe';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/validateOTP" element={<ValidateOTP />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/detail/:id" element={<DetailRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;
