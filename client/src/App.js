import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Customers from './views/customers/customers';
import Pokemon from './views/pokemon/pokemon';
import Home from './views/home/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/customers" element={<Customers />}></Route>
        <Route path="/pokemon" element={<Pokemon />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
