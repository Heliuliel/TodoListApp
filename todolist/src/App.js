import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Narbar from './components/Narbar';
import './index.css'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Narbar />
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
