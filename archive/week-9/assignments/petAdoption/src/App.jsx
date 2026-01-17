import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import TablePage from './components/TablePage';


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/table' element={<TablePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
