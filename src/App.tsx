import './App.css';
import Error from './components/Error/Error';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Menu from './components/Menu/Menu';
import Contacts from './pages/Contacts';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <header className="app-header">
          <h1 className="app-label">Book library app</h1>
          <Menu></Menu>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contacts" element={<Contacts />}></Route>
          <Route path="*" element={<h4>Page is not found</h4>} />
        </Routes>
        <Error></Error>
      </BrowserRouter>
    </div>
  );
}

export default App;
