import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, SignUp, Home } from "./pages/index";

function App() {
  return (
    <>
    <div className='bg_reg'>
      <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/signup' element={<SignUp />}/>
        </Routes>
      </Router>
    </div>
    <Router>
      <Routes>
        <Route path='/home' element={<Home />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
