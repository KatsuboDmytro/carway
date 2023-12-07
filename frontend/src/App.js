import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, SignUp, Home, AboutDriver, AboutDeparture, Settings } from "./pages/index";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/about/:id' element={<AboutDriver />}/>
          <Route path='/departure/:id' element={<AboutDeparture />}/>
          <Route path='/settings' element={<Settings />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
